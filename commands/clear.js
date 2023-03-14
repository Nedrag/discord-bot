const {SlashCommandBuilder} = require('discord.js');
//Komanda za clear-ovanje chat-a.

module.exports = 
{
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clears the chat!"),
    async execute(interaction)
    {
        const channel = interaction.channel;

       
        //if(!channel.messages.size) {console.error("Nothing to delete!");return;} // Da ne baci error.
        
        await channel.bulkDelete(50, true).then(messages => console.log(`Bulk deleted ${messages.size} messages`)).catch( (error) => {return;})
        
        
    }

}