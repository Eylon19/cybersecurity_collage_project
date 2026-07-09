const db = require('../util/database');

module.exports = class Threat {
    constructor(threatName, description, severity, targetAudience, attackMethod, warningSigns, prevention, damageLevel) {
        this.threatName = threatName;
        this.description = description;
        this.severity = severity;
        this.targetAudience = targetAudience;
        this.attackMethod = attackMethod;
        this.warningSigns = warningSigns;
        this.prevention = prevention;
        this.damageLevel = damageLevel;
    }

    save() {
        return db.execute(
            `INSERT INTO threats 
            (threat_name, description, severity, target_audience, attack_method, warning_signs, prevention, damage_level) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                this.threatName,
                this.description,
                this.severity,
                this.targetAudience,
                this.attackMethod,
                this.warningSigns,
                this.prevention,
                this.damageLevel
            ]
        );
    }

    static getAll() {
        return db.execute('SELECT * FROM threats ORDER BY id DESC');
    }

    static getById(id) {
        return db.execute('SELECT * FROM threats WHERE id = ?', [id]);
    }

    static update(id, threatName, description, severity, targetAudience, attackMethod, warningSigns, prevention, damageLevel) {
        return db.execute(
            `UPDATE threats 
            SET threat_name = ?, description = ?, severity = ?, target_audience = ?, attack_method = ?, warning_signs = ?, prevention = ?, damage_level = ?
            WHERE id = ?`,
            [
                threatName,
                description,
                severity,
                targetAudience,
                attackMethod,
                warningSigns,
                prevention,
                damageLevel,
                id
            ]
        );
    }

    static delete(id) {
        return db.execute('DELETE FROM threats WHERE id = ?', [id]);
    }
};