const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const { requireLogin } = require('../middleware/auth');

router.get('/', usersController.getHome);
router.get('/register', usersController.getRegister);
router.post('/register', usersController.postRegister);
router.get('/login', usersController.getLogin);
router.post('/login', usersController.postLogin);
router.get('/profile', requireLogin, usersController.getProfile);
router.get('/logout', usersController.logout);

module.exports = router;
