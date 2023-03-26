module.exports = (sequelize, DataTypes) => {
	return sequelize.define('characters', {
		name: {
			type: DataTypes.STRING,
			unique: true,
		},
		char_id : {
			type : DataTypes.INTEGER,
			unique : true
		},
		default_health : DataTypes.INTEGER,
		skill_tree : DataTypes.INTEGER
		



	}, {
		timestamps: false,
	});
};