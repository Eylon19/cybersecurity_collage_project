const MAX_TEXT_LENGTH = 5000;
const MAX_SHORT_LENGTH = 255;

function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
}

function parsePositiveInt(value) {
    const parsed = parseInt(value, 10);
    if (Number.isNaN(parsed) || parsed <= 0) {
        return null;
    }
    return parsed;
}

function parseId(id) {
    return parsePositiveInt(id);
}

function validateRegistration(data) {
    const errors = [];

    if (!isNonEmptyString(data.username) || data.username.trim().length > 50) {
        errors.push('שם משתמש חייב להיות בין 1 ל-50 תווים.');
    }
    if (!isNonEmptyString(data.password) || data.password.length < 6) {
        errors.push('סיסמה חייבת להכיל לפחות 6 תווים.');
    }

    const age = parsePositiveInt(data.age);
    if (age === null || age > 120) {
        errors.push('גיל חייב להיות מספר חיובי תקין.');
    }

    const requiredFields = ['city', 'occupation', 'favoriteTopic'];
    for (const field of requiredFields) {
        if (!isNonEmptyString(data[field]) || data[field].trim().length > 100) {
            errors.push('יש למלא את כל השדות הנדרשים בצורה תקינה.');
            break;
        }
    }

    const allowedLevels = ['Beginner', 'Medium', 'Advanced'];
    if (!allowedLevels.includes(data.experienceLevel)) {
        errors.push('רמת ידע לא תקינה.');
    }

    return errors;
}

function trimFields(obj, fields) {
    const result = {};
    for (const field of fields) {
        result[field] = typeof obj[field] === 'string' ? obj[field].trim() : obj[field];
    }
    return result;
}

function validateArticle(data) {
    const errors = [];
    const fields = ['title', 'category', 'author', 'summary', 'content', 'sourceName'];
    for (const field of fields) {
        if (!isNonEmptyString(data[field])) {
            errors.push('יש למלא את כל שדות המאמר.');
            return errors;
        }
    }
    const readingTime = parsePositiveInt(data.readingTime);
    if (readingTime === null || readingTime > 999) {
        errors.push('זמן קריאה חייב להיות מספר חיובי.');
    }
    const allowedLevels = ['Beginner', 'Medium', 'Advanced'];
    if (!allowedLevels.includes(data.difficultyLevel)) {
        errors.push('רמת קושי לא תקינה.');
    }
    if (data.content.length > MAX_TEXT_LENGTH) {
        errors.push('תוכן המאמר ארוך מדי.');
    }
    return errors;
}

function validateThreat(data) {
    const errors = [];
    const fields = ['threatName', 'description', 'targetAudience', 'attackMethod', 'warningSigns', 'prevention'];
    for (const field of fields) {
        if (!isNonEmptyString(data[field])) {
            errors.push('יש למלא את כל שדות האיום.');
            return errors;
        }
    }
    const allowedSeverity = ['Low', 'Medium', 'High'];
    if (!allowedSeverity.includes(data.severity) || !allowedSeverity.includes(data.damageLevel)) {
        errors.push('רמת סיכון או נזק לא תקינה.');
    }
    return errors;
}

function validateSecurityTip(data) {
    const errors = [];
    const fields = ['title', 'category', 'description', 'recommendedAction', 'targetUser', 'example'];
    for (const field of fields) {
        if (!isNonEmptyString(data[field])) {
            errors.push('יש למלא את כל שדות הטיפ.');
            return errors;
        }
    }
    const allowedLevels = ['Low', 'Medium', 'High'];
    if (!allowedLevels.includes(data.importanceLevel)) {
        errors.push('רמת חשיבות לא תקינה.');
    }
    return errors;
}

module.exports = {
    parseId,
    validateRegistration,
    validateArticle,
    validateThreat,
    validateSecurityTip,
    trimFields,
    MAX_SHORT_LENGTH
};
