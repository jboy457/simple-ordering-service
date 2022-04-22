const { Hash } = require('../../utils');
const { UserRepository } = require('./user_repository');

class UserService {
    static _serviceResponse(status, message, data) {
        return {
            status,
            message,
            data,
        };
    }

    static async createUser(userToCreate) {
        const userExist = await UserRepository.findByUsername(
            userToCreate.username,
        );
        if (userExist) return this._serviceResponse(409, 'User already exist.');
        userToCreate.password = await Hash.create(userToCreate.password);
        const newUser = await UserRepository.create(userToCreate);
        return this._serviceResponse(
            201,
            'Successfully created user.',
            newUser,
        );
    }
}

module.exports = { UserService };
