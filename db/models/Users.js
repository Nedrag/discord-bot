
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        user_id : {
            type : DataTypes.STRING,
            primaryKey : true
        },
        balance : {
            type : DataTypes.INTEGER,
            defaultValue: 100,//Testing purposes
            allowNull: false
        },
        gambas : {
            type: DataTypes.INTEGER,
            defaultValue: 100,
            allowNull: false
        }
        
    }, {
        timestamps : false
    });
};

