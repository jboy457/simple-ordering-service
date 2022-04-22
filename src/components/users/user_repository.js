const { User } = require('../../config');

class UserRepository {
    static async create(newUser) {
        const user = await User.create(newUser);
        user.password = undefined;
        return user;
    }

    static async findById(id) {
        const user = await User.findOne({
            where: { id, deletedAt: null },
            attributes: {
                exclude: ['password'],
            },
        });
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

    static async findAll(pageNo, perPage) {
        const { rows: users, count } = await User.findAndCountAll({
            where: { deletedAt: null },
            order: [['id', 'DESC']],
            limit: perPage,
            offset: pageNo * perPage - perPage,
            attributes: {
                exclude: ['password'],
            },
        });
        return { users, count, pageNo, perPage };
    }
}

module.exports = { UserRepository };
