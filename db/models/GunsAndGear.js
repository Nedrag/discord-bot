
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('stands', {
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
        dmg: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        acc: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fire_rate: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reload_speed: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        magazine_size: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

	}, {
		timestamps: false,
	});
};