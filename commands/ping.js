const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data : new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'), // Info o komandi
    async execute(interaction) // Sta radi komanda
    {
        await interaction.reply('Hey bitch!!!!!!!');
    },

};