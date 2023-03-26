
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_chars', {
		user_id: DataTypes.STRING,
		char_id: DataTypes.INTEGER,
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
        in_use : DataTypes.BOOLEAN,
        
	},
	 {
		timestamps: false,
	});
};