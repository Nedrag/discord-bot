const {Events} = require('discord.js');




module.exports = {//Console log-uje da je ulogovan, kada se bot pokrene.
    name: Events.ClientReady,
    once: true, 
    async execute(client){

       console.log(`Logged in as ${client.user.tag}.`);
    }
}