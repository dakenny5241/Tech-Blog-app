const express = require('express');
const session = require('express-session');
const Sequelize = require('sequelize');
const Handlebars = require('handlebars');


const app = express();
const PORT = process.env.PORT || 3000;

const hbs = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

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

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});