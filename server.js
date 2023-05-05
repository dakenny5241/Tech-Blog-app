const express = require('express');
const path = require('path');
const session = require('express-session');
const Sequelize = require('sequelize');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

const router = require('./router');
app.use(session(sess));
app.use(routes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname, 'public'));
app.use(routes);

app.get('/', (req, res) => {

    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/post', (req, res) => {
    res.render('post');
});

app.get('/post/:id', (req, res) => {
    res.render('post');
});

app.get('/comments', (req, res) => {
    res.render('comments');

});

app.get('/comments/:id', (req, res) => {
    res.render('comments');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.post('/login', (req, res) => {
    res.redirect('/dashboard');
});

app.post('/signup', (req, res) => {
    res.redirect('/dashboard');
});

app.post('/post', (req, res) => {
    res.redirect('/dashboard');
});

app.post('/comments', (req, res) => {
    res.redirect('/dashboard');
});

app.post('/comments/:id', (req, res) => {
    res.redirect('/dashboard');
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});