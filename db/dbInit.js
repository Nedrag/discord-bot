const { Collection } = require('discord.js');
const { QueryInterface } = require('sequelize');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Stands = require('./models/Stands.js')(sequelize, Sequelize.DataTypes);
require('./models/Users.js')(sequelize, Sequelize.DataTypes);
require('./models/UserStands.js')(sequelize, Sequelize.DataTypes);
const GunsAndGear = require('./models/GunsAndGear.js')(sequelize, Sequelize.DataTypes); 
const GunsPool = require('./models/GunsPool.js')(sequelize, Sequelize.DataTypes);
const GearPool = require('./models/GearPool.js')(sequelize, Sequelize.DataTypes);
const ItemRarityPool = require('./models/ItemsRarityPool.js')(sequelize, Sequelize.DataTypes);
const ItemGuns_Pistols= require('./models/Pistols.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');
//CONSTANTS *** Weight => The lower the rarer
const ITEM_GUNS_ODDS = 10000;
const ITEM_GEAR_ODDS = 100;
const ITEM_MONEY_ODDS = 1000;
const ITEM_GAMBAS_ODDS = 200;

const ITEM_GUNS_PISTOL = 10000;
const ITEM_GUNS_SHOTGUN = 100;
const ITEM_GUNS_SNIPER = 100;
const ITEM_GUNS_RIFLE = 100;
const ITEM_GUNS_LAUNCHER = 100;

const ITEM_GEAR_RELIC = 100;
const ITEM_GEAR_SHIELD = 100;
const ITEM_GEAR_CLASSMOD = 100;

const ITEM_RARITY_WHITE = 1000;
const ITEM_RARITY_GREEN =900;
const ITEM_RARITY_BLUE = 800;
const ITEM_RARITY_PURPLE = 300;
const ITEM_RARITY_ORANGE = 200;

let GUNS_PISTOL_PARTS = new Collection();

GUNS_PISTOL_PARTS.set("BODY",["JAKOBS", "TORGUE" , "HYPERION" , "MALIWAN", "DHAL", "TEDIORE", "BANDIT", "VLADOF"])
GUNS_PISTOL_PARTS.set("BARREL", ["JAKOBS", "TORGUE" , "HYPERION" , "MALIWAN", "DHAL", "TEDIORE", "BANDIT", "VLADOF", "E-TECH"])
//GUNS_PISTOL_PARTS.set("GRIP", ["JAKOBS", "TORGUE" , "HYPERION" , "MALIWAN", "DHAL", "TEDIORE", "BANDIT", "VLADOF"])
//GUNS_PISTOL_PARTS.set("SCOPE", ["JAKOBS", "TORGUE" , "HYPERION" , "MALIWAN", "DHAL", "TEDIORE", "BANDIT", "VLADOF", "NONE"])

