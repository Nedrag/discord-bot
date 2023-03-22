module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_gear', {
		user_id: DataTypes.STRING,
		item_id: DataTypes.INTEGER,
        level : {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
		equipped_slot_shield: {
			type: DataTypes.BOOLEAN,
			defaultValue : false,
			allowNull : false
		},
		equipped_slot_relic : {//For guns
			type: DataTypes.BOOLEAN,
			defaultValue : false,
			allowNull : false
		},
		equipped_slot_classmod : {//For guns
			type: DataTypes.BOOLEAN,
			defaultValue : false,
			allowNull : false
		},

	},
	 {
		timestamps: false,
	});
};