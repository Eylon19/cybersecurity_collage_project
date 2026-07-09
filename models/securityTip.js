const db = require('../util/database');

module.exports = class SecurityTip {
    constructor(title, category, description, importanceLevel, recommendedAction, targetUser, example) {
        this.title = title;
        this.category = category;
        this.description = description;
        this.importanceLevel = importanceLevel;
        this.recommendedAction = recommendedAction;
        this.targetUser = targetUser;
        this.example = example;
    }

    save() {
        return db.execute(
            `INSERT INTO security_tips 
            (title, category, description, importance_level, recommended_action, target_user, example) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [this.title, this.category, this.description, this.importanceLevel, this.recommendedAction, this.targetUser, this.example]
        );
    }

    static getAll() {
        return db.execute('SELECT * FROM security_tips ORDER BY id DESC');
    }

    static getById(id) {
        return db.execute('SELECT * FROM security_tips WHERE id = ?', [id]);
    }

    static update(id, title, category, description, importanceLevel, recommendedAction, targetUser, example) {
        return db.execute(
            `UPDATE security_tips 
            SET title = ?, category = ?, description = ?, importance_level = ?, recommended_action = ?, target_user = ?, example = ?
            WHERE id = ?`,
            [title, category, description, importanceLevel, recommendedAction, targetUser, example, id]
        );
    }

    static delete(id) {
        return db.execute('DELETE FROM security_tips WHERE id = ?', [id]);
    }
};