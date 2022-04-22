const { Router } = require('express');
const controllers = require('./product_controller');
const { validate } = require('../../utils');
const { isAuthenticated } = require('../../middlewares/auth/is_authenticated');
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
            validate(UpdateProductSchema),
            controllers.updateProduct,
        );
        this.router.delete(
            '/products/:productId',
            isAuthenticated,
            validate(ProductIdSchema),
            controllers.deleteProduct,
        );
    }
}

module.exports.routes = new UserRoutes().router;
