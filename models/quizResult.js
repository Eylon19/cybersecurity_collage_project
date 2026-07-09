const db = require('../util/database');

module.exports = class QuizResult {
    constructor(userId, score) {
        this.userId = userId;
        this.score = score;
    }

    save() {
        return db.execute(
            'INSERT INTO quiz_results (user_id, score) VALUES (?, ?)',
            [this.userId, this.score]
        );
    }

    static getByUserId(userId) {
        return db.execute(
            'SELECT * FROM quiz_results WHERE user_id = ? ORDER BY id DESC',
            [userId]
        );
    }
};
