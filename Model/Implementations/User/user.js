const bcrypt = require('bcrypt');
const db = require('../../../Utils/database');

module.exports = class User {
    name;
    email;
    password;

    constructor(name,email, password){
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static async encrypt(password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        return hashedPassword;
    }

    static find(email) {
        return db.execute(
            'SELECT * FROM Users WHERE email = ?',
            [email]
        );
    }

    static save(user) {
        return db.execute(
            'INSERT INTO Users (name, email, password) VALUES(?, ?, ?)',
            [user.name, user.email, user.password]
        );
    }
}
