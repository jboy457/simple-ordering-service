const bcrypt = require('bcryptjs');

class Hash {
    static async create(value) {
        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(value, salt);
        return hashed;
    }

    static async verify(password, hash) {
        const result = bcrypt.compare(password, hash);
        return result;
    }
}

module.exports = { Hash };
