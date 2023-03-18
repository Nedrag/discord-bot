const { Collection } = require('discord.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Users = require('./models/Users.js')(sequelize, Sequelize.DataTypes);
const Items = require('./models/Items.js')(sequelize, Sequelize.DataTypes);
const UserItems = require('./models/UserItems.js')(sequelize, Sequelize.DataTypes);
const itemsCollection = new Collection();

UserItems.belongsTo(Items, { foreignKey: 'item_id', as: 'item' });


module.exports = { Users, Items, UserItems, itemsCollection };