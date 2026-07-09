const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

const usersRoutes = require('./routes/users');
const articlesRoutes = require('./routes/articles');
const threatsRoutes = require('./routes/threats');
const quizRoutes = require('./routes/quiz');
const securityTipsRoutes = require('./routes/securityTips');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'cyber-awareness-secret',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

app.use(usersRoutes);
app.use(articlesRoutes);
app.use(threatsRoutes);
app.use(quizRoutes);
console.log('loading security tips routes');
app.use(securityTipsRoutes);

app.use((req, res, next) => {
    res.status(404).render('error', { message: 'הדף לא נמצא' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
