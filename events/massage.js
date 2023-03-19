//Discord.js imports
const {Events, Collection} = require("discord.js");
const { execute } = require("./ready");

//Custom classes imports
const {InstanceHandler} = require('../classes/InstanceHandler.js');
const {SlotHandler} = require('../classes/SlotHandler.js');

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
        //slotHandler.updateCollection();
        

        //Main logic for commands    
        switch(interaction.content.toUpperCase())
        {
            case "$I":
            case "$INSTANCE":
                instanceHandler.handleCreateThread();
                break;
            case "$R":
                slotHandler.handleRoll();
                //console.log(slotHandler.getItem())
                break;
            case "$BALANCE":
            case "$B":
                //console.log(slotHandler.getBalance(interaction.author.id));
                interaction.reply(`${interaction.author} your current balance: $${slotHandler.getBalance()}`)

                break;
            case "$ADD":
                slotHandler.addBalance(50);
                interaction.reply(`${interaction.author} your current balance: $${slotHandler.getBalance()}`)
                break;

        }
    }
}
