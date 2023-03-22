//Custom
const {BotUtil} = require("./BotUtil.js");
const {UserInventoryHandler} = require("./UserInventoryHandler.js");

//Discord.js
const {Collection} = require('discord.js');

//Database imports
const { Users, Stands, UserStands } = require('../db/dbObjects.js');
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
        const items = await Stands.findAll();
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
            const i = await UserStands.findOne({where : {stand_id : item.id, user_id : id}});

            const createItem = await UserStands.create({
                user_id: id,
                stand_id : item.id,
                level : 1,
                exp : 0,
                equipped : false
            });
            return createItem;
        //console.log(user);
    }


    async handleRoll()
    {
        //TODO 

        const user = await Users.findOne({where : {user_id : this.#interaction.author.id}});
        if(!user) return false;
        //console.log("OK");

        const gambas = user.gambas;
        if(!gambas){
            this.#interaction.reply("You don't have any gambas left...");    
            
            return false
        }; //If the user doesn't have any rolls left
        //console.log("OK");

        const rolledItem = await this.getItem();
        const stand = await UserStands.findOne({where : {user_id : this.#interaction.author.id, stand_id : rolledItem.id}});
        //console.log(item);
        if(stand != null){//Ako je null odnosno ako user nema taj stand 
            
            //if the user already has the rolled item => Add it's cost to the balance
            await Users.increment({balance: rolledItem.cost, gambas : -1}, {where: {user_id: this.#interaction.author.id}});
            const amountGained = rolledItem.cost*0.01;
            const uih = new UserInventoryHandler(this.#interaction);
            await uih.handleLevelUp(amountGained);

            //REPLY MESSAGE
            this.#interaction.reply(`You rolled: ${rolledItem.name}
            You have ${user.gambas - 1} left`);
            this.#interaction.reply(`Rolled duplicate => New Balance: ${user.balance}`);

            return true;

        }


        this.addItem(this.#interaction.author.id, rolledItem);
        await user.increment({gambas: -1 } , {where : {user_id: this.#interaction.author.id}});
        //REPLY MESSAGE
        this.#interaction.reply(`You rolled: ${rolledItem.name}
        You have ${user.gambas - 1} left`);


        return true; 
    }

}
module.exports = {SlotHandler};


