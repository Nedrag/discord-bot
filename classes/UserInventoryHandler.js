//Custom
//Discord.js
const {Collection} = require('discord.js');

//Database imports
const { Users, Stands, UserStands, ItemsGuns_Pistols } = require('../db/dbObjects.js');
const { Op } = require('sequelize');
//Temp collections

class UserInventoryHandler
{
    #interaction;

    constructor(interaction)
    {
        this.#interaction = interaction;
    }
    async getUser(){

        const user = await Users.findOne({where : {user_id : this.#interaction.author.id}});
        if(!user){
            console.log("No user found.");
            await Users.upsert({
                user_id: this.#interaction.author.id,
                balance : 100,
                gambas : 10
            })
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
   
    async addBalance() {
        if(this.#interaction.author.id != 895721187718623233) return; //ADMIN ONLY
        
        const user = await this.getUser();
        const amountNew = user.balance + 50;

        await Users.increment({balance : 50, gambas: 10 }, {where : {user_id : this.#interaction.author.id}});
        await this.getBalance();

        return amountNew ;
    }
    
    async getGambas()
    {
        const user = await this.getUser();
        return user.gambas;
    }


}

module.exports = {UserInventoryHandler};