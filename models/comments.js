const sequelize = require('../config/connection');
const Comment = require('../models/comment');
exports.create = (req, res) => {
  if (req.session.user) {
    Comment.create({
      content: req.body.content,
      postId: req.params.id
    }).then(() => {
      res.redirect(`/post/${req.params.id}`);
    });
  } else {
    res.redirect('/login');
  }
};
```

**models/post.js**
```js
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  });

  return Post;
};
```

**models/comment.js**
```js
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    content: DataTypes.TEXT,
    postId: DataTypes.INTEGER
  });

  return Comment;
};
```