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
        }
	}, {
		timestamps: false,
	});
};