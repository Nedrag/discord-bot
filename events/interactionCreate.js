const {Events} = require('discord.js');
const { execute } = require('./ready');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) 
    {
        if(!interaction.isChatInputCommand()) return;

        //Storuje commanda objekat u promenljivu
        const command = interaction.client.commands.get(interaction.commandName);


        if(!command){//Ako je null

            console.log('No command matching ${interaction.commandName} was found!');
            return;
        }

        try {
            await command.execute(interaction);//Pokusa da uradi komandu
        } catch(error)
        {
            console.error('Error executing ${interaction.commandName}. ');
            console.error(error);// Ispise error
        }

    }

}