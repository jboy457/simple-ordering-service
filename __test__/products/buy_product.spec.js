const request = require('supertest');
const app = require('../../src/app');
const { Product, User } = require('../../src/config');
const { JWT } = require('../../src/utils');

const existingUserTestCase = [
    {
        id: 1,
        username: 'Test',
        role: 'seller',
        password:
            '$2a$10$JR0suUOk6nvd4y6Gul0YOekzTBJN6PnVev4Hh25gFb.0lI9DJUqEi',
    },
    {
        id: 2,
        username: 'Test1',
        role: 'buyer',
        deposit: 20,
        password:
            '$2a$10$JR0suUOk6nvd4y6Gul0YOekzTBJN6PnVev4Hh25gFb.0lI9DJUqEi',
    },
];

const existingProductTestCase = {
    productName: 'Pepsi',
    cost: 10,
    amountAvailable: 5,
    sellerId: 1,
    id: 1,
};

const invalidTestCase1 = {
    productId: 1,
};

const invalidTestCase2 = {
    productId: 5,
    amount: 3,
};

let server;
let token;

beforeAll(async () => {
    server = request(app);
    token = await JWT.sign({
        id: existingUserTestCase[1].id,
        role: existingUserTestCase[1].role,
    });
    await User.bulkCreate(existingUserTestCase);
    await Product.create(existingProductTestCase);
});

afterAll(async () => {
    await User.destroy({ where: {} });
    await Product.destroy({ where: {} });
    server = undefined;
    token = undefined;
    return;
});

describe('--- Buy Product Test ---', () => {
    // ===================== Test Validation ================== //
    it('should return status 422', async () => {
        const response = await server
            .post(`/api/v1/buy`)
            .set({ 'x-auth-token': token })
            .send(invalidTestCase1);
        expect(response.statusCode).toEqual(422);
        expect(response.body.status).toEqual('error');
    });

    // ===================== Product not found ================== //
    it('should return status 404', async () => {
        const response = await server
            .post('/api/v1/buy')
            .set({ 'x-auth-token': token })
            .send(invalidTestCase2);

        expect(response.statusCode).toEqual(404);
        expect(response.body.status).toEqual('error');
        expect(response.body.message).toEqual('Product not found');
    });

    // ===================== Insufficient Product Test ================== //
    it('should return status 400', async () => {
        const response = await server
            .post(`/api/v1/buy`)
            .set({ 'x-auth-token': token })
            .send({
                productId: 1,
                amount: 5,
            });
        expect(response.statusCode).toEqual(400);
        expect(response.body.status).toEqual('error');
    });

    // ===================== Insufficient Balance Test ================== //
    it('should return status 400', async () => {
        const response = await server
            .post(`/api/v1/buy`)
            .set({ 'x-auth-token': token })
            .send({
                productId: 1,
                amount: 10,
            });
        expect(response.statusCode).toEqual(400);
        expect(response.body.status).toEqual('error');
    });

    // ===================== Insufficient Balance Test ================== //
    it('should return status 200', async () => {
        const response = await server
            .post(`/api/v1/buy`)
            .set({ 'x-auth-token': token })
            .send({
                productId: 1,
                amount: 1,
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.status).toEqual('success');
    });

    // ===================== Authorization Check ================== //
    it('should return status 401', async () => {
        token = await JWT.sign({
            id: existingUserTestCase[0].id,
            username: existingUserTestCase[0].username,
        });
        const response = await server
            .post(`/api/v1/buy`)

            .set({ 'x-auth-token': token })
            .send({
                productId: 1,
                amount: 10,
            });

        expect(response.statusCode).toEqual(401);
        expect(response.body.status).toEqual('error');
    });
});
