const {Events, Collection} = require('discord.js');
const {SlotHandler} = require('../classes/SlotHandler.js');




module.exports = {//Console log-uje da je ulogovan, kada se bot pokrene.
    name: Events.ClientReady,
    once: true, 
    async execute(client){
        //Slot handler object
        const slotHandler = new SlotHandler(client);
        slotHandler.updateCollection();//Updates the collection on ready

       console.log(`Logged in as ${client.user.tag}.`);
    }
}