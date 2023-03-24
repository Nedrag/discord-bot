//Custom
const {ItemStatHandler} = require("./ItemStatHandler.js");

//Discord.js

//Database imports
const { Users, Stands, UserStands, ItemsGuns_Pistols, ItemRarityPool, GearPool, GunsAndGear,GunsPool} = require('../db/dbObjects.js');
class SlotHandler
{
    #interaction; //Main payload

    constructor(interaction){
        this.#interaction = interaction;
    }

    async handleRoll()
    {
        
        console.log("OK1");
        const ish = new ItemStatHandler(this.#interaction);
        await ish.addItem();
    }

}
module.exports = {SlotHandler};


