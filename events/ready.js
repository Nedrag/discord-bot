const {Events} = require('discord.js');
//const {Character} = require('../bot.js')

module.exports = {//Console log-uje da je ulogovan, kada se bot pokrene.
    name: Events.ClientReady,
    once: true, 
    execute(client){
       console.log(`Logged in as ${client.user.tag}.`);
    }
}