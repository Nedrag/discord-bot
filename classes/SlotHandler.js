const {BotUtil} = require("./BotUtil.js");

class SlotHandler
{
    //TODO
    //-Check if the user is in the right channel [DONE]
    //-Implement rolling []

    #util; //Utility
    #interaction; //Main payload

    constructor(interaction){
        this.#interaction = interaction;
        this.#util = new BotUtil(interaction);
    }

    handleRoll()
    {
        if(this.#util.checkRollChannel()) return;
        const rollModifier = Math.random(); //Impelmentirati neku normalnu raspodelu za ovo
        //TODO
        //-na osonvu rollMod, izabere se item iz pool-a 
        if(rollModifier < 0.5) return;

        this.#interaction.reply("hi!");
    }
}
module.exports = {SlotHandler};


