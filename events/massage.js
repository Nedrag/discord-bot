const {Events} = require("discord.js");
const {InstanceHandler} = require('../classes/Instance.js');
const { execute } = require("./ready");
const COMMAND_PREFIX = '$';

module.exports = 
{
    name: Events.MessageCreate,
    async execute(interaction)
    {
        if(!(interaction.content.charAt(0) === COMMAND_PREFIX)) return; // Checks if command
        //TODO:
        //-Create a thread as a new instance
        //-Create a temporary role (or give only the creator of the thread) permission to write in that chat 
        //-After some time (Testing time: 1min) remove the role and delete the thread
        const instance = new InstanceHandler(interaction);//Intance Handler Object 
        instance.handleCreateThread();




    }

}
