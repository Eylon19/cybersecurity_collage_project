require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const { csrfProtection } = require('./middleware/csrf');

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

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    console.warn('WARNING: SESSION_SECRET is not set. Using fallback — not safe for production.');
}

app.use(session({
    secret: sessionSecret || 'dev-only-fallback-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(csrfProtection);

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

app.use(usersRoutes);
app.use(articlesRoutes);
app.use(threatsRoutes);
app.use(quizRoutes);
app.use(securityTipsRoutes);

app.use((req, res, next) => {
    res.status(404).render('error', { message: 'הדף לא נמצא' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
