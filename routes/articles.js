const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles');
const { requireLogin } = require('../middleware/auth');

router.get('/articles', articlesController.getArticles);
router.get('/articles/add', requireLogin, articlesController.getAddArticle);
router.post('/articles/add', requireLogin, articlesController.postAddArticle);
router.get('/articles/edit/:id', requireLogin, articlesController.getEditArticle);
router.post('/articles/edit/:id', requireLogin, articlesController.postEditArticle);
router.post('/articles/delete/:id', requireLogin, articlesController.postDeleteArticle);

module.exports = router;
