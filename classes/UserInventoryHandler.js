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
        if(user) return false;
        const createUser = await Users.create({
            user_id : this.#interaction.author.id,
        })
        return createUser;
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
        if(!user) return false;

        this.#interaction.reply(`CURRENT BALANCE: $${user.balance} | GAMBAS : ${user.gambas} `);
        
    }
    levelUpFunction(x)
    {
        return (0.1*Math.exp(x) + 1.9 * x)*1000;
    }
    async handleLevelUp(expGained){
        const user = await Users.findOne({where : {user_id : this.#interaction.author.id}});
        let reqExp = this.levelUpFunction(user.level);
        //Checks if the user is about to level up
        console.log(user.exp + expGained);
        if(reqExp < user.exp + expGained){
            console.log("Proslo")
            await Users.increment({level: 1 } , {where : {user_id: this.#interaction.author.id}});
            await this.#interaction.reply(`You level'd up! You're now level ${user.level + 1}`);
        }
        //updates exp
        await Users.increment({exp: expGained} , {where : {user_id: this.#interaction.author.id}});
        await this.#interaction.reply(`You've gained ${expGained}`)

    }
    async addBalance() {
        if(this.#interaction.author.id != 895721187718623233) return; //ADMIN ONLY
        
        const user = await this.getUser();
        const amountNew = user.balance + 50;

        await Users.increment({balance : 50, gambas: 10 }, {where : {user_id : this.#interaction.author.id}});
        await this.getBalance();

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