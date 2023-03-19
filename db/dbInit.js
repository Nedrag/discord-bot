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
		Items.upsert({ name: 'Star Platinum', cost: 100000 , rarity: 0.01}),
		Items.upsert({ name: 'Hermit Purple', cost: 56000, rarity: 0.02 }),
		Items.upsert({ name: `Magician's Red`, cost: 56000, rarity: 0.02 }),
		Items.upsert({ name: 'Hierophant Green', cost: 56000 , rarity: 0.02}),
		Items.upsert({ name: 'Silver Chariot', cost: 56000, rarity: 0.02 }),
		Items.upsert({ name: `The Fool`, cost: 56000, rarity: 0.02 }),
		Items.upsert({ name: 'The World', cost: 100000 , rarity: 0.01}),
		Items.upsert({ name: 'Osiris', cost: 25000 , rarity: 0.05}),
		Items.upsert({ name: 'Anubis', cost: 25000 , rarity: 0.05}),
		Items.upsert({ name: 'Horus', cost: 25000 , rarity: 0.05}),
		Items.upsert({ name: 'Atum', cost: 25000 , rarity: 0.05}),
		Items.upsert({ name: 'Tohth', cost: 25000 , rarity: 0.05}),
		Items.upsert({ name: 'Geb', cost: 25000 , rarity: 0.05}),
		Items.upsert({ name: 'Khnum', cost: 25000 , rarity: 0.05}),
		Items.upsert({ name: 'Bastet', cost: 25000 , rarity: 0.05}),
		Items.upsert({ name: 'Sethan', cost: 25000 , rarity: 0.05}),
        
	];

    //NOTE: ADDS A FIELD
    //If the database already exists
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