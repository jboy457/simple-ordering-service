const { User } = require('../../config');

class UserRepository {
    static async create(newUser) {
        const user = await User.create(newUser);
        return user;
    }

    static async findByUsername(username) {
        const user = await User.findOne({
            where: {
                username,
            },
        });
        return user;
    }

    static async findAll() {
        const users = await User.findAll();
        return users;
    }
}

module.exports = { UserRepository };
