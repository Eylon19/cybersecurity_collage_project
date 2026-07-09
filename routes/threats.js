const express = require('express');
const router = express.Router();
const threatsController = require('../controllers/threats');

function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}

router.get('/threats', threatsController.getThreats);
router.get('/threats/add', requireLogin, threatsController.getAddThreat);
router.post('/threats/add', requireLogin, threatsController.postAddThreat);
router.get('/threats/edit/:id', requireLogin, threatsController.getEditThreat);
router.post('/threats/edit/:id', requireLogin, threatsController.postEditThreat);
router.post('/threats/delete/:id', requireLogin, threatsController.postDeleteThreat);

module.exports = router;
