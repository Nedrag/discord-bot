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

//fk => kolona u UserStands koja ce da pointuje na bazu stands.
UserStands.belongsTo(Stands, { foreignKey: 'stand_id', as: 'stands' });


module.exports = { Users, Stands, UserStands};