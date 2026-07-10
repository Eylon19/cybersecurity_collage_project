const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const { requireLogin, redirectIfAuthenticated } = require('../middleware/auth');

router.get('/', usersController.getHome);
router.get('/register', redirectIfAuthenticated, usersController.getRegister);
router.post('/register', redirectIfAuthenticated, usersController.postRegister);
router.get('/login', redirectIfAuthenticated, usersController.getLogin);
router.post('/login', redirectIfAuthenticated, usersController.postLogin);
router.get('/profile', requireLogin, usersController.getProfile);
router.post('/logout', requireLogin, usersController.logout);

module.exports = router;
