const Post = require('../models/post');
const Comment = require('../models/comment');

exports.index = (req, res) => {
  Post.findAll().then(posts => {
    const template = Handlebars.compile('{{#each posts}}<h2>{{title}}</h2><p>{{content}}</p>{{/each}}');
    const html = template({ posts });
    res.send(html);
  });
};

exports.show = (req, res) => {
  Post.findByPk(req.params.id).then(post => {
    Comment.findAll({ where: { postId: req.params.id } }).then(comments => {
      const template = Handlebars.compile('<h2>{{title}}</h2><p>{{content}}</p>{{#each comments}}<p>{{content}}</p>{{/each}}');
      const html = template({ post, comments });
      res.send(html);
    });
  });
};

exports.dashboard = (req, res) => {
  if (req.session.user) {
    Post.findAll({ where: { userId: req.session.user.id } }).then(posts => {
      const template = Handlebars.compile('{{#each posts}}<h2>{{title}}</h2><p>{{content}}</p>{{/each}}');
      const html = template({ posts });
      res.send(html);
    });
  } else {
    res.redirect('/login');
  }
};

exports.create = (req, res) => {
  if (req.session.user) {
    Post.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.session.user.id
    }).then(() => {
      res.redirect('/dashboard');
    });
  } else {
    res.redirect('/login');
  }
};

exports.login = (req, res) => {
  const template = Handlebars.compile('<form action="/login" method="post"><input type="text" name="username" placeholder="Username"><input type="password" name="password" placeholder="Password"><input type="submit" value="Login"></form>');
  const html = template();
  res.send(html);
};

exports.login = (req, res) => {
  User.findOne({ where: { username: req.body.username } }).then(user => {
    if (user && user.password === req.body.password) {
      req.session.user = user;
      res.redirect('/dashboard');
    } else {
      res.redirect('/login');
    }
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
```