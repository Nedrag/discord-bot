//Custom
//Discord.js
const { Collection } = require("discord.js");
//GUNS BASE STATS
const BASE_STAT_SCALING = 1.13;

const GUNS_PISTOL_JAKOBS = new Collection();
GUNS_PISTOL_JAKOBS.set("DAMAGE", 17.6);
GUNS_PISTOL_JAKOBS.set("MAGAZINE_SIZE", 6.0);
GUNS_PISTOL_JAKOBS.set("RELOAD_SPEED", 2.1);
GUNS_PISTOL_JAKOBS.set("FIRE_INTERVAL", 0.06);
GUNS_PISTOL_JAKOBS.set("ACCURACY", 3.0);
const JAKOBS_BONUS_CRIT = 0.5;
const JAKOBS_BONUS_ACCURACY = 2.0;


//Stats
let damage = 0;
let accuracy = 0; //Accuracy <= the lower the better
let fire_interval = 0;
let magazine_size = 0;
let reload_speed= 0;
let crit_dmg= 0;
let shot_cost = 1;
let projectile_count = 1;


//Database imports
const {ItemsGuns_Pistols, ItemRarityPool, GunsAndGear,GunsPool, UserGuns, UserGear, ItemPistol_Parts } = require('../db/dbObjects.js');
const { Op } = require('sequelize');

class ItemStatHandler {
    #interaction;
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
    handleCalculateStats_grip(grip)
    {
        //Grips stats additions
        if(grip == "BANDIT"){
            magazine_size *= 1.35;
            reload_speed *= 1.1
        }
        if(grip == "DAHL"){
            accuracy *= 1.15
            damage /= 1.06
        }
        if(grip == "HYPERION"){
            damage /=1.09
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
        }
        if(grip == "VLADOF"){
            fire_interval /= 1.12
            damage /= 1.06
            reload_speed /= 1.15;
        }

    }
    handleCalculateStats_barrel(barrel)
    {
        //Barrel stats additions
        if(barrel == "BANDIT"){
            damage *= 1.06;
            accuracy *= 1.17;
        }
        if(barrel == "DAHL"){
            damage /= 1.09;
            accuracy /= 1.25;
        }
        if(barrel == "ETECH"){
            damage *= 2; 
            shot_cost += 1;
            fire_interval *= 1.5;
        }
        if(barrel == "HYPERION"){
            crit_dmg += 0.15
            magazine_size /= 1.14;
            accuracy /= 1.25;
            damage /=1.12
        }
        if(barrel == "JAKOBS"){
            damage *= 1.12;
        }
        if(barrel == "MALIWAN"){
            accuracy /= 1.1
        }
        if(barrel == "TEDIORE"){

        }
        if(barrel == "TORGUE"){
            fire_interval *= 1.09;
            accuracy *= 1.4;
            reload_speed *= 1.25;
            damage *= 1.24;
        }
        if(barrel == "VLADOF"){
            fire_interval /= 1.3;
            magazine_size *= 1.28;
            shot_cost += 1;
            projectile_count += 1;
        }

    }
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
    async addItem()
    {
        //TODO 
        //Implementirati...
        const gunsAndGear_Pool = await GunsAndGear.findAll();
        const gunsAndGear_Choice = this.randomWeight(gunsAndGear_Pool);

        //Kada nije neki gear ili guns
        if(gunsAndGear_Choice.name == "ITEM_MONEY") return gunsAndGear_Choice;//Ide na neku funkciju koja dodaje na balance od usera
        if(gunsAndGear_Choice.name == "ITEM_GAMBAS") return gunsAndGear_Choice;



        switch(gunsAndGear_Choice.name)
        {
            case "ITEM_GUNS":
                await this.handleItemIsGun();
                break;
            case "ITEM_GEAR":
                break;

        }

        

        //console.log(gunsAndGear_Choice);


    }

    async handleCalculateStats_Gun(gunType, gun, itemRarity)
    {
        
        //const levelRange  = await Users.findOne({where: this.#interaction.author.id})
        if(gunType == "ITEM_GUNS_PISTOL"){

            const pistol = await ItemsGuns_Pistols.findOne({where : {item_id : gun.item_id}})
            const grips = await ItemPistol_Parts.findAll({where : {part: "GRIP"}})
            const scopes = await ItemPistol_Parts.findAll({where : {part: "SCOPE"}})
            //const accessories = await Pistol_Parts.findAll({where : {part: "ACCESSORIES"}})

            //const level = Math.random() * (levelRange + 1 - (levelRange - 3)) - (levelRange - 3);
            const beta = Math.pow(10, BASE_STAT_SCALING);


            //Parts
            const body = pistol.body;
            const barrel = pistol.barrel;
            const grip = this.randomWeight(grips).manufacturer;
            const scope = this.randomWeight(scopes).manufacturer; 
            //const accessorie = this.randomWeight(accessories).name; 


            //Multis
            let baseMagSize_Multiplier = 1.0
            let baseDamage_Multiplier = 1.0

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
                accuracy = GUNS_PISTOL_JAKOBS.get("ACCURACY") + JAKOBS_BONUS_ACCURACY;
                fire_interval = GUNS_PISTOL_JAKOBS.get("FIRE_INTERVAL");
                magazine_size = GUNS_PISTOL_JAKOBS.get("MAGAZINE_SIZE")*baseMagSize_Multiplier;
                reload_speed = GUNS_PISTOL_JAKOBS.get("RELOAD_SPEED");//in seconds
                crit_dmg = 2 + JAKOBS_BONUS_CRIT// Multi

                this.handleCalculateStats_grip(grip);
                this.handleCalculateStats_barrel(barrel);
                const addGun_User = await UserGuns.upsert({
                    user_id: this.#interaction.author.id,
                    item_id: gun.item_id,
                    equipped_slot_1 : false,
                    equipped_slot_2 : false,

                    gun_name : pistol.name,
                    damage : damage,
                    accuracy : accuracy,
                    fire_rate : fire_interval,
                    magazine_size : magazine_size,
                    reload_speed : reload_speed,
                    crit_dmg : damage*crit_dmg,
                    shot_cost : shot_cost,
                    projectile_count : projectile_count,

                    body : body,
                    barrel: barrel,
                    grip : grip,
                    scope : scope,
                    rarity : itemRarity,
                    gun_type : gunType,
                })

                if(addGun_User) console.log("Gun added!");
            }




        }

    }


};
module.exports = {ItemStatHandler};