const request = require('supertest');
const app = require('../../src/app');
const { User } = require('../../src/config');
const { JWT } = require('../../src/utils');

const existingTestCase = {
    id: 1,
    username: 'Test',
    role: 'buyer',
    password: '$2a$10$JR0suUOk6nvd4y6Gul0YOekzTBJN6PnVev4Hh25gFb.0lI9DJUqEi',
};

const invalidTestCase = {
    username: 'Test1',
    role: 'user',
};

const validTestCase = {
    username: 'Test1',
    role: 'buyer',
};

let server;
let token;

beforeAll(async () => {
    server = request(app);
    token = await JWT.sign({
        id: existingTestCase.id,
        role: existingTestCase.role,
    });
    await User.create(existingTestCase);
});

afterAll(async () => {
    await User.destroy({ where: {} });
    server = undefined;
    token = undefined;
    return;
});

describe('--- Update User Test ---', () => {
    // ===================== Test Validation ================== //
    it('should return status 422', async () => {
        const response = await server
            .put('/api/v1/users')
            .set({ 'x-auth-token': token })
            .send(invalidTestCase);
        expect(response.statusCode).toEqual(422);
        expect(response.body.status).toEqual('error');
    });

    // ===================== Successful Updated user ================== //
    it('should return status 200', async () => {
        const response = await server
            .put('/api/v1/users')
            .set({ 'x-auth-token': token })
            .send(validTestCase);

        expect(response.statusCode).toEqual(200);
        expect(response.body.status).toEqual('success');
    });

    // ===================== Deposit money user ================== //
    it('should return status 200', async () => {
        const response = await server
            .patch('/api/v1/deposit')
            .set({ 'x-auth-token': token })
            .send({ amount: 100 });

        expect(response.statusCode).toEqual(200);
        expect(response.body.status).toEqual('success');
    });

    // ===================== Test allowed amount ================== //
    it('should return status 422', async () => {
        const response = await server
            .patch('/api/v1/deposit')
            .set({ 'x-auth-token': token })
            .send({ amount: 30 });

        expect(response.statusCode).toEqual(422);
        expect(response.body.status).toEqual('error');
    });

    // ===================== Reset User deposit ================== //
    it('should return status 200', async () => {
        const response = await server
            .patch('/api/v1/reset')
            .set({ 'x-auth-token': token });

        expect(response.statusCode).toEqual(200);
        expect(response.body.status).toEqual('success');
    });
});
