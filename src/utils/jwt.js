const jwt = require('jsonwebtoken');

class JWT {
    static async sign(data, time = '1d') {
        const secret = process.env.JWT_SECRET;
        return jwt.sign(data, secret, { expiresIn: time });
    }

    static async verify(token) {
        const key = process.env.JWT_SECRET;
        const decode = jwt.verify(token, key, (err, decoded) => {
            if (err) {
                return err;
            }
            return decoded;
        });
        return decode;
    }
}

module.exports = { JWT };
