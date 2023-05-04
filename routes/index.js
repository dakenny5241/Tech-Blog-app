const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');
const commentsController = require('../controllers/comments');

// Homepage Route
router.get('/', postsController.index);

// Post Routes
router.get('/post/:id', postsController.show);
router.post('/post/:id/comment', commentsController.create);

// Dashboard Routes
router.get('/dashboard', postsController.dashboard);
router.post('/dashboard', postsController.create);

// Login Routes
router.get('/login', postsController.login);
router.post('/login', postsController.login);

// Logout Route
router.get('/logout', postsController.logout);

module.exports = router;
```