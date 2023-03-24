const { Collection } = require('discord.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Users = require('./models/Users.js')(sequelize, Sequelize.DataTypes);
const Stands = require('./models/Stands.js')(sequelize, Sequelize.DataTypes);

const UserStands = require('./models/UserStands.js')(sequelize, Sequelize.DataTypes);
const UserGuns = require('./models/UserGuns.js')(sequelize, Sequelize.DataTypes);
const UserGear = require('./models/UserGear.js')(sequelize, Sequelize.DataTypes);

//DO NOT CHANGE
const GunsAndGear = require('./models/GunsAndGear.js')(sequelize, Sequelize.DataTypes); 
const GunsPool = require('./models/GunsPool.js')(sequelize, Sequelize.DataTypes);
const GearPool = require('./models/GearPool.js')(sequelize, Sequelize.DataTypes);
const ItemRarityPool = require('./models/ItemsRarityPool.js')(sequelize, Sequelize.DataTypes);
const ItemsGuns_Pistols= require('./models/item_guns/Pistols.js')(sequelize, Sequelize.DataTypes);
const ItemPistol_Parts= require('./models/item_guns_parts/itemPistol_parts.js')(sequelize, Sequelize.DataTypes);

//fk => kolona u UserStands koja ce da pointuje na bazu stands.
UserStands.belongsTo(Stands, { foreignKey: 'stand_id', as: 'stands' });


module.exports = { Users, Stands, UserStands, ItemsGuns_Pistols, ItemRarityPool, GearPool, GunsAndGear,GunsPool
,UserGear, UserGuns, ItemPistol_Parts};