const { Router } = require('express');
const controllers = require('./product_controller');
const { validate } = require('../../utils');
const { isAuthenticated, isSeller } = require('../../middlewares/auth');
const {
    ProductIdSchema,
    UpdateProductSchema,
    CreateProductSchema,
} = require('./product_schema');

class UserRoutes {
    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post(
            '/products',
            isAuthenticated,
            isSeller,
            validate(CreateProductSchema),
            controllers.addProduct,
        );
        this.router.get('/products', controllers.allProducts);
        this.router.get(
            '/products/:productId',
            validate(ProductIdSchema),
            controllers.getProduct,
        );
        this.router.put(
            '/products/:productId',
            isAuthenticated,
            isSeller,
            validate(UpdateProductSchema),
            controllers.updateProduct,
        );
        this.router.delete(
            '/products/:productId',
            isAuthenticated,
            isSeller,
            validate(ProductIdSchema),
            controllers.deleteProduct,
        );
    }
}

module.exports.routes = new UserRoutes().router;
