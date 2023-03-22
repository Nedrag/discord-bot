
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_stands', {
		user_id: DataTypes.STRING,
		stand_id: DataTypes.INTEGER,
        level : {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
        exp : {
            type: DataTypes.FLOAT,
            defaultValue: 0,
            allowNull: false
        },
		equipped : {
			type: DataTypes.BOOLEAN,
			defaultValue : false,
			allowNull : false
		}
	},
	 {
		timestamps: false,
	});
};