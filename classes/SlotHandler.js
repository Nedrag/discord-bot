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
    async updateCollection()
    {
        //Updates the users collection with current database inforamtion
        const storedUsers =  await Users.findAll();  
        const storedItems = await Items.findAll();
        storedUsers.forEach(i => users.set(i.user_id, i));
        storedItems.forEach(i => items.set(i.id, i));
        
        return;
        //console.log(users);
    }
    getItem()
    {
        //TODO
        //Implement a better random roll system [DONE]

        let weightSum = 0;
        for(const item of items.values())
        {
            weightSum += item.rarity;
        }
        
        const min = 0;
        let rnd = Math.random() * (weightSum - min) + min;
        
        for(const item of items.values())
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
        //if(this.#util.checkRollChannel()) return;//Is Roll channel
        //console.log("OK");

        const user = users.get(this.#interaction.author.id);
        if(!user) return;
        //console.log("OK");

        const gambas = user.gambas;
        if(!gambas) return; //If the user doesn't have any rolls left
        //console.log("OK");

        const rolledItem = this.getItem();
        this.#interaction.reply(`You Rolled ${rolledItem.name}`);
        this.addItem(this.#interaction.author.id, rolledItem);
        user.gambas -= Number(1);
        user.save();
        this.#interaction.reply(`You have ${gambas} left.`);
    }
    
    getBalance() {
        const id = this.#interaction.author.id;
        
        const user = users.get(id);
        return user ? user.balance : 0;
    }
    async addBalance(amount) {
        const id = this.#interaction.author.id;
        const user = users.get(id);

        if (user) {
            user.balance += Number(amount);
            user.gambas += Number(10);
            return user.save();
        }

        const newUser = await Users.create({ user_id: id, balance: amount });
        users.set(id, newUser);

        return newUser;
    }

}
module.exports = {SlotHandler};


