const { Collection } = require('discord.js');
const { QueryInterface } = require('sequelize');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Characters = require('./models/Characters.js')(sequelize, Sequelize.DataTypes);

require('./models/Users.js')(sequelize, Sequelize.DataTypes);
require('./models/user_databases/UserCharacters.js')(sequelize, Sequelize.DataTypes);
require('./models/user_databases/UserGuns.js')(sequelize, Sequelize.DataTypes);
require('./models/user_databases/UserGear.js')(sequelize, Sequelize.DataTypes);

const GunsAndGear = require('./models/item_pools/GunsAndGear.js')(sequelize, Sequelize.DataTypes); 
const GunsPool = require('./models/item_pools/GunsPool.js')(sequelize, Sequelize.DataTypes);
const GearPool = require('./models/item_pools/GearPool.js')(sequelize, Sequelize.DataTypes);
const ItemRarityPool = require('./models/item_pools/ItemsRarityPool.js')(sequelize, Sequelize.DataTypes);
const ItemGuns_Pistols= require('./models/item_guns/Pistols.js')(sequelize, Sequelize.DataTypes);
const ITEM_GUN_PISTOL_DEFINITION= require('./models/item_guns_parts/itemPistol_parts.js')(sequelize, Sequelize.DataTypes);
const EnemyPool = require('./models/enemy_pools/EnemyPool.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');
//CONSTANTS *** Weight => The lower the rarer
const ITEM_GUNS_ODDS = 10000;
const ITEM_GEAR_ODDS = 10000;
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

const ENEMY_CHUMP = 1000
const ENEMY_BADASS = 500 
const ENEMY_SUPER_BADASS = 200 
const ENEMY_NAMED_BOSS = 0 

let GUNS_PISTOL_PARTS = new Collection();
GUNS_PISTOL_PARTS.set("BODY",["JAKOBS", "TORGUE" , "HYPERION" , "MALIWAN", "DHAL", "TEDIORE", "BANDIT", "VLADOF"])
GUNS_PISTOL_PARTS.set("BARREL", ["JAKOBS", "TORGUE" , "HYPERION" , "MALIWAN", "DHAL", "TEDIORE", "BANDIT", "VLADOF", "E-TECH"])


sequelize.sync({ force }).then(async () => {
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
	const itemPistol_parts = [
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "ACCESSORIES", manufacturer: "ACCURACY_LASER",max_accuracy : 5,  min_accuracy : 5,spread:8, add_type: "GRADE"}),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "ACCESSORIES", manufacturer: "BAYONET_1", melee_dmg: 0.5, add_type: "PREADD"}),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "ACCESSORIES", manufacturer: "BAYONET_2", melee_dmg: 0.5, add_type: "PREADD"}),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "ACCESSORIES", manufacturer: "DOUBLE_LASER", add_type: "GRADE", fire_interval : -10, magazine_size: 4, min_accuracy: -5, damage: -5, spread : -5}),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "ACCESSORIES", manufacturer: "DOUBLE_LASER", add_type: "PREADD", magazine_size: 2, projectile_count : 0.4, spread: 1}),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "ACCESSORIES", manufacturer: "DOUBLE_LASER", add_type: "SCALE", projectile_count: 0.6, shot_cost : 1}),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "ACCESSORIES", manufacturer: "STOCK", add_type: "GRADE", max_accuracy: 7, spread: 3}),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "ACCESSORIES", manufacturer: "TECH_1_MAG", add_type: "GRADE", magazine_size: 8, reload_speed: -3}),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "ACCESSORIES", manufacturer: "TECH_2_DAMAGE", add_type: "GRADE", damage: 6}),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "ACCESSORIES", manufacturer: "TECH_3_FIRERATE", add_type: "GRADE",fire_interval : 6, damage: -1}),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "BARREL", manufacturer: "BANDIT", add_type: "GRADE", damage: 2, min_accuracy: -3, spread: -3}),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "BARREL", manufacturer: "BANDIT", add_type: "GRADE"}),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "BARREL", manufacturer: "DAHL", add_type: "GRADE", damage: -3, max_accuracy: 5, spread: -4}),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "BARREL", manufacturer: "E_TECH", add_type: "SCALE",fire_interval: 0.5,status_chance: 0.2, damage: 1}),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "BARREL", manufacturer: "E_TECH", add_type: "PREADD", shot_cost: 1}),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "BARREL", manufacturer: "HYPERION", add_type: "GRADE",magazine_size: -2, min_accuracy: 5, damage: -4, spread: 7 }),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "BARREL", manufacturer: "HYPERION", add_type: "PREADD", crit_dmg: 0.15 }),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "BARREL", manufacturer: "JAKOBS", add_type: "GRADE",fire_interval: -12, min_accuracy: 5, damage: 6, spread: 8 }),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "BARREL", manufacturer: "MALIWAN", add_type : "SCALE", status_chance: 0.15}),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "BARREL", manufacturer: "MALIWAN", add_type : "GRADE",max_accuracy: 2, spread: 2}),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "BARREL", manufacturer: "TEDIORE", add_type : "GRADE",}),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "BARREL", manufacturer: "TORGUE", add_type : "GRADE", fire_interval: -3, min_accuracy: -8, reload_speed: -5, damage: 8}),
		ITEM_GUN_PISTOL_DEFINITION.upsert({part: "BARREL", manufacturer: "VLADOF", add_type : "GRADE", fire_interval: 10, magazine_size: 4, spread: -4}),


	]	

	const enemyPool = [
		EnemyPool.upsert({enemy_id: 1, name : "CHUMP", weight: ENEMY_CHUMP}),
		EnemyPool.upsert({enemy_id: 2, name : "BADASS", weight: ENEMY_BADASS}),
		EnemyPool.upsert({enemy_id: 3, name : "SUPER_BADASS", weight: ENEMY_SUPER_BADASS}),
		EnemyPool.upsert({enemy_id: 4, name : "NAMED_BOSS", weight: ENEMY_NAMED_BOSS}),
	] 
	

	await Promise.all(enemyPool);
	await Promise.all(gunsAndGear);
	await Promise.all(gunsPool);
	await Promise.all(gearPool);
	await Promise.all(itemRarityPool);
	await Promise.all(itemGuns_pistols);
	await Promise.all(itemPistol_parts);
	console.log('Database synced');

	sequelize.close();
}).catch(console.error);