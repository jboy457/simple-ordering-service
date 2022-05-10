const db = require('../../config/database').sequelize;
const { UserRepository } = require('../users/user_repository');
const { ProductRepository } = require('./product_repository');

class ProductService {
    static _serviceResponse(status, message, data) {
        return {
            status,
            message,
            data,
        };
    }

    static _convertToCoins(balance) {
        let amount = +balance;
        const allowedCoins = [5, 10, 20, 50, 100].reverse();
        const coins = [];

        for (var i = 0; i < allowedCoins.length; i++) {
            if (amount >= allowedCoins[i]) {
                amount = amount - allowedCoins[i];
                coins.push(allowedCoins[i]);
                i--;
            }
        }

        // check if amount is still left
        if (amount < balance && amount !== 0) coins.push(amount);
        return coins;
    }
    static async createProduct(sellerId, productToCreate) {
        const productExist = await ProductRepository.findSellerProductByName(
            sellerId,
            productToCreate.productName,
        );
        if (productExist)
            return this._serviceResponse(409, 'Product already exist.');
        const newProduct = { ...productToCreate, sellerId };
        const product = await ProductRepository.create(newProduct);
        return this._serviceResponse(
            201,
            'Successfully created product.',
            product,
        );
    }

    static async getProducts(query) {
        const pageNo = query.pageNo ? +query.pageNo : 1;
        const perPage = query.perPage ? +query.perPage : 10;
        const products = await ProductRepository.findAll(pageNo, perPage);
        return this._serviceResponse(
            200,
            'Successfully fetched product.',
            products,
        );
    }

    static async getProduct(productId) {
        const product = await ProductRepository.findById(productId);
        if (!product) return this._serviceResponse(404, 'Product not found.');
        return this._serviceResponse(
            200,
            'Successfully fetched product.',
            product,
        );
    }

    static async updateProduct(productId, sellerId, updatedProduct) {
        const product = await ProductRepository.findSellerProduct(
            productId,
            sellerId,
        );
        if (!product) return this._serviceResponse(404, 'Product not found.');
        await product.update(updatedProduct);
        return this._serviceResponse(200, 'Successfully updated product.');
    }

    static async deleteProduct(productId, sellerId) {
        const product = await ProductRepository.findSellerProduct(
            productId,
            sellerId,
        );
        if (!product) return this._serviceResponse(404, 'Product not found.');
        await product.destroy();
        return this._serviceResponse(200, 'Successfully deleted product.');
    }

    static async buyProduct(productId, amount, user) {
        const checkUser = await UserRepository.findById(user.id);
        const product = await ProductRepository.findById(productId);
        if (!product) return this._serviceResponse(404, 'Product not found');

        // check if product item is enough
        if (product.amountAvailable < amount)
            return this._serviceResponse(400, `Insufficent available product.`);
        const totalCost = amount * product.cost;

        // check if user balance is sufficient
        if (totalCost > checkUser.deposit)
            return this._serviceResponse(400, 'Insufficient balance');
        const dbTranx = await db.transaction();

        try {
            // Charge user
            const balance = checkUser.deposit - totalCost;
            await checkUser.update(
                {
                    deposit: balance,
                },
                { transaction: dbTranx },
            );

            // update product
            await product.update(
                {
                    amountAvailable: product.amountAvailable - amount,
                },
                { transaction: dbTranx },
            );

            // Credit seller
            const seller = await UserRepository.findById(product.sellerId);
            await seller.update(
                {
                    deposit: seller.deposit + totalCost,
                },
                { transaction: dbTranx },
            );
            await dbTranx.commit();
            const coinBalance = this._convertToCoins(balance);
            return this._serviceResponse(
                200,
                `Successfully purchased ${product.productName}`,
                { totalCost, coinBalance, product },
            );
        } catch (err) {
            console.log(err);
            await dbTranx.rollback();
            return this._serviceResponse(400, `Purchase not successful`);
        }
    }
}

module.exports = { ProductService };
