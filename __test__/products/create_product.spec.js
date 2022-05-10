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
        password:
            '$2a$10$JR0suUOk6nvd4y6Gul0YOekzTBJN6PnVev4Hh25gFb.0lI9DJUqEi',
    },
];

const existingProductTestCase = {
    productName: 'Pepsi',
    cost: 10,
    amountAvailable: 5,
    sellerId: 1,
};

const invalidTestCase1 = {
    productName: 'Test1',
    cost: 'user',
    amount: 'Ade',
};

const invalidTestCase2 = {
    productName: 'Pepsi',
    cost: 10,
    amountAvailable: 5,
};

const validTestCase = {
    productName: 'Fanta',
    cost: 10,
    amountAvailable: 5,
};

let server;
let token;

beforeAll(async () => {
    server = request(app);
    token = await JWT.sign({
        id: existingUserTestCase[0].id,
        role: existingUserTestCase[0].role,
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

describe('--- Create Product Test ---', () => {
    // ===================== Test Validation ================== //
    it('should return status 422', async () => {
        const response = await server
            .post('/api/v1/products')
            .set({ 'x-auth-token': token })
            .send(invalidTestCase1);
        expect(response.statusCode).toEqual(422);
        expect(response.body.status).toEqual('error');
    });

    // ===================== Product already registered ================== //
    it('should return status 409', async () => {
        const response = await server
            .post('/api/v1/products')
            .set({ 'x-auth-token': token })
            .send(invalidTestCase2);

        expect(response.statusCode).toEqual(409);
        expect(response.body.status).toEqual('error');
        expect(response.body.message).toEqual('Product already exist.');
    });

    // ===================== Successful Creation ================== //
    it('should return status 201', async () => {
        const response = await server
            .post('/api/v1/products')
            .set({ 'x-auth-token': token })
            .send(validTestCase);
        expect(response.statusCode).toEqual(201);
        expect(response.body.status).toEqual('success');
    });

    // ===================== Authorization Check ================== //
    it('should return status 401', async () => {
        token = await JWT.sign({
            id: existingUserTestCase[1].id,
            username: existingUserTestCase[1].username,
        });
        const response = await server
            .post('/api/v1/products')
            .set({ 'x-auth-token': token })
            .send(validTestCase);

        expect(response.statusCode).toEqual(401);
        expect(response.body.status).toEqual('error');
    });
});
