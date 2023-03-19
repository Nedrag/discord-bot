//Discord.js imports
const {Events, Collection} = require("discord.js");
const { execute } = require("./ready");

//Custom classes imports
const {InstanceHandler} = require('../classes/InstanceHandler.js');
const {SlotHandler} = require('../classes/SlotHandler.js');
const {UserInventoryHandler} = require('../classes/UserInventoryHandler.js');

const COMMAND_PREFIX = '$';

//Database imports for events
const { Users, Items } = require('../db/dbObjects.js');
const { Op } = require('sequelize');






module.exports = 
{
    name: Events.MessageCreate,
    async execute(interaction)
    {

        if(!(interaction.content.charAt(0) === COMMAND_PREFIX)) return; // Checks if command
        //TODO:
        //-After some time (Testing time: 1min) remove the role and delete the thread

        //Handlers for message commands
        const instanceHandler = new InstanceHandler(interaction);//Intance Handler Object 
        const slotHandler = new SlotHandler(interaction); 
        const userInventoryHandler = new UserInventoryHandler(interaction);
        await userInventoryHandler.addUser();

        //Main logic for commands    
        switch(interaction.content.toUpperCase())
        {
            case "$I":
            case "$INSTANCE":
                instanceHandler.handleCreateThread();
                break;
            case "$R":
                interaction.reply(`You just rolled ${await slotHandler.handleRoll()}
                You have ${await userInventoryHandler.getGambas()} Gambas left`);
                
                //console.log(slotHandler.getItem())
                break;
            case "$BALANCE":
            case "$B":
                await userInventoryHandler.getInventory();
                interaction.reply(`${interaction.author} your current balance: $${await userInventoryHandler.getBalance()}`)

                break;
            case "$ADD":
                interaction.reply(`New balance: ${await userInventoryHandler.addBalance()}`);
                break;

        }
    }
}
