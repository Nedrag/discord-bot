
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_stands', {
		user_id: DataTypes.STRING,
		item_id: DataTypes.INTEGER,
        level : {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
		equipped_slot_1 : {
			type: DataTypes.BOOLEAN,
			defaultValue : false,
			allowNull : false
		},
		equipped_slot_2 : {//For guns
			type: DataTypes.BOOLEAN,
			defaultValue : false,
			allowNull : false
		},
		equipped_slot_3 : {
			type: DataTypes.BOOLEAN,
			defaultValue : false,
			allowNull : false
		},
		equipped_slot_4 : {//For gear
			type: DataTypes.BOOLEAN,
			defaultValue : false,
			allowNull : false
		},
		gear: DataTypes.BOOLEAN,
		gun: DataTypes.BOOLEAN,

	},
	 {
		timestamps: false,
	});
};