const request = require('supertest');
const app = require('../../src/app');
const { User } = require('../../src/config');

const existingTestCase = [
    {
        id: 1,
        username: 'Test1',
        role: 'buyer',
        password:
            '$2a$10$JR0suUOk6nvd4y6Gul0YOekzTBJN6PnVev4Hh25gFb.0lI9DJUqEi',
    },
    {
        id: 2,
        username: 'Test2',
        role: 'seller',
        password:
            '$2a$10$JR0suUOk6nvd4y6Gul0YOekzTBJN6PnVev4Hh25gFb.0lI9DJUqEi',
    },
    {
        id: 3,
        username: 'Test3',
        role: 'buyer',
        password:
            '$2a$10$JR0suUOk6nvd4y6Gul0YOekzTBJN6PnVev4Hh25gFb.0lI9DJUqEi',
    },
    {
        id: 4,
        username: 'Test4',
        role: 'buyer',
        password:
            '$2a$10$JR0suUOk6nvd4y6Gul0YOekzTBJN6PnVev4Hh25gFb.0lI9DJUqEi',
    },
    {
        id: 5,
        username: 'Test6',
        role: 'seller',
        password:
            '$2a$10$JR0suUOk6nvd4y6Gul0YOekzTBJN6PnVev4Hh25gFb.0lI9DJUqEi',
    },
];

beforeAll(async () => {
    server = request(app);
    await User.bulkCreate(existingTestCase);
});

afterAll(async () => {
    await User.destroy({ where: {} });
    server = undefined;
    return;
});

describe('--- Get All Users ---', () => {
    // ===================== Get all users ================== //
    it('should return status 200', async () => {
        const response = await server.get('/api/v1/users');

        expect(response.statusCode).toEqual(200);
        expect(response.body.status).toEqual('success');
        expect(response.body.data.users.length).toEqual(5);
    });

    existingTestCase.forEach(test => {
        // ===================== Get user ================== //
        it('should return status 200', async () => {
            const response = await server.get(`/api/v1/users/${test.id}`);

            expect(response.statusCode).toEqual(200);
            expect(response.body.status).toEqual('success');
            expect(response.body.data.username).toEqual(test.username);
        });
    });
});
