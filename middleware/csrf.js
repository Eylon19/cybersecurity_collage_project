const crypto = require('crypto');

function ensureToken(req) {
    if (!req.session.csrfToken) {
        req.session.csrfToken = crypto.randomBytes(32).toString('hex');
    }
    return req.session.csrfToken;
}

function tokensMatch(expected, received) {
    if (typeof expected !== 'string' || typeof received !== 'string') {
        return false;
    }
    const expectedBuffer = Buffer.from(expected);
    const receivedBuffer = Buffer.from(received);
    if (expectedBuffer.length !== receivedBuffer.length) {
        return false;
    }
    return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}

function csrfProtection(req, res, next) {
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
        res.locals.csrfToken = ensureToken(req);
        return next();
    }

    const token = req.body._csrf;
    if (!tokensMatch(req.session.csrfToken, token)) {
        return res.status(403).render('error', { message: 'בקשה לא חוקית. נסה לרענן את הדף ולשלוח שוב.' });
    }

    res.locals.csrfToken = ensureToken(req);
    next();
}

module.exports = { csrfProtection };
