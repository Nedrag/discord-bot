//Discord.js imports
const {Events, Collection} = require("discord.js");
const { execute } = require("./ready");

//Custom classes imports
const {InstanceHandler} = require('../classes/InstanceHandler.js');
const {SlotHandler} = require('../classes/SlotHandler.js');

const COMMAND_PREFIX = '$';

//Database imports for events
const items = new Collection();
const { Users, Items } = require('../db/dbObjects.js');
const { Op } = require('sequelize');

async function addBalance(id, amount) {


    
	const user = items.get(id);

	if (user) {
		user.balance += Number(amount);
		return user.save();
	}

	const newUser = await Users.create({ user_id: id, balance: amount });
	items.set(id, newUser);

	return newUser;
}

function getBalance(id) {
	const user = items.get(id);
	return user ? user.balance : 0;
}



module.exports = 
{
    name: Events.MessageCreate,
    async execute(interaction)
    {
        //Updates the items collection with current database inforamtion
        const stored = await Users.findAll();  
        stored.forEach(i => items.set(i.user_id, i));
        console.log(items);

        if(!(interaction.content.charAt(0) === COMMAND_PREFIX)) return; // Checks if command
        //TODO:
        //-After some time (Testing time: 1min) remove the role and delete the thread

        //Handlers for message commands
        const instanceHandler = new InstanceHandler(interaction);//Intance Handler Object 
        const slotHandler = new SlotHandler(interaction);

        //Main logic for commands    
        switch(interaction.content.toUpperCase())
        {
            case "$I":
            case "$INSTANCE":
                instanceHandler.handleCreateThread();
                break;
            case "$R":
                slotHandler.handleRoll();
                break;
            case "$B":
                addBalance(interaction.author.id, 50);
                //interaction.reply(getBalance(interaction.author.id));
                console.log(getBalance(interaction.author.id));
                break;
        }
    }
}
