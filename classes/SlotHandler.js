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
        if(this.#interaction.channel.id != 1086203879642902528){
            this.#interaction.reply("They see me rolling in the wrong channel... Go to #item-slots to roll!");
            return;
        }
        const ish = new ItemStatHandler(this.#interaction);
        const user = await Users.findOne({where : {user_id : this.#interaction.author.id}});
        const gambasLeft = user.gambas;


        if(!gambasLeft){
            this.#interaction.reply("You don't have any gambas left. ");
            return;
        }

        await ish.rollAndAddItem();
        await Users.increment({gambas : -1}, {where : {user_id: this.#interaction.author.id}});
        return;
    }

}
module.exports = {SlotHandler};


