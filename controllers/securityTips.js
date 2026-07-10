const SecurityTip = require('../models/securityTip');
const { parseId, validateSecurityTip } = require('../util/validation');

exports.getSecurityTips = (req, res, next) => {
    SecurityTip.getAll()
        .then(rows => res.render('security_tips', { tips: rows[0] }))
        .catch(err => {
            console.error('Get security tips error:', err.message);
            res.render('error', { message: 'שגיאה בטעינת הטיפים' });
        });
};

exports.getAddSecurityTip = (req, res, next) => {
    res.render('security_tip_form', {
        tip: null,
        action: '/security-tips/add',
        title: 'הוספת טיפ אבטחה',
        error: null
    });
};

exports.postAddSecurityTip = (req, res, next) => {
    const validationErrors = validateSecurityTip(req.body);
    if (validationErrors.length > 0) {
        return res.render('security_tip_form', {
            tip: {
                title: req.body.title,
                category: req.body.category,
                description: req.body.description,
                importance_level: req.body.importanceLevel,
                recommended_action: req.body.recommendedAction,
                target_user: req.body.targetUser,
                example: req.body.example
            },
            action: '/security-tips/add',
            title: 'הוספת טיפ אבטחה',
            error: validationErrors[0]
        });
    }

    const tip = new SecurityTip(
        req.body.title.trim(),
        req.body.category.trim(),
        req.body.description.trim(),
        req.body.importanceLevel,
        req.body.recommendedAction.trim(),
        req.body.targetUser.trim(),
        req.body.example.trim()
    );

    tip.save()
        .then(() => res.redirect('/security-tips'))
        .catch(err => {
            console.error('Add security tip error:', err.message);
            res.render('error', { message: 'שגיאה בהוספת הטיפ' });
        });
};

exports.getEditSecurityTip = (req, res, next) => {
    const id = parseId(req.params.id);
    if (!id) {
        return res.render('error', { message: 'מזהה טיפ לא תקין' });
    }

    SecurityTip.getById(id)
        .then(rows => {
            if (!rows[0][0]) {
                return res.render('error', { message: 'הטיפ לא נמצא' });
            }
            res.render('security_tip_form', {
                tip: rows[0][0],
                action: '/security-tips/edit/' + id,
                title: 'עריכת טיפ אבטחה',
                error: null
            });
        })
        .catch(err => {
            console.error('Edit security tip error:', err.message);
            res.render('error', { message: 'שגיאה בטעינת הטיפ' });
        });
};

exports.postEditSecurityTip = (req, res, next) => {
    const id = parseId(req.params.id);
    if (!id) {
        return res.render('error', { message: 'מזהה טיפ לא תקין' });
    }

    const validationErrors = validateSecurityTip(req.body);
    if (validationErrors.length > 0) {
        return res.render('security_tip_form', {
            tip: {
                title: req.body.title,
                category: req.body.category,
                description: req.body.description,
                importance_level: req.body.importanceLevel,
                recommended_action: req.body.recommendedAction,
                target_user: req.body.targetUser,
                example: req.body.example
            },
            action: '/security-tips/edit/' + id,
            title: 'עריכת טיפ אבטחה',
            error: validationErrors[0]
        });
    }

    SecurityTip.update(
        id,
        req.body.title.trim(),
        req.body.category.trim(),
        req.body.description.trim(),
        req.body.importanceLevel,
        req.body.recommendedAction.trim(),
        req.body.targetUser.trim(),
        req.body.example.trim()
    )
        .then(() => res.redirect('/security-tips'))
        .catch(err => {
            console.error('Update security tip error:', err.message);
            res.render('error', { message: 'שגיאה בעדכון הטיפ' });
        });
};

exports.postDeleteSecurityTip = (req, res, next) => {
    const id = parseId(req.params.id);
    if (!id) {
        return res.render('error', { message: 'מזהה טיפ לא תקין' });
    }

    SecurityTip.delete(id)
        .then(() => res.redirect('/security-tips'))
        .catch(err => {
            console.error('Delete security tip error:', err.message);
            res.render('error', { message: 'שגיאה במחיקת הטיפ' });
        });
};
