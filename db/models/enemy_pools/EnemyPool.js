module.exports = (sequelize, DataTypes) => {
    return sequelize.define('enemy_pool', {
        enemy_id : {
            type : DataTypes.INTEGER,
            unique: true
        },
        name : DataTypes.STRING,
        weight : DataTypes.INTEGER,

        
	},
	 {
		timestamps: false,
	});
};