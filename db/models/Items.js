module.exports = (sequelize, DataTypes) => {
	return sequelize.define('items', {
		name: {
			type: DataTypes.STRING,
			unique: true,
		},
		cost: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
        rarity :{
            type: DataTypes.FLOAT,
            allowNull: false
        },
		power: {//Strength
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		speed: {//Attack speed
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		stamina: {//Health
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		precision: {//Accuracy
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		mana: {//Accuracy
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING,
			allowNUll : false,
		}

	}, {
		timestamps: false,
	});
};