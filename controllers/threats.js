const Threat = require('../models/threat');
const { parseId, validateThreat, hasAffectedRows } = require('../util/validation');
const { threatFormState } = require('../util/formState');
const { logError } = require('../util/logger');

exports.getThreats = (req, res, next) => {
    Threat.getAll()
        .then(rows => res.render('threats', { threats: rows[0] }))
        .catch(err => {
            logError('Get threats error', err);
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
            threat: threatFormState(req.body),
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
            logError('Add threat error', err);
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
            logError('Edit threat error', err);
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
            threat: threatFormState(req.body),
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
        .then(result => {
            if (!hasAffectedRows(result)) {
                return res.render('error', { message: 'האיום לא נמצא' });
            }
            res.redirect('/threats');
        })
        .catch(err => {
            logError('Update threat error', err);
            res.render('error', { message: 'שגיאה בעדכון האיום' });
        });
};

exports.postDeleteThreat = (req, res, next) => {
    const id = parseId(req.params.id);
    if (!id) {
        return res.render('error', { message: 'מזהה איום לא תקין' });
    }

    Threat.delete(id)
        .then(result => {
            if (!hasAffectedRows(result)) {
                return res.render('error', { message: 'האיום לא נמצא' });
            }
            res.redirect('/threats');
        })
        .catch(err => {
            logError('Delete threat error', err);
            res.render('error', { message: 'שגיאה במחיקת האיום' });
        });
};
