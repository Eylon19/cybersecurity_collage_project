const db = require('../util/database');
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

async function hashPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
}

module.exports = class User {
    constructor(username, password, age, city, occupation, favoriteTopic, experienceLevel) {
        this.username = username;
        this.plainPassword = password;
        this.age = age;
        this.city = city;
        this.occupation = occupation;
        this.favoriteTopic = favoriteTopic;
        this.experienceLevel = experienceLevel;
    }

    async save() {
        const hashedPassword = await hashPassword(this.plainPassword);
        return db.execute(
            'INSERT INTO users (username, password, age, city, occupation, favorite_topic, experience_level) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [this.username, hashedPassword, this.age, this.city, this.occupation, this.favoriteTopic, this.experienceLevel]
        );
    }

    static findByUsername(username) {
        return db.execute('SELECT * FROM users WHERE username = ?', [username]);
    }

    static async authenticate(username, password) {
        const rows = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        const users = rows[0];
        if (users.length === 0) {
            return null;
        }
        const user = users[0];
        const isValid = await verifyPassword(password, user.password);
        return isValid ? user : null;
    }

    static findById(id) {
        return db.execute('SELECT * FROM users WHERE id = ?', [id]);
    }
};
