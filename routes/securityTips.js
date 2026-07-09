const express = require('express');
const router = express.Router();
const securityTipsController = require('../controllers/securityTips');

function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}

router.get('/security-tips', securityTipsController.getSecurityTips);

router.get('/security-tips/add',
    requireLogin,
    securityTipsController.getAddSecurityTip
);

router.post('/security-tips/add',
    requireLogin,
    securityTipsController.postAddSecurityTip
);

router.get('/security-tips/edit/:id',
    requireLogin,
    securityTipsController.getEditSecurityTip
);

router.post('/security-tips/edit/:id',
    requireLogin,
    securityTipsController.postEditSecurityTip
);

router.post('/security-tips/delete/:id',
    requireLogin,
    securityTipsController.postDeleteSecurityTip
);

module.exports = router;