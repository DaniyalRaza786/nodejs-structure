const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING(25),

        },
        last_name:{
            type: DataTypes.STRING(25),
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    users.beforeCreate(async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
    });

    users.beforeUpdate(async (user) => {
        if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 10);
        }
    });

    return users;
}