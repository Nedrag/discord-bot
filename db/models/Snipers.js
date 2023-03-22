module.exports = (sequelize, DataTypes) => {
    return sequelize.define('item_guns_sniper', {
        item_id : {
            type : DataTypes.INTEGER,
            unique: true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        body : DataTypes.STRING,
        barrel: DataTypes.STRING,
        grip : DataTypes.STRING,
        scope : DataTypes.STRING,
        stock : DataTypes.STRING,
	},
	 {
		timestamps: false,
	});
};