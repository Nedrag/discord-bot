module.exports = (sequelize, DataTypes) => {
    return sequelize.define('item_pistol_parts', {
        part : DataTypes.STRING,
        manufacturer : DataTypes.STRING,
        weight :{ type : DataTypes.INTEGER,
			defaultValue: 100
		},
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


		//Add Gun Stats

	},
	 {
		timestamps: false,
	});
};