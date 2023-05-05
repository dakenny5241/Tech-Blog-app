const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');
const commentsController = require('../controllers/comments');

// Homepage Route
router.get('/', postsController.index);

// Show Routes
router.get('/post/:id', postsController.show);

// Create Routes
router.get('/post/create', postsController.create);

// Edit Routes
router.get('/post/:id/edit', postsController.edit);

// Update Routes    
router.put('/post/:id', postsController.update);

// Delete Routes
router.delete('/post/:id', postsController.destroy);

// Comment Routes
router.get('/post/:id/comment', commentsController.index);

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

// Signup Routes
router.get('/signup', postsController.signup);
router.post('/signup', postsController.signup);

module.exports = router;
```