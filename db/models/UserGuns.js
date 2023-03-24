module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_guns', {
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
		body: DataTypes.STRING,
		barrel: DataTypes.STRING,
		grip: DataTypes.STRING,
		scope: DataTypes.STRING,
		rarity: DataTypes.STRING,
		gun_type: DataTypes.STRING,

		gun_name: DataTypes.STRING,
		damage : DataTypes.INTEGER,
		accuracy : DataTypes.INTEGER,
		fire_rate : DataTypes.INTEGER,
		magazine_size : DataTypes.INTEGER,
		reload_speed : DataTypes.INTEGER,
		crit_dmg : DataTypes.INTEGER,
		shot_cost : DataTypes.INTEGER,
		projectile_count : DataTypes.INTEGER,
		//Add Gun Stats

	},
	 {
		timestamps: false,
	});
};