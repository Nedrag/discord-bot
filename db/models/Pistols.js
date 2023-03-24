module.exports = (sequelize, DataTypes) => {
    return sequelize.define('item_guns_pistol', {
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
        weight : {
            type: DataTypes.INTEGER,
            allowNull : false,
            defaultValue: 100
        }
        
	},
	 {
		timestamps: false,
	});
};