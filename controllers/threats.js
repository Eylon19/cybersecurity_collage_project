const Threat = require('../models/threat');
const { parseId, validateThreat } = require('../util/validation');

exports.getThreats = (req, res, next) => {
    Threat.getAll()
        .then(rows => res.render('threats', { threats: rows[0] }))
        .catch(err => {
            console.error('Get threats error:', err.message);
            res.render('error', { message: 'שגיאה בטעינת האיומים' });
        });
};

exports.getAddThreat = (req, res, next) => {
    res.render('threat_form', {
        threat: null,
        action: '/threats/add',
        title: 'הוספת איום',
        error: null
    });
};

exports.postAddThreat = (req, res, next) => {
    const validationErrors = validateThreat(req.body);
    if (validationErrors.length > 0) {
        return res.render('threat_form', {
            threat: {
                threat_name: req.body.threatName,
                description: req.body.description,
                severity: req.body.severity,
                target_audience: req.body.targetAudience,
                attack_method: req.body.attackMethod,
                warning_signs: req.body.warningSigns,
                prevention: req.body.prevention,
                damage_level: req.body.damageLevel
            },
            action: '/threats/add',
            title: 'הוספת איום',
            error: validationErrors[0]
        });
    }

    const threat = new Threat(
        req.body.threatName.trim(),
        req.body.description.trim(),
        req.body.severity,
        req.body.targetAudience.trim(),
        req.body.attackMethod.trim(),
        req.body.warningSigns.trim(),
        req.body.prevention.trim(),
        req.body.damageLevel
    );

    threat.save()
        .then(() => res.redirect('/threats'))
        .catch(err => {
            console.error('Add threat error:', err.message);
            res.render('error', { message: 'שגיאה בהוספת האיום' });
        });
};

exports.getEditThreat = (req, res, next) => {
    const id = parseId(req.params.id);
    if (!id) {
        return res.render('error', { message: 'מזהה איום לא תקין' });
    }

    Threat.getById(id)
        .then(rows => {
            if (!rows[0][0]) {
                return res.render('error', { message: 'האיום לא נמצא' });
            }
            res.render('threat_form', {
                threat: rows[0][0],
                action: '/threats/edit/' + id,
                title: 'עריכת איום',
                error: null
            });
        })
        .catch(err => {
            console.error('Edit threat error:', err.message);
            res.render('error', { message: 'שגיאה בטעינת האיום' });
        });
};

exports.postEditThreat = (req, res, next) => {
    const id = parseId(req.params.id);
    if (!id) {
        return res.render('error', { message: 'מזהה איום לא תקין' });
    }

    const validationErrors = validateThreat(req.body);
    if (validationErrors.length > 0) {
        return res.render('threat_form', {
            threat: {
                threat_name: req.body.threatName,
                description: req.body.description,
                severity: req.body.severity,
                target_audience: req.body.targetAudience,
                attack_method: req.body.attackMethod,
                warning_signs: req.body.warningSigns,
                prevention: req.body.prevention,
                damage_level: req.body.damageLevel
            },
            action: '/threats/edit/' + id,
            title: 'עריכת איום',
            error: validationErrors[0]
        });
    }

    Threat.update(
        id,
        req.body.threatName.trim(),
        req.body.description.trim(),
        req.body.severity,
        req.body.targetAudience.trim(),
        req.body.attackMethod.trim(),
        req.body.warningSigns.trim(),
        req.body.prevention.trim(),
        req.body.damageLevel
    )
        .then(() => res.redirect('/threats'))
        .catch(err => {
            console.error('Update threat error:', err.message);
            res.render('error', { message: 'שגיאה בעדכון האיום' });
        });
};

exports.postDeleteThreat = (req, res, next) => {
    const id = parseId(req.params.id);
    if (!id) {
        return res.render('error', { message: 'מזהה איום לא תקין' });
    }

    Threat.delete(id)
        .then(() => res.redirect('/threats'))
        .catch(err => {
            console.error('Delete threat error:', err.message);
            res.render('error', { message: 'שגיאה במחיקת האיום' });
        });
};
