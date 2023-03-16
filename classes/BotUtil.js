

class BotUtil
{

    CHANNEL_ID = 1085947961437073469;//#wild
    #interaction;
    constructor(interaction)
    {
        this.#interaction = interaction;
    }
    
    wait(ms)
    {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
    checkThreadExists()
    {
        for(const channel of this.#interaction.guild.channels.cache.values())
        {
            if(channel.id != this.CHANNEL_ID) continue;
            for(const thread of channel.threads.cache.values())
            {  
                if(thread.name === "" + this.#interaction.author.id) return true;
            }        
        }
        return false;
    }

};
module.exports = {BotUtil}