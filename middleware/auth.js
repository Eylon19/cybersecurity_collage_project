function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}

function redirectIfAuthenticated(req, res, next) {
    if (req.session.user) {
        return res.redirect('/profile');
    }
    next();
}

module.exports = { requireLogin, redirectIfAuthenticated };
