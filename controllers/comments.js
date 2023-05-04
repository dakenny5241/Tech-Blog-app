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

**routes/index.js**
```js
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');
const commentsController = require('../controllers/comments');

router.get('/', postsController.index);

router.get('/post/:id', postsController.show);

router.post('/post/:id/comment', commentsController.create);

router.get('/dashboard', postsController.dashboard);

module.exports = router;
```

**routes/post.js**
```js
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');
const commentsController = require('../controllers/comments');

router.get('/', postsController.index);


router.get('/post/:id', postsController.show);

router.post('/post/:id/comment', commentsController.create);

router.get('/dashboard', postsController.dashboard);

module.exports = router;
```

**routes/comments.js**

```js
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');
const commentsController = require('../controllers/comments');

router.get('/', postsController.index);

router.get('/post/:id', postsController.show);

router.post('/post/:id/comment', commentsController.create);

router.get('/dashboard', postsController.dashboard);

module.exports = router;
```

**server.js**
```js
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```