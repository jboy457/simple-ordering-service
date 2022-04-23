const request = require('supertest');
const app = require('../../src/app');
const { User } = require('../../src/config');

const existingTestCase = {
    username: 'Test',
    role: 'buyer',
    password: '$2a$10$JR0suUOk6nvd4y6Gul0YOekzTBJN6PnVev4Hh25gFb.0lI9DJUqEi',
};

const invalidTestCase = {
    username: 'Test1',
    role: 'user',
    password: 'Ade',
};

const validTestCase = {
    username: 'Test2',
    role: 'buyer',
    password: 'Testing',
};

let server;

beforeAll(async () => {
    server = request(app);
    await User.create(existingTestCase);
});

afterAll(async () => {
    await User.destroy({ where: {} });
    server = undefined;
    return;
});

describe('--- Register User Test ---', () => {
    // ===================== Test Validation ================== //
    it('should return status 422', async () => {
        const response = await server
            .post('/api/v1/users')
            .send(invalidTestCase);
        expect(response.statusCode).toEqual(422);
        expect(response.body.status).toEqual('error');
    });

    // ===================== User Already Regiseted ================== //
    it('should return status 409', async () => {
        const response = await server
            .post('/api/v1/users')
            .send(existingTestCase);

        expect(response.statusCode).toEqual(409);
        expect(response.body.status).toEqual('error');
        expect(response.body.message).toEqual('User already exist.');
    });

    // ===================== Successful Registration ================== //
    it('should return status 201', async () => {
        const response = await server.post('/api/v1/users').send(validTestCase);

        expect(response.statusCode).toEqual(201);
        expect(response.body.status).toEqual('success');
    });
});
