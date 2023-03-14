const fs = require('node:fs'); // Da mozes da citas file-ove iz drugih directorijuma
const path = require('node:path'); //Da mozes da napises path do file-ova.
// Require the necessary discord.js classes
const { Client,Collection,  Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();// Collection() -> Pravi Hash mapu, storuju se komande. 

const commandsPath = path.join(__dirname, 'commands'); // Path za commande folder
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); //File-ovi sa komandama kao Lista.

for (const file of commandFiles) { // Cita sve fajlove u prethodno pomenutoj listi.
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
    // Provera ispravnost + Sta pise iznad.
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

//Isto kao i za komande, loop-uje kroz svaki event file gleda
//da li je once event ili on i exectue ih.
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
// Log in to Discord with your client's token
client.login(token);