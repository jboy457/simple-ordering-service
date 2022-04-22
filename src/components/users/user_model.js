module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            deposit: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            role: {
                type: DataTypes.STRING,
                enum: ['buyer', 'seller'],
                allowNull: false,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            timestamp: true,
        },
    );

    return User;
};
