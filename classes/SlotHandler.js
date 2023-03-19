//Custom
const {BotUtil} = require("./BotUtil.js");

//Discord.js
const {Collection} = require('discord.js');

//Database imports
const { Users, Items, UserItems } = require('../db/dbObjects.js');
const { Op } = require('sequelize');
//Temp collections
const users = new Collection();
const items = new Collection();

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
    async getItem()
    {
        //TODO
        //Implement a better random roll system [DONE]
        const items = await Items.findAll();
        let weightSum = 0;

        for(const item of items)
        {
            weightSum += item.rarity;
        }
        
        const min = 0;
        let rnd = Math.random() * (weightSum - min) + min;
        
        for(const item of items)
        {
            //console.log(item.rarity);
            //console.log(rnd);
            if(rnd < item.rarity) return item;
            rnd -= item.rarity;
        }
        
       
    }
    async addItem(id, item)
    {
            const i = await UserItems.findOne({where : {item_id : item.id, user_id : id}});
            if(!i){//If the user doesnt alredy have this item -> Adds it to his items

                const createItem = await UserItems.create({
                    user_id: id,
                    item_id : item.id,
                    amount: 1
                });
                return createItem;
            }//this passes only if the user already has that item
            const amountNew = i.amount + 1;
            const updateItem = await UserItems.update({amount: amountNew}, {where: {item_id : item.id, user_id: id}});
            return updateItem;
        //console.log(user);
    }

    async handleRoll()
    {
        //TODO 
        //Handle a case where user doesn't have any gambas left
        //if(this.#util.checkRollChannel()) return;//Is Roll channel
        //console.log("OK");

        const user = await Users.findOne({where : {user_id : this.#interaction.author.id}});
        if(!user) return;
        //console.log("OK");

        const gambas = user.gambas;
        if(!gambas) return; //If the user doesn't have any rolls left
        //console.log("OK");

        const rolledItem = await this.getItem();
        this.addItem(this.#interaction.author.id, rolledItem);
        await user.update({gambas: user.gambas - 1 } , {where : {user_id: this.#interaction.author.id}});

        return rolledItem.name
    }

}
module.exports = {SlotHandler};


