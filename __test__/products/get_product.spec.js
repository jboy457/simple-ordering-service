const request = require('supertest');
const app = require('../../src/app');
const { Product } = require('../../src/config');

const existingTestCase = [
    {
        id: 1,
        productName: 'Pepsi',
        cost: 10,
        amountAvailable: 5,
        sellerId: 1,
    },
    {
        id: 2,
        productName: 'Fanta',
        cost: 10,
        amountAvailable: 5,
        sellerId: 1,
    },
    {
        id: 3,
        productName: 'Coke',
        cost: 10,
        amountAvailable: 5,
        sellerId: 1,
    },
    {
        id: 4,
        productName: 'Juice',
        cost: 10,
        amountAvailable: 5,
        sellerId: 1,
    },
    {
        id: 5,
        productName: 'Water',
        cost: 10,
        amountAvailable: 5,
        sellerId: 1,
    },
];

beforeAll(async () => {
    server = request(app);
    await Product.bulkCreate(existingTestCase);
});

afterAll(async () => {
    await Product.destroy({ where: {} });
    server = undefined;
    return;
});

describe('--- Get All Product ---', () => {
    // ===================== Get all Products ================== //
    it('should return status 200', async () => {
        const response = await server.get('/api/v1/products');

        expect(response.statusCode).toEqual(200);
        expect(response.body.status).toEqual('success');
        expect(response.body.data.products.length).toEqual(5);
    });

    existingTestCase.forEach(test => {
        // ===================== Get user ================== //
        it('should return status 200', async () => {
            const response = await server.get(`/api/v1/products/${test.id}`);

            expect(response.statusCode).toEqual(200);
            expect(response.body.status).toEqual('success');
            expect(response.body.data.productName).toEqual(test.productName);
        });
    });
});
