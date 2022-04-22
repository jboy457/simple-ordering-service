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
            },
            productName: {
                type: DataTypes.STRING,
                allowNull: false,
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
            foriegnKey: 'sellerId',
        });
    };

    return Product;
};
