const db = require('../util/database');
const crypto = require('crypto');

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

module.exports = class User {
    constructor(username, password, age, city, occupation, favoriteTopic, experienceLevel) {
        this.username = username;
        this.password = hashPassword(password);
        this.age = age;
        this.city = city;
        this.occupation = occupation;
        this.favoriteTopic = favoriteTopic;
        this.experienceLevel = experienceLevel;
    }

    save() {
        return db.execute(
            'INSERT INTO users (username, password, age, city, occupation, favorite_topic, experience_level) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [this.username, this.password, this.age, this.city, this.occupation, this.favoriteTopic, this.experienceLevel]
        );
    }

    static findByUsernameAndPassword(username, password) {
        return db.execute(
            'SELECT * FROM users WHERE username = ? AND password = ?',
            [username, hashPassword(password)]
        );
    }

    static findById(id) {
        return db.execute('SELECT * FROM users WHERE id = ?', [id]);
    }
};
