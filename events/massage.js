//Discord.js imports
const {Events} = require("discord.js");
const { execute } = require("./ready");
//Custom classes imports
const {InstanceHandler} = require('../classes/InstanceHandler.js');
const {SlotHandler} = require('../classes/SlotHandler.js');

const COMMAND_PREFIX = '$';

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

        //Main logic for commands    
        switch(interaction.content.toUpperCase())
        {
            case "$I":
            case "$Instance":
                instanceHandler.handleCreateThread();
                break;
            case "$R":
                slotHandler.handleRoll();
                break;
                
        }




    }

}
