module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        'Product',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            sellerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
            },
            productName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            cost: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            amountAvailable: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
        },
        {
            timestamp: true,
        },
    );

    Product.associate = models => {
        Product.belongsTo(models.User, {
            foriegnKey: 'selletId',
        });
    };

    return Product;
};
