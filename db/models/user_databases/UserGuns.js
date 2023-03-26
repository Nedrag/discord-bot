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
		damage : DataTypes.DOUBLE,
		max_accuracy : DataTypes.DOUBLE,
		min_accuracy : DataTypes.DOUBLE,
		fire_interval : DataTypes.DOUBLE,
		magazine_size : DataTypes.DOUBLE,
		reload_speed : DataTypes.DOUBLE,
		crit_dmg : DataTypes.DOUBLE,
		shot_cost : DataTypes.DOUBLE,
		projectile_count : DataTypes.DOUBLE,
		melee_dmg :DataTypes.DOUBLE,
		spread :DataTypes.DOUBLE,
		status_chance: DataTypes.DOUBLE,
		status_dmg: DataTypes.DOUBLE,

		//Add Gun Stats

	},
	 {
		timestamps: false,
	});
};