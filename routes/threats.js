const express = require('express');
const router = express.Router();
const threatsController = require('../controllers/threats');
const { requireLogin } = require('../middleware/auth');

router.get('/threats', threatsController.getThreats);
router.get('/threats/add', requireLogin, threatsController.getAddThreat);
router.post('/threats/add', requireLogin, threatsController.postAddThreat);
router.get('/threats/edit/:id', requireLogin, threatsController.getEditThreat);
router.post('/threats/edit/:id', requireLogin, threatsController.postEditThreat);
router.post('/threats/delete/:id', requireLogin, threatsController.postDeleteThreat);

module.exports = router;
