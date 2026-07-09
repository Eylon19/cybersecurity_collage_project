const Article = require('../models/article');

exports.getArticles = (req, res, next) => {
    Article.getAll()
        .then(rows => {
            res.render('articles', {
                articles: rows[0]
            });
        })
        .catch(err => {
            res.render('error', { message: err });
        });
};

exports.getAddArticle = (req, res, next) => {
    res.render('article_form', {
        article: null,
        action: '/articles/add',
        title: 'הוספת מאמר'
    });
};

exports.postAddArticle = (req, res, next) => {
    const article = new Article(
        req.body.title,
        req.body.category,
        req.body.author,
        req.body.summary,
        req.body.content,
        req.body.difficultyLevel,
        req.body.readingTime,
        req.body.sourceName
    );

    article.save()
        .then(() => {
            res.redirect('/articles');
        })
        .catch(err => {
            res.render('error', { message: err });
        });
};

exports.getEditArticle = (req, res, next) => {
    Article.getById(req.params.id)
        .then(rows => {
            res.render('article_form', {
                article: rows[0][0],
                action: '/articles/edit/' + req.params.id,
                title: 'עריכת מאמר'
            });
        })
        .catch(err => {
            res.render('error', { message: err });
        });
};

exports.postEditArticle = (req, res, next) => {
    Article.update(
        req.params.id,
        req.body.title,
        req.body.category,
        req.body.author,
        req.body.summary,
        req.body.content,
        req.body.difficultyLevel,
        req.body.readingTime,
        req.body.sourceName
    )
        .then(() => {
            res.redirect('/articles');
        })
        .catch(err => {
            res.render('error', { message: err });
        });
};

exports.postDeleteArticle = (req, res, next) => {
    Article.delete(req.params.id)
        .then(() => {
            res.redirect('/articles');
        })
        .catch(err => {
            res.render('error', { message: err });
        });
};