const { Collection } = require('discord.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Users = require('./models/Users.js')(sequelize, Sequelize.DataTypes);
const Characters = require('./models/Characters.js')(sequelize, Sequelize.DataTypes);

const UserCharacters = require('./models/user_databases/UserCharacters.js')(sequelize, Sequelize.DataTypes);
const UserGuns = require('./models/user_databases/UserGuns.js')(sequelize, Sequelize.DataTypes);
const UserGear = require('./models/user_databases/UserGear.js')(sequelize, Sequelize.DataTypes);

//DO NOT CHANGE
const GunsAndGear = require('./models/item_pools/GunsAndGear.js')(sequelize, Sequelize.DataTypes); 
const GunsPool = require('./models/item_pools/GunsPool.js')(sequelize, Sequelize.DataTypes);
const GearPool = require('./models/item_pools/GearPool.js')(sequelize, Sequelize.DataTypes);
const ItemRarityPool = require('./models/item_pools/ItemsRarityPool.js')(sequelize, Sequelize.DataTypes);
const ItemsGuns_Pistols= require('./models/item_guns/Pistols.js')(sequelize, Sequelize.DataTypes);
const ItemPistol_Parts= require('./models/item_guns_parts/itemPistol_parts.js')(sequelize, Sequelize.DataTypes);

const EnemyPool = require('./models/enemy_pools/EnemyPool.js')(sequelize, Sequelize.DataTypes);

//fk => kolona u UserStands koja ce da pointuje na bazu stands.


module.exports = { Users, Characters, UserCharacters, ItemsGuns_Pistols, ItemRarityPool, GearPool, GunsAndGear,GunsPool
,UserGear, UserGuns, ItemPistol_Parts, EnemyPool};