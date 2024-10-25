const express = require("express");
const router = express.Router();
const posts = require("../data/posts.js");

////////////// POSTS //////////////

// Get all posts
router.get('/', (req, res) => {
  res.json(posts);
});

// Get a post by ID
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

// Create a new post
router.post('/', (req, res) => {
  const { userId, title, content } = req.body;

  if (userId && title && content) {
    const newPost = {
      id: posts[posts.length - 1].id + 1, // Mock auto-increment ID
      userId: userId,
      title: title,
      content: content
    };

    posts.push(newPost);
    res.status(201).json(newPost); // 201 for successful creation
  } else {
    res.status(400).json({ error: "Insufficient data: userId, title, and content are required" });
  }
});

// Update a post by ID
router.patch('/:id', (req, res) => {
  const postIndex = posts.findIndex(p => p.id == req.params.id);

  if (postIndex !== -1) {
    // Update the post with the data from req.body
    const updatedPost = { ...posts[postIndex], ...req.body };
    posts[postIndex] = updatedPost;

    res.status(200).json(updatedPost); // 200 for successful update
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

// Delete a post by ID
router.delete('/:id', (req, res) => {
  const postIndex = posts.findIndex(p => p.id == req.params.id);

  if (postIndex !== -1) {
    const deletedPost = posts.splice(postIndex, 1)[0]; // Remove the post and return it
    res.status(200).json(deletedPost); // 200 for successful deletion
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

module.exports = router;
