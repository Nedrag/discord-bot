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

    async handleRoll()
    {
        //TODO 
        //Implementirati...
    }

}
module.exports = {SlotHandler};


