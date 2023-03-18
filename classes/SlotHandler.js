const {BotUtil} = require("./BotUtil.js");
const {Collection} = require('discord.js');
const items = new Collection();

class SlotHandler
{
    //TODO
    //-Check if the user is in the right channel [DONE]
    //-Implement rolling []

    #util; //Utility
    #interaction; //Main payload
    #ITEM_COLLECTION

    constructor(interaction){
        this.#interaction = interaction;
        this.#util = new BotUtil(interaction);
        this.#ITEM_COLLECTION = items;
    }

    async handleRoll()
    {
        if(this.#util.checkRollChannel()) return;//Is Roll channel




    }

}
module.exports = {SlotHandler};


