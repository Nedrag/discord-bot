//Custom
//Discord.js
const { Collection } = require("discord.js");
//GUNS BASE STATS
const BASE_STAT_SCALING = 1.13;
//Stats
let damage = 0;
let max_accuracy = 0; //Accuracy <= the lower the better
let min_accuracy = 2; //Accuracy <= the lower the better
let spread = 2;
let fire_interval = 0;
let magazine_size = 0;
let reload_speed= 0;
let crit_dmg= 0;
let shot_cost = 1;
let projectile_count = 1;




//Database imports
const {ItemsGuns_Pistols, ItemRarityPool, GunsAndGear,GunsPool, UserGuns, UserGear, ItemPistol_Parts, Users} = require('../db/dbObjects.js');
const { Op } = require('sequelize');

class ItemStatHandler {
    #interaction;
    BODY;
    GRIP;
    SIGHT;
    ACCESSORIE;
    BARREL;
    DEFINITON;
    ELEMENT;
    PICK;

    constructor(interaction)
    {
        this.#interaction = interaction;
    }
    randomWeight(choices)
    {
        let weightSum = 0;
        for(const choice of choices)
        {
            weightSum += choice.weight;
        }

        let randWeight = Math.random() * weightSum;
        for(const choice of choices)
        {
            if(randWeight < choice.weight) return choice;
            randWeight -= choice.weight;
        }
        return null;

    }
    /*handleCalculateStats_grip_pistol(grip)
    {
        //Grips stats additions
        if(grip == "BANDIT"){
            magazine_size *= 1.35;
            reload_speed *= 1.1
            spread *= 1.15
        }
        if(grip == "DAHL"){
            max_accuracy *= 1.15
            damage /= 1.06
        }
        if(grip == "HYPERION"){
            damage /=1.09
            spread /= 1.15
        }
        if(grip == "JAKOBS"){
            fire_interval *= 1.09 
            reload_speed *= 1.05;
        }
        if(grip == "MALIWAN"){
        }
        if(grip == "TEDIORE"){
            damage /= 1.06
            reload_speed /= 1.2
            magazine_size /= 1.14
        }
        if(grip == "TORGUE"){
            reload_speed *= 1.1
            damage *= 1.09
            spread *= 1.1
        }
        if(grip == "VLADOF"){
            fire_interval /= 1.12
            damage /= 1.06
            reload_speed /= 1.15;
        }

    }
    handleCalculateStats_barrel_pistol(barrel)
    {
        //Barrel stats additions
        if(barrel == "BANDIT"){
            damage *= 1.06;
            max_accuracy *= 1.17;
            min_accuracy *= 1.15;
            spread *= 1.15;
        }
        if(barrel == "DAHL"){
            damage /= 1.09;
            max_accuracy /= 1.25;
            spread *= 1.2;

        }
        if(barrel == "ETECH"){
            damage *= 2; 
            shot_cost += 1;
            fire_interval *= 1.5;
        }
        if(barrel == "HYPERION"){
            crit_dmg += 0.15
            magazine_size /= 1.14;
            max_accuracy /= 1.25;
            min_accuracy /= 1.25;
            spread /= 1.35;
            damage /=1.12
        }
        if(barrel == "JAKOBS"){
            damage *= 1.18;
            fire_interval *= 1.36
            min_accuracy /= 1.25;
            spread /= 1.4;
        }
        if(barrel == "MALIWAN"){
            max_accuracy /= 1.1
            spread /= 1.1;
        }
        if(barrel == "TEDIORE"){

        }
        if(barrel == "TORGUE"){
            fire_interval *= 1.09;
            max_accuracy *= 1.4;
            min_accuracy *= 1.4;
            reload_speed *= 1.25;
            damage *= 1.24;
        }
        if(barrel == "VLADOF"){
            fire_interval /= 1.3;
            magazine_size *= 1.28;
            spread *= 1.2;
        }

    }
    handleCalculateStats_accessorie_pistol(a)
    {
        if(a == "ACC_LASER")
        {
            max_accuracy /= 1.25;
            min_accuracy /= 1.25;
            spread /= 1.4;
        }
        if(a == "BAYONET1"){

        }
        if(a == "BAYONET2"){

        }
        if(a == "DOUBLE_LASER"){
            fire_interval *= 1.3;
            magazine_size *= 1.28
            magazine_size += 2; 
            min_accuracy *= 1.25;
            projectile_count *= 1.6;
            projectile_count += 0.4;
            shot_cost *= 2;
            damage /= 1.15;
            spread *= 1.25;
            spread  += 1;
        }
        if(a == "STOCK"){
            max_accuracy /= 1.35;
        }
        if(a == "TECH_MAG_1"){
            magazine_size *= 1.56;
            reload_speed *= 1.15;
        }
        if(a == "TECH_DAMAGE_2"){
            damage *= 1.18;
        }
    }*/
    async handleItemRarity()
    {
        const itemRarity_Pool = await ItemRarityPool.findAll();
        const itemRarity_Choice = this.randomWeight(itemRarity_Pool);

        if(!itemRarity_Choice) return null;
        return itemRarity_Choice;
    }
    async handleItemIsGun()
    {
        const itemGuns_Pool = await GunsPool.findAll(); 
        const itemGuns_Choice = this.randomWeight(itemGuns_Pool);
        //console.log(itemGuns_Choice.name);
        if(itemGuns_Choice.name == "ITEM_GUNS_PISTOL"){
            const gunPistol_Pool = await ItemsGuns_Pistols.findAll();
            const gunPistol_Rarity = await this.handleItemRarity();
            const gunPistol_Choice = this.randomWeight(gunPistol_Pool);

            this.handleCalculateStats_Gun(itemGuns_Choice.name, gunPistol_Choice, gunPistol_Rarity.name);

            return gunPistol_Choice;
        }
        return null;

    }
    async handleItemIsMoney()
    {
        const amount = 100;
        await Users.increment({balance: amount} , {where : {user_id : this.#interaction.author.id}});
    }
    async handleItemIsGamba()
    {
        const amount = 10;
        await Users.increment({gambas: amount} , {where : {user_id : this.#interaction.author.id}});
    }
    async rollAndAddItem()
    {
        //TODO 
        //Implementirati...
        const gunsAndGear_Pool = await GunsAndGear.findAll();
        const gunsAndGear_Choice = this.randomWeight(gunsAndGear_Pool);

        //Kada nije neki gear ili guns
        if(gunsAndGear_Choice.name == "ITEM_MONEY") {await this.handleItemIsMoney(); return;}//Ide na neku funkciju koja dodaje na balance od usera
        if(gunsAndGear_Choice.name == "ITEM_GAMBAS") {await this.handleItemIsGamba(); return;}

        switch(gunsAndGear_Choice.name)
        {
            case "ITEM_GUNS":
                try {
                await this.handleItemIsGun()
                break;
                }catch(e)
                {
                    this.#interaction.reply("Ooops! Something went wrong!")
                }
            case "ITEM_GEAR":
                break;

        }
    }

    async handleCalculateStats_Gun(gunType, gun, itemRarity)
    {
        let addGun_User;
        
        //const levelRange  = await Users.findOne({where: this.#interaction.author.id})
        if(gunType == "ITEM_GUNS_PISTOL"){
            //const level = Math.random() * (levelRange + 1 - (levelRange - 3)) - (levelRange - 3);
            const beta = Math.pow(10, BASE_STAT_SCALING);

            //Rarity multis
            if(itemRarity == "ITEM_RARITY_GREEN"){ 
                baseMagSize_Multiplier = 1.21
                baseDamage_Multiplier = 1.24
            }
            if(itemRarity == "ITEM_RARITY_BLUE"){ 
                baseMagSize_Multiplier = 1.35
                baseDamage_Multiplier = 1.48
            }
            if(itemRarity == "ITEM_RARITY_PURPLE"){ 
                baseMagSize_Multiplier = 1.49
                baseDamage_Multiplier = 1.72
            }
            if(body == "JAKOBS"){
                damage = GUNS_PISTOL_JAKOBS.get("DAMAGE")*beta*baseDamage_Multiplier;
                max_accuracy = GUNS_PISTOL_JAKOBS.get("ACCURACY") + JAKOBS_BONUS_ACCURACY;
                fire_interval = GUNS_PISTOL_JAKOBS.get("FIRE_INTERVAL");
                magazine_size = GUNS_PISTOL_JAKOBS.get("MAGAZINE_SIZE")*baseMagSize_Multiplier;
                reload_speed = GUNS_PISTOL_JAKOBS.get("RELOAD_SPEED");//in seconds
                crit_dmg = 2 + JAKOBS_BONUS_CRIT// Multi
            }
            if(body == "BANDIT"){
                damage = GUNS_PISTOL_BANDIT.get("DAMAGE")*beta*baseDamage_Multiplier;
                max_accuracy = GUNS_PISTOL_BANDIT.get("ACCURACY") ;
                fire_interval = GUNS_PISTOL_BANDIT.get("FIRE_INTERVAL");
                magazine_size = GUNS_PISTOL_BANDIT.get("MAGAZINE_SIZE")*baseMagSize_Multiplier;
                reload_speed = GUNS_PISTOL_BANDIT.get("RELOAD_SPEED");//in seconds
                crit_dmg = 2// Multi
            }
            if(body == "DAHL"){
                damage = GUNS_PISTOL_DAHL.get("DAMAGE")*beta*baseDamage_Multiplier;
                max_accuracy = GUNS_PISTOL_DAHL.get("ACCURACY") ;
                fire_interval = GUNS_PISTOL_DAHL.get("FIRE_INTERVAL");
                magazine_size = GUNS_PISTOL_DAHL.get("MAGAZINE_SIZE")*baseMagSize_Multiplier;
                reload_speed = GUNS_PISTOL_DAHL.get("RELOAD_SPEED");//in seconds
                crit_dmg = 2// Multi
            }
            if(body == "HYPERION"){
                damage = GUNS_PISTOL_HYPERION.get("DAMAGE")*beta*baseDamage_Multiplier;
                max_accuracy = GUNS_PISTOL_HYPERION.get("ACCURACY") ;
                fire_interval = GUNS_PISTOL_HYPERION.get("FIRE_INTERVAL");
                magazine_size = GUNS_PISTOL_HYPERION.get("MAGAZINE_SIZE")*baseMagSize_Multiplier;
                reload_speed = GUNS_PISTOL_HYPERION.get("RELOAD_SPEED");//in seconds
                crit_dmg = 2// Multi
            }
            if(body == "MALIWAN"){
                damage = GUNS_PISTOL_MALIWAN.get("DAMAGE")*beta*baseDamage_Multiplier;
                max_accuracy = GUNS_PISTOL_MALIWAN.get("ACCURACY") ;
                fire_interval = GUNS_PISTOL_MALIWAN.get("FIRE_INTERVAL");
                magazine_size = GUNS_PISTOL_MALIWAN.get("MAGAZINE_SIZE")*baseMagSize_Multiplier;
                reload_speed = GUNS_PISTOL_MALIWAN.get("RELOAD_SPEED");//in seconds
                crit_dmg = 2// Multi
            }
            if(body == "TEDIORE"){
                damage = GUNS_PISTOL_TEDIORE.get("DAMAGE")*beta*baseDamage_Multiplier;
                max_accuracy = GUNS_PISTOL_TEDIORE.get("ACCURACY") ;
                fire_interval = GUNS_PISTOL_TEDIORE.get("FIRE_INTERVAL");
                magazine_size = GUNS_PISTOL_TEDIORE.get("MAGAZINE_SIZE")*baseMagSize_Multiplier;
                reload_speed = GUNS_PISTOL_TEDIORE.get("RELOAD_SPEED");//in seconds
                crit_dmg = 2// Multi
            }
            if(body == "TORGUE"){
                damage = GUNS_PISTOL_TORGUE.get("DAMAGE")*beta*baseDamage_Multiplier;
                max_accuracy = GUNS_PISTOL_TORGUE.get("ACCURACY") ;
                fire_interval = GUNS_PISTOL_TORGUE.get("FIRE_INTERVAL");
                magazine_size = GUNS_PISTOL_TORGUE.get("MAGAZINE_SIZE")*baseMagSize_Multiplier;
                reload_speed = GUNS_PISTOL_TORGUE.get("RELOAD_SPEED");//in seconds
                crit_dmg = 2// Multi
            }
            if(body == "VLADOF"){
                damage = GUNS_PISTOL_VLADOF.get("DAMAGE")*beta*baseDamage_Multiplier;
                max_accuracy = GUNS_PISTOL_VLADOF.get("ACCURACY") ;
                fire_interval = GUNS_PISTOL_VLADOF.get("FIRE_INTERVAL");
                magazine_size = GUNS_PISTOL_VLADOF.get("MAGAZINE_SIZE")*baseMagSize_Multiplier;
                reload_speed = GUNS_PISTOL_VLADOF.get("RELOAD_SPEED");//in seconds
                crit_dmg = 2// Multi
            }

            this.handleCalculateStats_grip_pistol(grip);
            this.handleCalculateStats_barrel_pistol(barrel);
            this.handleCalculateStats_accessorie_pistol(accessorie);
            await UserGuns.upsert({
                user_id: this.#interaction.author.id,
                item_id: gun.item_id,
                equipped_slot_1 : false,
                equipped_slot_2 : false,

                gun_name : pistol.name,
                damage : Math.floor(damage),
                max_accuracy : max_accuracy,
                min_accuracy : min_accuracy,
                fire_rate : fire_interval.toFixed(2),
                magazine_size : Math.floor(magazine_size.toFixed(2)),
                reload_speed : reload_speed.toFixed(2),
                crit_dmg : Math.floor(damage*crit_dmg.toFixed(2)),
                shot_cost : Math.floor(shot_cost.toFixed(2)),
                projectile_count : Math.floor(projectile_count.toFixed(2)),

                body : body,
                barrel: barrel,
                grip : grip,
                scope : scope,
                rarity : itemRarity,
                gun_type : gunType,
            })

            this.#interaction.reply(`Rolled : ${gun.name}`);
            this.#interaction.reply(`
            Damage - ${Math.floor(damage)}
            Accuracy - ${Math.floor(100 - 12*spread)}
            Reload Speed - ${reload_speed.toFixed(2)}
            Fire Rate - ${(1/fire_interval).toFixed(2)}
            Magazine Size - ${Math.floor(magazine_size.toFixed(2))}
            `)
        }
    }


};
module.exports = {ItemStatHandler};