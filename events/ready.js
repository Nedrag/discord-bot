const {Events, Collection} = require('discord.js');
const {UserInventoryHandler} = require('../classes/UserInventoryHandler.js');




module.exports = {//Console log-uje da je ulogovan, kada se bot pokrene.
    name: Events.ClientReady,
    once: true, 
    async execute(client){
        //Slot handler object
        const userInventoryHandler = new UserInventoryHandler(client);
        userInventoryHandler.updateCollection();//Updates the collection on ready

       console.log(`Logged in as ${client.user.tag}.`);
    }
}