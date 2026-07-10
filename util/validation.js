const MAX_TEXT_LENGTH = 5000;
const MAX_SHORT_LENGTH = 255;
const BCRYPT_MAX_BYTES = 72;

function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
}

function isValidShortText(value) {
    return isNonEmptyString(value) && value.trim().length <= MAX_SHORT_LENGTH;
}

function parseStrictPositiveInt(value) {
    if (value === undefined || value === null || value === '') {
        return null;
    }
    const normalized = String(value).trim();
    if (!/^\d+$/.test(normalized)) {
        return null;
    }
    const parsed = Number(normalized);
    if (!Number.isSafeInteger(parsed) || parsed <= 0) {
        return null;
    }
    return parsed;
}

function parseId(id) {
    return parseStrictPositiveInt(id);
}

function ensureBody(data) {
    return data && typeof data === 'object' ? data : {};
}

function validateRegistration(data) {
    const body = ensureBody(data);
    const errors = [];

    if (!isNonEmptyString(body.username) || body.username.trim().length > 50) {
        errors.push('שם משתמש חייב להיות בין 1 ל-50 תווים.');
    }
    if (!isNonEmptyString(body.password) || body.password.length < 6) {
        errors.push('סיסמה חייבת להכיל לפחות 6 תווים.');
    } else if (Buffer.byteLength(body.password, 'utf8') > BCRYPT_MAX_BYTES) {
        errors.push('סיסמה ארוכה מדי.');
    }

    const age = parseStrictPositiveInt(body.age);
    if (age === null || age > 120) {
        errors.push('גיל חייב להיות מספר חיובי תקין.');
    }

    const requiredFields = ['city', 'occupation', 'favoriteTopic'];
    for (const field of requiredFields) {
        if (!isValidShortText(body[field])) {
            errors.push('יש למלא את כל השדות הנדרשים בצורה תקינה.');
            break;
        }
    }

    const allowedLevels = ['Beginner', 'Medium', 'Advanced'];
    if (!allowedLevels.includes(body.experienceLevel)) {
        errors.push('רמת ידע לא תקינה.');
    }

    return errors;
}

function validateShortTextFields(data, fields, errorMessage) {
    for (const field of fields) {
        if (!isValidShortText(data[field])) {
            return [errorMessage];
        }
    }
    return [];
}

function validateArticle(data) {
    const body = ensureBody(data);
    const shortFields = ['title', 'category', 'author', 'summary', 'sourceName'];
    const shortErrors = validateShortTextFields(body, shortFields, 'יש למלא את כל שדות המאמר.');
    if (shortErrors.length > 0) {
        return shortErrors;
    }
    if (!isNonEmptyString(body.content)) {
        return ['יש למלא את כל שדות המאמר.'];
    }
    if (body.content.length > MAX_TEXT_LENGTH) {
        return ['תוכן המאמר ארוך מדי.'];
    }

    const readingTime = parseStrictPositiveInt(body.readingTime);
    if (readingTime === null || readingTime > 999) {
        return ['זמן קריאה חייב להיות מספר חיובי.'];
    }

    const allowedLevels = ['Beginner', 'Medium', 'Advanced'];
    if (!allowedLevels.includes(body.difficultyLevel)) {
        return ['רמת קושי לא תקינה.'];
    }

    return [];
}

function validateThreat(data) {
    const body = ensureBody(data);
    const shortFields = ['threatName', 'targetAudience', 'attackMethod'];
    const shortErrors = validateShortTextFields(body, shortFields, 'יש למלא את כל שדות האיום.');
    if (shortErrors.length > 0) {
        return shortErrors;
    }

    const textFields = ['description', 'warningSigns', 'prevention'];
    for (const field of textFields) {
        if (!isNonEmptyString(body[field])) {
            return ['יש למלא את כל שדות האיום.'];
        }
        if (body[field].length > MAX_TEXT_LENGTH) {
            return ['תוכן האיום ארוך מדי.'];
        }
    }

    const allowedSeverity = ['Low', 'Medium', 'High'];
    if (!allowedSeverity.includes(body.severity) || !allowedSeverity.includes(body.damageLevel)) {
        return ['רמת סיכון או נזק לא תקינה.'];
    }

    return [];
}

function validateSecurityTip(data) {
    const body = ensureBody(data);
    const shortFields = ['title', 'category', 'targetUser'];
    const shortErrors = validateShortTextFields(body, shortFields, 'יש למלא את כל שדות הטיפ.');
    if (shortErrors.length > 0) {
        return shortErrors;
    }

    const textFields = ['description', 'recommendedAction', 'example'];
    for (const field of textFields) {
        if (!isNonEmptyString(body[field])) {
            return ['יש למלא את כל שדות הטיפ.'];
        }
        if (body[field].length > MAX_TEXT_LENGTH) {
            return ['תוכן הטיפ ארוך מדי.'];
        }
    }

    const allowedLevels = ['Low', 'Medium', 'High'];
    if (!allowedLevels.includes(body.importanceLevel)) {
        return ['רמת חשיבות לא תקינה.'];
    }

    return [];
}

function hasAffectedRows(dbResult) {
    return dbResult[0].affectedRows > 0;
}

module.exports = {
    parseId,
    validateRegistration,
    validateArticle,
    validateThreat,
    validateSecurityTip,
    hasAffectedRows,
    MAX_SHORT_LENGTH
};
