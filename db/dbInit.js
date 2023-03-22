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
GUNS_PISTOL_PARTS.set("GRIP", ["JAKOBS", "TORGUE" , "HYPERION" , "MALIWAN", "DHAL", "TEDIORE", "BANDIT", "VLADOF"])
GUNS_PISTOL_PARTS.set("SCOPE", ["JAKOBS", "TORGUE" , "HYPERION" , "MALIWAN", "DHAL", "TEDIORE", "BANDIT", "VLADOF", "NONE"])

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
	let i,j,k,l;
	let index = 0;
	for(i = 0 ; i < GUNS_PISTOL_PARTS.get('BODY').length; i++){
		for(j = 0; j < GUNS_PISTOL_PARTS.get('GRIP').length; j++){
			for(k = 0; k < GUNS_PISTOL_PARTS.get('SCOPE').length; k++){
				for(l = 0; l < GUNS_PISTOL_PARTS.get('BARREL').length; l++){
					itemGuns_pistols[index] = ItemGuns_Pistols.upsert({item_id: index, name: "GUN NO." + i + j + k + l,
				body: GUNS_PISTOL_PARTS.get("BODY")[i], barrel: GUNS_PISTOL_PARTS.get("BARREL")[l],
				grip: GUNS_PISTOL_PARTS.get("GRIP")[j], scope: GUNS_PISTOL_PARTS.get("SCOPE")[k]})
				
				
				index++;

				}
			}
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