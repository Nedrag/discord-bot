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

        //Main logic for commands    
        switch(interaction.content.toUpperCase().split(" ")[0])
        {
            case "$I":
            case "$INSTANCE":
                instanceHandler.handleCreateThread();
                break;
            case "$R":
                //slotHandler.handleRoll();
                await slotHandler.getItem();
                
                //console.log(slotHandler.getItem())
                break;
            case "$BALANCE":
            case "$B":
                await userInventoryHandler.getBalance();

                break;
            case "$ADD":
                await userInventoryHandler.addBalance(); //ADMIN ONLY
                break;
            case "$L":
                await userInventoryHandler.handleLevelUp(100);
                break;
            case "$E":
                await userInventoryHandler.handleEquipStand();
                break;
            case "$T":
                await userInventoryHandler.temp();
                break;

        }
    }
}
