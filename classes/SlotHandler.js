//Custom
const {UserInventoryHandler} = require("./UserInventoryHandler.js");

//Discord.js

//Database imports
const { Users, Stands, UserStands, ItemsGuns_Pistols, ItemRarityPool, GearPool, GunsAndGear,GunsPool} = require('../db/dbObjects.js');
const { Op } = require('sequelize');
const {Pistols} = require("../db/models/Pistols.js");

class SlotHandler
{
    #interaction; //Main payload

    constructor(interaction){
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

        //if(itemGuns_Choice.name == "ITEM_GUNS_PISTOL"){
            const gunPistol_Pool = await ItemsGuns_Pistols.findAll();
            const gunPistol_Choice = this.randomWeight(gunPistol_Pool);
            //console.log(gunPistol_Choice);

            return gunPistol_Choice;
        // }
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

        //const itemRarity_Choice = await this.handleItemIsGun()
        //console.log(gunsAndGear_Choice.name);


        switch(gunsAndGear_Choice.name)
        {
            case "ITEM_GUNS":
                //this.handleItemIsGun();
                console.log(await this.handleItemIsGun());
                break;
            case "ITEM_GEAR":
                break;

        }

        

        //console.log(gunsAndGear_Choice);


    }
    async addItem(id, item)
    {
        //TODO 
        //Implementirati...
    }


    async handleRoll()
    {
        //TODO 
        //Implementirati...
    }

}
module.exports = {SlotHandler};


