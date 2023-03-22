module.exports = (sequelize, DataTypes) => {
	return sequelize.define('guns_pool', {
		name: {
			type: DataTypes.STRING,
			unique: true,
		},
        weight : {
            type: DataTypes.INTEGER,
            allowNull : false
        } 
	}, {
		timestamps: false,
	});
};