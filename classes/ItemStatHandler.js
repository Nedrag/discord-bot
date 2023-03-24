//Custom
const {SlotHandler} = require("./UserInventoryHandler.js");

const BASE_STAT_SCALING = 1.13;
const GUNS_PISTOL_JAKOBS = new Collection();
GUNS_PISTOL_JAKOBS.set("DAMAGE", 11.36);
GUNS_PISTOL_JAKOBS.set("MAGAZINE_SIZE", 6.0);
GUNS_PISTOL_JAKOBS.set("RELOAD_SPEED", 2.1);
GUNS_PISTOL_JAKOBS.set("FIRE_INTERVAL", 0.06);
GUNS_PISTOL_JAKOBS.set("ACCURACY", 3.0);

//Database imports
const { Users, Stands, UserStands, ItemsGuns_Pistols, ItemRarityPool, GearPool, GunsAndGear,GunsPool} = require('../db/dbObjects.js');
const { Op } = require('sequelize');
const {Pistols} = require("../db/models/Pistols.js");
//Discord.js
const { Collection } = require("discord.js");

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

        if(itemGuns_Choice.name == "ITEM_GUNS_PISTOL"){
            const gunPistol_Pool = await ItemsGuns_Pistols.findAll();
            const gunPistol_Rarity = await this.handleItemRarity();
            const gunPistol_Choice = this.randomWeight(gunPistol_Pool);

            this.handleCalculateStats_Gun(itemGuns_Choice.name, gunPistol_Choice);

            return gunPistol_Choice;
        }
        return null;

    }
    async getItem()
    {
        //TODO 
        //Implementirati...
        const gunsAndGear_Pool = await GunsAndGear.findAll();
        const gunsAndGear_Choice = this.randomWeight(gunsAndGear_Pool);

        //Kada nije neki gear ili guns
        if(gunsAndGear_Choice.name == "ITEM_MONEY") return gunsAndGear_Choice;//Ide na neku funkciju koja dodaje na balance od usera
        if(gunsAndGear_Choice.name == "ITEM_GAMBAS") return gunsAndGear_Choice;

        const itemRarity_Choice = await this.handleItemRarity();
        //console.log(gunsAndGear_Choice.name);


        switch(gunsAndGear_Choice.name)
        {
            case "ITEM_GUNS":
                const itemGun_Choice = await this.handleItemIsGun();
                break;
            case "ITEM_GEAR":
                break;

        }

        

        //console.log(gunsAndGear_Choice);


    }

    async handleCalculateStats_Gun(gunType, gun, itemRarity)
    {
        const levelRange  = await Users.findOne({where: this.#interaction.author.id})
        if(gunType == "ITEM_GUNS_PISTOL"){

            const pistol = await Pistols.findOne({where : {item_id : gun.item_id}})
            const grips = await Pistol_Parts.findAll({where : {part: "GRIP"}})
            const scopes = await Pistol_Parts.findAll({where : {part: "SCOPE"}})
            const accessories = await Pistol_Parts.findAll({where : {part: "ACCESSORIES"}})

            const level = Math.random() * (levelRange + 1 - (levelRange - 3)) - (levelRange - 3);
            const beta = Math.pow(BASE_STAT_SCALING, level);


            //Parts
            const body = pistol.body;
            const barrel = pistol.barrel;
            const grip = this.randomWeight(grips).name;
            const scope = this.randomWeight(scopes).name; 
            const accessorie = this.randomWeight(accessories).name; 

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



        }

    }


};
module.exports = {ItemStatHandler};