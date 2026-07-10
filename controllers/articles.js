const Article = require('../models/article');
const { parseId, validateArticle, hasAffectedRows } = require('../util/validation');
const { articleFormState } = require('../util/formState');

exports.getArticles = (req, res, next) => {
    Article.getAll()
        .then(rows => {
            res.render('articles', { articles: rows[0] });
        })
        .catch(err => {
            console.error('Get articles error:', err.message);
            res.render('error', { message: 'שגיאה בטעינת המאמרים' });
        });
};

exports.getAddArticle = (req, res, next) => {
    res.render('article_form', {
        article: null,
        action: '/articles/add',
        title: 'הוספת מאמר',
        error: null
    });
};

exports.postAddArticle = (req, res, next) => {
    const validationErrors = validateArticle(req.body);
    if (validationErrors.length > 0) {
        return res.render('article_form', {
            article: articleFormState(req.body),
            action: '/articles/add',
            title: 'הוספת מאמר',
            error: validationErrors[0]
        });
    }

    const article = new Article(
        req.body.title.trim(),
        req.body.category.trim(),
        req.body.author.trim(),
        req.body.summary.trim(),
        req.body.content.trim(),
        req.body.difficultyLevel,
        parseInt(req.body.readingTime, 10),
        req.body.sourceName.trim()
    );

    article.save()
        .then(() => res.redirect('/articles'))
        .catch(err => {
            console.error('Add article error:', err.message);
            res.render('error', { message: 'שגיאה בהוספת המאמר' });
        });
};

exports.getEditArticle = (req, res, next) => {
    const id = parseId(req.params.id);
    if (!id) {
        return res.render('error', { message: 'מזהה מאמר לא תקין' });
    }

    Article.getById(id)
        .then(rows => {
            if (!rows[0][0]) {
                return res.render('error', { message: 'המאמר לא נמצא' });
            }
            res.render('article_form', {
                article: rows[0][0],
                action: '/articles/edit/' + id,
                title: 'עריכת מאמר',
                error: null
            });
        })
        .catch(err => {
            console.error('Edit article error:', err.message);
            res.render('error', { message: 'שגיאה בטעינת המאמר' });
        });
};

exports.postEditArticle = (req, res, next) => {
    const id = parseId(req.params.id);
    if (!id) {
        return res.render('error', { message: 'מזהה מאמר לא תקין' });
    }

    const validationErrors = validateArticle(req.body);
    if (validationErrors.length > 0) {
        return res.render('article_form', {
            article: { ...articleFormState(req.body), id },
            action: '/articles/edit/' + id,
            title: 'עריכת מאמר',
            error: validationErrors[0]
        });
    }

    Article.update(
        id,
        req.body.title.trim(),
        req.body.category.trim(),
        req.body.author.trim(),
        req.body.summary.trim(),
        req.body.content.trim(),
        req.body.difficultyLevel,
        parseInt(req.body.readingTime, 10),
        req.body.sourceName.trim()
    )
        .then(result => {
            if (!hasAffectedRows(result)) {
                return res.render('error', { message: 'המאמר לא נמצא' });
            }
            res.redirect('/articles');
        })
        .catch(err => {
            console.error('Update article error:', err.message);
            res.render('error', { message: 'שגיאה בעדכון המאמר' });
        });
};

exports.postDeleteArticle = (req, res, next) => {
    const id = parseId(req.params.id);
    if (!id) {
        return res.render('error', { message: 'מזהה מאמר לא תקין' });
    }

    Article.delete(id)
        .then(result => {
            if (!hasAffectedRows(result)) {
                return res.render('error', { message: 'המאמר לא נמצא' });
            }
            res.redirect('/articles');
        })
        .catch(err => {
            console.error('Delete article error:', err.message);
            res.render('error', { message: 'שגיאה במחיקת המאמר' });
        });
};
