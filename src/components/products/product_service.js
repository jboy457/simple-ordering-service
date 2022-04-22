const { ProductRepository } = require('./product_repository');

class ProductService {
    static _serviceResponse(status, message, data) {
        return {
            status,
            message,
            data,
        };
    }

    static async createProduct(sellerId, productToCreate) {
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

    static async deleteProduct(productId, sellerId, updatedProduct) {
        const product = await ProductRepository.findSellerProduct(
            productId,
            sellerId,
        );
        if (!product) return this._serviceResponse(404, 'Product not found.');
        await product.destroy();
        return this._serviceResponse(200, 'Successfully deleted product.');
    }
}

module.exports = { ProductService };
