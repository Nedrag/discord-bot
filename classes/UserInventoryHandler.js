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

class UserInventoryHandler
{
    #interaction;

    constructor(interaction)
    {
        this.#interaction = interaction;
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
    async addUser(){

        const user = await Users.findOne({where : {user_id : this.#interaction.author.id}});
        if(user) return;
        const createUser = await Users.create({
            user_id : this.#interaction.author.id,
        })
    }
    async getUser(){

        const user = await Users.findOne({where : {user_id : this.#interaction.author.id}});
        if(!user){
            console.log("No user found.");
            return;
        }
        return user;

    }
    async getBalance() {
        const user = await this.getUser();
        return user.balance;
        
    }
    async addBalance() {
        const user = await this.getUser();
        const amountNew = user.balance + 50;

        await Users.update({balance : amountNew}, {where : {user_id : this.#interaction.author.id}});

        return amountNew ;
    }
    async getInventory()
    {
        const items = await UserItems.findAll({where : {user_id : this.#interaction.author.id}});
        for(const item of items)
        {
            const i = await Items.findByPk(item.item_id);
            console.log(i.name);
        }
    }
    async getGambas()
    {
        const user = await this.getUser();
        return user.gambas;
    }


}

module.exports = {UserInventoryHandler};