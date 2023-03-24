module.exports = (sequelize, DataTypes) => {
    return sequelize.define('item_pistol_parts', {
        part : DataTypes.STRING,
        manufacturer : DataTypes.STRING,
        weight :{ type : DataTypes.INTEGER,
			defaultValue: 100
		}
		//Add Gun Stats

	},
	 {
		timestamps: false,
	});
};