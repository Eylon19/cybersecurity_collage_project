const SecurityTip = require('../models/securityTip');

exports.getSecurityTips = (req, res, next) => {
    SecurityTip.getAll()
        .then(rows => res.render('security_tips', { tips: rows[0] }))
        .catch(err => res.render('error', { message: err }));
};

exports.getAddSecurityTip = (req, res, next) => {
    res.render('security_tip_form', {
        tip: null,
        action: '/security-tips/add',
        title: 'הוספת טיפ אבטחה'
    });
};

exports.postAddSecurityTip = (req, res, next) => {
    const tip = new SecurityTip(
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.importanceLevel,
        req.body.recommendedAction,
        req.body.targetUser,
        req.body.example
    );

    tip.save()
        .then(() => res.redirect('/security-tips'))
        .catch(err => res.render('error', { message: err }));
};

exports.getEditSecurityTip = (req, res, next) => {
    SecurityTip.getById(req.params.id)
        .then(rows => res.render('security_tip_form', {
            tip: rows[0][0],
            action: '/security-tips/edit/' + req.params.id,
            title: 'עריכת טיפ אבטחה'
        }))
        .catch(err => res.render('error', { message: err }));
};

exports.postEditSecurityTip = (req, res, next) => {
    SecurityTip.update(
        req.params.id,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.importanceLevel,
        req.body.recommendedAction,
        req.body.targetUser,
        req.body.example
    )
        .then(() => res.redirect('/security-tips'))
        .catch(err => res.render('error', { message: err }));
};

exports.postDeleteSecurityTip = (req, res, next) => {
    SecurityTip.delete(req.params.id)
        .then(() => res.redirect('/security-tips'))
        .catch(err => res.render('error', { message: err }));
};