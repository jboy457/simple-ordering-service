const { Hash, JWT } = require('../../utils');
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

    static async authenticateUser(userToAuth) {
        const userExist = await UserRepository.findByUsername(
            userToAuth.username,
        );
        if (!userExist)
            return this._serviceResponse(401, 'Invalid credentails');
        const passIsCorrect = await Hash.verify(
            userToAuth.password,
            userExist.password,
        );
        if (!passIsCorrect)
            return this._serviceResponse(401, 'Invalid credentails');
        const token = await JWT.sign({
            id: userExist.id,
            role: userExist.role,
        });
        userExist.password = undefined;
        return this._serviceResponse(201, 'Successfully loggedIn user.', {
            token,
            user: userExist,
        });
    }

    static async getUserById(userId) {
        const userExist = await UserRepository.findById(userId);
        if (!userExist) return this._serviceResponse(404, 'User not found.');
        return this._serviceResponse(
            200,
            'Successfully fetched user.',
            userExist,
        );
    }

    static async getUsers(query) {
        const pageNo = query.pageNo ? +query.pageNo : 1;
        const perPage = query.perPage ? +query.perPage : 10;
        const users = await UserRepository.findAll(pageNo, perPage);
        return this._serviceResponse(200, 'Successfully fetched user.', users);
    }

    static async updateUser(userId, userUpdate) {
        const userExist = await UserRepository.findById(userId);
        if (!userExist) return this._serviceResponse(404, 'User not found.');
        await userExist.update(userUpdate);
        return this._serviceResponse(200, 'Successfully updated user');
    }

    static async deleteUser(userId) {
        const userExist = await UserRepository.findById(userId);
        if (!userExist) return this._serviceResponse(404, 'User not found.');
        await userExist.update({
            deletedAt: new Date(),
        });

        return this._serviceResponse(200, 'Successfully deleted user.');
    }

    static async addMoney(userId, amount) {
        const userExist = await UserRepository.findById(userId);
        if (!userExist) return this._serviceResponse(404, 'User not found.');
        await userExist.update({
            deposit: userExist.deposit + parseInt(amount),
        });
        return this._serviceResponse(200, `Successfully depisted ${amount}.`);
    }

    static async resetDeposit(userId) {
        const userExist = await UserRepository.findById(userId);
        if (!userExist) return this._serviceResponse(404, 'User not found.');
        await userExist.update({
            deposit: 0,
        });
        return this._serviceResponse(200, `Successfully reseted deposit.`);
    }
}

module.exports = { UserService };
