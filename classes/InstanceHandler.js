const {BotUtil} = require("./BotUtil.js");
const {ChannelType} = require('discord.js');


class InstanceHandler {
    #interaction;
    #util;
    constructor(interaction)
    {
        this.#interaction = interaction;
        this.#util = new BotUtil(this.#interaction);
    }
    handleCreateThread()
    {
        if(!(this.#interaction.channel.id == this.#util.INSTANCE_CHANNEL_ID)) return;//CHANNEL for starting encounters
        console.log("Succsefully created a thread!");
        //TODO:
        //Check ingame currency itd itd.

        //Get channel manager
        const channel = this.#interaction.guild.channels.cache.find(c => c.id == this.#util.INSTANCE_CHANNEL_ID);
        this.#util.wait(0.5 * 1000)
        .then(() => 
        {
            if(this.#util.checkThreadExists(this.#interaction)) return;//Samo jedan moze da bude istovremeno
            const thread = channel.threads.create({
                            name: "" + this.#interaction.author.id,
                            type : ChannelType.PrivateThread
            })
            .then(
                //TODO
                //Dodati welocome message kada udjes u dungeon

                thread => {thread.send(`WELCOME TO YOUR ENCOUNTER!`)
                thread.members.add(this.#interaction.author.id) //Doda u thread onoga ko je pozvao 
                }
            )
            

        })
    }
};

module.exports = {InstanceHandler }