const GUNS_SNIPER_PARTS = {
	"BODY" : ["JAKOBS",  "HYPERION" , "MALIWAN", "DHAL",  "VLADOF"],
	"BARREL" : ["JAKOBS",  "HYPERION" , "MALIWAN", "DHAL",  "VLADOF", "E-TECH"],
	"GRIP" : ["JAKOBS",  "HYPERION" , "MALIWAN", "DHAL",  "VLADOF"],
	"STOCK" : ["JAKOBS",  "HYPERION" , "MALIWAN", "DHAL",  "VLADOF"],
	"SCOPE" : ["JAKOBS",  "HYPERION" , "MALIWAN", "DHAL",  "VLADOF"],
} 
sequelize.sync({ force }).then(async () => {
	const stands = [
		Stands.upsert({ name: 'Star Platinum', cost: 100000 , rarity: 0.01,
		power: 1, speed: 1, stamina: 1, precision: 1, mana: 1 }),
		Stands.upsert({ name: 'Hermit Purple', cost: 56000, rarity: 0.02,
		power: 1, speed: 1, stamina: 1, precision: 1, mana: 1  }),
		Stands.upsert({ name: `Magician's Red`, cost: 56000, rarity: 0.02,
		power: 1, speed: 1, stamina: 1, precision: 1, mana: 1  }),
		Stands.upsert({ name: 'Hierophant Green', cost: 56000 , rarity: 0.02,
		power: 1, speed: 1, stamina: 1, precision: 1, mana: 1 }),
		Stands.upsert({ name: 'Silver Chariot', cost: 56000, rarity: 0.02,
		power: 1, speed: 1, stamina: 1, precision: 1, mana: 1  }),
		Stands.upsert({ name: `The Fool`, cost: 56000, rarity: 0.02,
		power: 1, speed: 1, stamina: 1, precision: 1, mana: 1  }),
		Stands.upsert({ name: 'The World', cost: 100000 , rarity: 0.01,
		power: 1, speed: 1, stamina: 1, precision: 1, mana: 1 }),
		
        
	]
	const gunsAndGear = [
		GunsAndGear.upsert({name: "ITEM_GUNS", weight: ITEM_GUNS_ODDS}),
		GunsAndGear.upsert({name: "ITEM_GEAR", weight: ITEM_GEAR_ODDS}),
		GunsAndGear.upsert({name: "ITEM_MONEY", weight: ITEM_MONEY_ODDS}),
		GunsAndGear.upsert({name: "ITEM_GAMBAS", weight: ITEM_GAMBAS_ODDS}),

	]
	const itemRarityPool = [
		ItemRarityPool.upsert({name: "ITEM_RARITY_WHITE", weight: ITEM_RARITY_WHITE}),
		ItemRarityPool.upsert({name: "ITEM_RARITY_GREEN", weight: ITEM_RARITY_GREEN}),
		ItemRarityPool.upsert({name: "ITEM_RARITY_BLUE", weight: ITEM_RARITY_BLUE}),
		ItemRarityPool.upsert({name: "ITEM_RARITY_PURPLE", weight: ITEM_RARITY_PURPLE}),
		ItemRarityPool.upsert({name: "ITEM_RARITY_ORANGE", weight: ITEM_RARITY_ORANGE}),

	]
	const gunsPool = [
		GunsPool.upsert({name: "ITEM_GUNS_PISTOL", weight: ITEM_GUNS_PISTOL}),
		GunsPool.upsert({name: "ITEM_GUNS_RIFLE", weight: ITEM_GUNS_RIFLE}),
		GunsPool.upsert({name: "ITEM_GUNS_SNIPER", weight: ITEM_GUNS_SNIPER}),
		GunsPool.upsert({name: "ITEM_GUNS_SHOTGUN", weight: ITEM_GUNS_SHOTGUN}),
		GunsPool.upsert({name: "ITEM_GUNS_LAUNCHER", weight: ITEM_GUNS_LAUNCHER}),

	]
	const gearPool = [
		GearPool.upsert({name: "ITEM_GEAR_SHIELD", weight: ITEM_GEAR_SHIELD}),
		GearPool.upsert({name: "ITEM_GEAR_RELIC", weight: ITEM_GEAR_RELIC}),
		GearPool.upsert({name: "ITEM_GEAR_CLASSMOD", weight: ITEM_GEAR_CLASSMOD}),
	]

	//
	let itemGuns_pistols = [];
	let i,j,name;
	let index = 0;
	for(i = 0 ; i < GUNS_PISTOL_PARTS.get('BODY').length; i++){
		for(j = 0; j < GUNS_PISTOL_PARTS.get('BARREL').length; j++){

			const body = GUNS_PISTOL_PARTS.get('BODY')[i];
			const barrel = GUNS_PISTOL_PARTS.get('BARREL')[j];

			if(body == "BANDIT"){
			if(
				barrel == "BANDIT" ||
				barrel == "DAHL" ||
				barrel == "MALIWAN" ||
				barrel == "TEDIORE" 
			) name = "Pistal"
			if(barrel == "JAKOBS") name = "Ass Beeter!"
			if(barrel == "HYPERION") name = "Hed Shoter!"
			if(barrel == "TORGUE") name = "Magamum!"
			if(barrel == "VLADOF") name = "Ratatater!"
			}

			if(body == "HYPERION"){
			if(
				barrel == "BANDIT" ||
				barrel == "DHAL" ||
				barrel == "MALIWAN" ||
				barrel == "TEDIORE" 
			) name = "Apparatus"
			if(barrel == "JAKOBS") name = "Leverage"
			if(barrel == "HYPERION") name = "Vision"
			if(barrel == "TORGUE") name = "Impact"
			if(barrel == "VLADOF") name = "Synergy"
			}

			if(body == "JAKOBS"){
			if(
				barrel == "BANDIT" ||
				barrel == "DHAL" ||
				barrel == "MALIWAN" ||
				barrel == "TEDIORE" 
			) name = "Revolver Wheelgun"
			if(barrel == "JAKOBS") name = "Iron"
			if(barrel == "HYPERION") name = "Longarm"
			if(barrel == "TORGUE") name = "Widow Maker"
			if(barrel == "VLADOF") name = "Pepperbox"
			}

			if(body == "MALIWAN"){
			if(
				barrel == "BANDIT" ||
				barrel == "DHAL" ||
				barrel == "MALIWAN" ||
				barrel == "TEDIORE" 
			) name = "Aegis"
			if(barrel == "JAKOBS") name = "Torment"
			if(barrel == "HYPERION") name = "Phobia"
			if(barrel == "TORGUE") name = "Animosity"
			if(barrel == "VLADOF") name = "Umbrage"
			}

			if(body == "TEDIORE"){
			if(
				barrel == "BANDIT" ||
				barrel == "DHAL" ||
				barrel == "MALIWAN" ||
				barrel == "TEDIORE" 
			) name = "Handgun"
			if(barrel == "JAKOBS") name = "Power Shot"
			if(barrel == "HYPERION") name = "Aimshot"
			if(barrel == "TORGUE") name = "Biggun"
			if(barrel == "VLADOF") name = "Quickshot"
			}
			
			if(body == "TORGUE"){
			if(
				barrel == "BANDIT" ||
				barrel == "DHAL" ||
				barrel == "MALIWAN" ||
				barrel == "TEDIORE" 
			) name = "Hand Cannon"
			if(barrel == "JAKOBS") name = "Rod"
			if(barrel == "HYPERION") name = "Hole Puncher"
			if(barrel == "TORGUE") name = "Slapper"
			if(barrel == "VLADOF") name = "Injector"
			}
			
			if(body == "VLADOF"){
			if(
				barrel == "BANDIT" ||
				barrel == "DHAL" ||
				barrel == "MALIWAN" ||
				barrel == "TEDIORE" 
			) name = "TMP"
			if(barrel == "JAKOBS") name = "Fighter"
			if(barrel == "HYPERION") name = "Assassin"
			if(barrel == "TORGUE") name = "Troublemaker"
			if(barrel == "VLADOF") name = "Anarchist"
			}

			itemGuns_pistols[index] = ItemGuns_Pistols.upsert({
				body : body, barrel: barrel, name : name, item_id : index 
			})		
				index++;

		}
	}
	

	await Promise.all(stands);
	await Promise.all(gunsAndGear);
	await Promise.all(gunsPool);
	await Promise.all(gearPool);
	await Promise.all(itemRarityPool);
	await Promise.all(itemGuns_pistols);
	console.log('Database synced');

	sequelize.close();
}).catch(console.error);