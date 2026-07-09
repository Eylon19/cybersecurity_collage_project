const Threat = require('../models/threat');

exports.getThreats = (req, res, next) => {
    Threat.getAll()
        .then(rows => res.render('threats', { threats: rows[0] }))
        .catch(err => res.render('error', { message: err }));
};

exports.getAddThreat = (req, res, next) => {
    res.render('threat_form', {
        threat: null,
        action: '/threats/add',
        title: 'הוספת איום'
    });
};

exports.postAddThreat = (req, res, next) => {
    const threat = new Threat(
        req.body.threatName,
        req.body.description,
        req.body.severity,
        req.body.targetAudience,
        req.body.attackMethod,
        req.body.warningSigns,
        req.body.prevention,
        req.body.damageLevel
    );

    threat.save()
        .then(() => res.redirect('/threats'))
        .catch(err => res.render('error', { message: err }));
};

exports.getEditThreat = (req, res, next) => {
    Threat.getById(req.params.id)
        .then(rows => res.render('threat_form', {
            threat: rows[0][0],
            action: '/threats/edit/' + req.params.id,
            title: 'עריכת איום'
        }))
        .catch(err => res.render('error', { message: err }));
};

exports.postEditThreat = (req, res, next) => {
    Threat.update(
        req.params.id,
        req.body.threatName,
        req.body.description,
        req.body.severity,
        req.body.targetAudience,
        req.body.attackMethod,
        req.body.warningSigns,
        req.body.prevention,
        req.body.damageLevel
    )
        .then(() => res.redirect('/threats'))
        .catch(err => res.render('error', { message: err }));
};

exports.postDeleteThreat = (req, res, next) => {
    Threat.delete(req.params.id)
        .then(() => res.redirect('/threats'))
        .catch(err => res.render('error', { message: err }));
};