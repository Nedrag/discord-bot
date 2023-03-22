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

const force = process.argv.includes('--force') || process.argv.includes('-f');

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
		Stands.upsert({ name: 'Osiris', cost: 25000 , rarity: 0.05,
		power: 1, speed: 1, stamina: 1, precision: 1, mana: 1 }),
		Stands.upsert({ name: 'Anubis', cost: 25000 , rarity: 0.05,
		power: 1, speed: 1, stamina: 1, precision: 1, mana: 1 }),
		Stands.upsert({ name: 'Horus', cost: 25000 , rarity: 0.05,
		power: 1, speed: 1, stamina: 1, precision: 1, mana: 1 }),
		Stands.upsert({ name: 'Atum', cost: 25000 , rarity: 0.05,
		power: 1, speed: 1, stamina: 1, precision: 1, mana: 1 }),
		Stands.upsert({ name: 'Tohth', cost: 25000 , rarity: 0.05,
		power: 1, speed: 1, stamina: 1, precision: 1, mana: 1 }),
		Stands.upsert({ name: 'Geb', cost: 25000 , rarity: 0.05,
		power: 1, speed: 1, stamina: 1, precision: 1, mana: 1 }),
		Stands.upsert({ name: 'Khnum', cost: 25000 , rarity: 0.05,
		power: 1, speed: 1, stamina: 1, precision: 1, mana: 1 }),
		Stands.upsert({ name: 'Bastet', cost: 25000 , rarity: 0.05,
		power: 1, speed: 1, stamina: 1, precision: 1, mana: 1 }),
		Stands.upsert({ name: 'Sethan', cost: 25000 , rarity: 0.05,
		power: 1, speed: 1, stamina: 1, precision: 1, mana: 1 }),
        
	];

    //NOTE: ADDS A FIELD
    //If the database already exists
    /*const queryInterface = sequelize.getQueryInterface();
    const addField = [
        queryInterface.addColumn('Users', 'xp',
        {
            type : Sequelize.DataTypes.FLOAT,
            allowNull : false,
            defaultValue: 0
        })
    ]
    await Promise.all(addField);*/

	await Promise.all(stands);
	console.log('Database synced');

	sequelize.close();
}).catch(console.error);