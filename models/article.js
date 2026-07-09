const db = require('../util/database');

module.exports = class Article {
    constructor(title, category, author, summary, content, difficultyLevel, readingTime, sourceName) {
        this.title = title;
        this.category = category;
        this.author = author;
        this.summary = summary;
        this.content = content;
        this.difficultyLevel = difficultyLevel;
        this.readingTime = readingTime;
        this.sourceName = sourceName;
    }

    save() {
        return db.execute(
            `INSERT INTO articles 
            (title, category, author, summary, content, difficulty_level, reading_time, source_name) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                this.title,
                this.category,
                this.author,
                this.summary,
                this.content,
                this.difficultyLevel,
                this.readingTime,
                this.sourceName
            ]
        );
    }

    static getAll() {
        return db.execute('SELECT * FROM articles ORDER BY id DESC');
    }

    static getById(id) {
        return db.execute('SELECT * FROM articles WHERE id = ?', [id]);
    }

    static update(id, title, category, author, summary, content, difficultyLevel, readingTime, sourceName) {
        return db.execute(
            `UPDATE articles 
            SET title = ?, category = ?, author = ?, summary = ?, content = ?, difficulty_level = ?, reading_time = ?, source_name = ? 
            WHERE id = ?`,
            [
                title,
                category,
                author,
                summary,
                content,
                difficultyLevel,
                readingTime,
                sourceName,
                id
            ]
        );
    }

    static delete(id) {
        return db.execute('DELETE FROM articles WHERE id = ?', [id]);
    }
};