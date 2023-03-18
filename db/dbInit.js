const { QueryInterface } = require('sequelize');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Items = require('./models/items.js')(sequelize, Sequelize.DataTypes);
require('./models/Users.js')(sequelize, Sequelize.DataTypes);
require('./models/UserItems.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	const items = [
		Items.upsert({ name: 'Tea', cost: 1 , rarity: 0.1}),
		Items.upsert({ name: 'Coffee', cost: 2, rarity: 0.1 }),
		Items.upsert({ name: 'Cake', cost: 5, rarity: 0.1 }),
	];

    //NOTE: ADDS A FIELD
    //Should be initiated with the database
    /*const queryInterface = sequelize.getQueryInterface();
    const addField = [
        queryInterface.addColumn('Users', 'gambas',
        {
            type : Sequelize.DataTypes.INTEGER,
            allowNull : false,
            defaultValue: 10
        })
    ]
    await Promise.all(addField);*/

	await Promise.all(items);
	console.log('Database synced');

	sequelize.close();
}).catch(console.error);