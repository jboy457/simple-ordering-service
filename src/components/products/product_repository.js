const { Product } = require('../../config');

class ProductRepository {
    static async create(newProduct) {
        const product = await Product.create(newProduct);
        return product;
    }

    static async findById(id) {
        const product = await Product.findOne({
            where: { id },
        });
        return product;
    }

    static async findSellerProductByName(sellerId, productName) {
        const product = await Product.findOne({
            where: { sellerId, productName },
        });
        return product;
    }

    static async findSellerProduct(id, sellerId) {
        const product = await Product.findOne({
            where: { id, sellerId },
        });
        return product;
    }

    static async findAll(pageNo, perPage) {
        const { rows: products, count } = await Product.findAndCountAll({
            order: [['id', 'DESC']],
            limit: perPage,
            offset: pageNo * perPage - perPage,
        });
        return { products, count, pageNo, perPage };
    }
}

module.exports = { ProductRepository };
