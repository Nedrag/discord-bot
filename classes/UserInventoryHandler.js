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
    async handleEquipStand()
    {
        let input = "";
        for(let str of this.#interaction.content.split(" "))
        {
            if(str.startsWith("$")) continue;
            input += str + " ";
        }
        console.log(input);
        //input = input.toUpperCase();
        const standName = await Stands.findOne({where : {name: input.trimEnd() }})
        console.log("OK")
        if(!standName) return;

        const standInInv = await UserStands.findOne({where : {stand_id: standName.id, user_id: this.#interaction.author.id}});
        if(!standInInv){//Ako user nema taj stand
            this.#interaction.reply("You do not own that stand!");
            return;
        }
        await UserStands.update({equipped : true}, {where: {stand_id: standName.id, user_id: this.#interaction.author.id}});
        await UserStands.update({equipped : false}, {where: {stand_id: {[Op.not]: standName.id}, user_id: this.#interaction.author.id }});
        this.#interaction.reply(`Equipped: ${input}`);
        

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
        const stand = await UserStands.findOne({where : {user_id : this.#interaction.author.id, equipped: true}});
        if(!stand) return;
        let reqExp = this.levelUpFunction(stand.level);
        //Checks if the user is about to level up
        console.log(stand.exp + expGained);
        if(reqExp < stand.exp + expGained){
            console.log("Proslo")
            await UserStands.increment({level: 1 } , {where : {user_id: this.#interaction.author.id, equipped: true}});
            await this.#interaction.reply(`You level'd up! You're now level ${stand.level + 1}`);
        }
        //updates exp
        await UserStands.increment({exp: expGained} , {where : {user_id: this.#interaction.author.id, equipped: true}});
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
        const items = await UserStands.findAll({where : {user_id : this.#interaction.author.id}});
        for(const item of items)
        {
            const i = await Stands.findByPk(item.stand_id);
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