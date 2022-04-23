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
    password: 'Ade',
};

const loginWithWrongPasswrd = {
    username: 'Test2',
    password: 'Testing',
};

const loginWithWrongUserName = {
    username: 'Test',
    password: 'Adejare1234',
};

const validTestCase = {
    username: 'Test',
    password: 'Adejare',
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

describe('--- Login User Test ---', () => {
    // ===================== Test Validation ================== //
    it('should return status 422', async () => {
        const response = await server
            .post('/api/v1/users/login')
            .send(invalidTestCase);

        expect(response.statusCode).toEqual(422);
        expect(response.body.status).toEqual('error');
    });

    // ===================== Login credentail with wrong username ================== //
    it('should return status 401', async () => {
        const response = await server
            .post('/api/v1/users/login')
            .send(loginWithWrongUserName);

        expect(response.statusCode).toEqual(401);
        expect(response.body.status).toEqual('error');
        expect(response.body.message).toEqual('Invalid credentails');
    });

    // ===================== Login credentail with wrong password ================== //
    it('should return status 401', async () => {
        const response = await server
            .post('/api/v1/users/login')
            .send(loginWithWrongPasswrd);

        expect(response.statusCode).toEqual(401);
        expect(response.body.status).toEqual('error');
        expect(response.body.message).toEqual('Invalid credentails');
    });

    // ===================== Login With correct credentials ================== //
    it('should return status 201', async () => {
        const response = await server
            .post('/api/v1/users/login')
            .send(validTestCase);

        expect(response.statusCode).toEqual(200);
        expect(response.body.status).toEqual('success');
    });
});
