const { logger } = require('../../config');
const { Response } = require('../../utils');
const { ProductService } = require('./product_service');

module.exports = Object.freeze({
    addProduct: async (req, res) => {
        try {
            const { user, body } = req;
            const { status, message, data } =
                await ProductService.createProduct(user.id, body);
            return new Response(res, status, message, data);
        } catch (err) {
            logger.error(err);
            return new Response(res, 500);
        }
    },
    allProducts: async (req, res) => {
        try {
            const { query } = req;
            const { status, message, data } = await ProductService.getProducts(
                query,
            );
            return new Response(res, status, message, data);
        } catch (err) {
            logger.error(err);
            return new Response(res, 500);
        }
    },
    getProduct: async (req, res) => {
        try {
            const { params } = req;
            const { status, message, data } = await ProductService.getProduct(
                params.productId,
            );
            return new Response(res, status, message, data);
        } catch (err) {
            logger.error(err);
            return new Response(res, 500);
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { user, params, body } = req;
            const { status, message, data } =
                await ProductService.updateProduct(
                    params.productId,
                    user.id,
                    body,
                );
            return new Response(res, status, message, data);
        } catch (err) {
            logger.error(err);
            return new Response(res, 500);
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const { user, body, params } = req;
            const { status, message, data } =
                await ProductService.deleteProduct(
                    params.productId,
                    user.id,
                    body,
                );
            return new Response(res, status, message, data);
        } catch (err) {
            logger.error(err);
            return new Response(res, 500);
        }
    },
});
