const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}

router.get('/', usersController.getHome);
router.get('/register', usersController.getRegister);
router.post('/register', usersController.postRegister);
router.get('/login', usersController.getLogin);
router.post('/login', usersController.postLogin);
router.get('/profile', requireLogin, usersController.getProfile);
router.get('/logout', usersController.logout);

module.exports = router;
