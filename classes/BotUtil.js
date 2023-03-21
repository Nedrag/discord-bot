

class BotUtil
{
    //CHANNEL IDS
    INSTANCE_CHANNEL_ID = 1085947961437073469;// wild
    ROLL_CHANNEL_ID = 1086203879642902528; //item-slots

    #interaction;//Payload

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
            if(channel.id != this.INSTANCE_CHANNEL_ID) continue;
            for(const thread of channel.threads.cache.values())
            {  
                if(thread.name === "" + this.#interaction.author.id) return true;
            }        
        }
        return false;
    }
    checkRollChannel()
    {
        return this.#interaction.channel.id != this.ROLL_CHANNEL_ID;
    }
    

};
module.exports = {BotUtil}