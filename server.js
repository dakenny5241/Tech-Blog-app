const express = require('express');
const session = require('express-session');
const Sequelize = require('sequelize');
const Handlebars = require('handlebars');


const app = express();
const PORT = process.env.PORT || 3000;
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sess));
const hbs = require('express-handlebars');
const helpers = require('./utils/helpers');

app.engine('handlebars', hbs({
    helpers: helpers
}));
app.set('view engine', 'handlebars');

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


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on PORT ${PORT}`);
    });



app.post('/login', (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
        
        where: {
            email: email
        }

    }).then(user => {
        




        if (!user) {
            res.redirect('/login');
        } else {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    req.session.userId = user.id;
                    req.session.isLoggedIn = true;
                    res.redirect('/');
                } else {
                    res.redirect('/login');
                }
            });
        }
    });
});

app.post('/signup', (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user) {
            res.redirect('/login');
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    User.create({
                        email: email,
                        password: hash
                    }).then(user => {
                        req.session.userId = user.id;
                        req.session.isLoggedIn = true;
                        res.redirect('/');
                    });
                });
            });
        }
    });
});

app.post('/logout', (req, res) => {
    if (req.session.isLoggedIn) {
        req.session.destroy(err => {
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
});

app.post('/post', (req, res) => {
    console.log(req.body);
    const title = req.body.title;
    const content = req.body.content;
    const userId = req.session.userId;
    Post.create({
        title: title,
        content: content,
        userId: userId
    }).then(post => {
        res.redirect('/');
    });
});

app.post('/comments', (req, res) => {
    
    const content = req.body.content;
    const postId = req.body.postId;
    const userId = req.session.userId;
    Comment.create({
        content: content,
        postId: postId,
        userId: userId
    }).then(comment => {
        res.redirect('/');
    });
});
app.post('/comments/:id', (req, res) => {
    const content = req.body.content;
    const postId = req.body.postId;
    const userId = req.session.userId;
    Comment.create({
        content: content,
        postId: postId,
        userId: userId
    }).then(comment => {
        res.redirect('/');
    });
});

module.exports = app;
