const express = require("express");
const router = express.Router();
const comments = require("../data/comments.js");  // Assuming you have a comments data file

// Get all comments
router.get('/', (req, res) => {
  res.json(comments);
});

// Get a specific comment by ID
router.get('/:id', (req, res) => {
  const comment = comments.find(c => c.id == req.params.id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ error: "Comment not found" });
  }
});

// Create a new comment
router.post('/', (req, res) => {
  const { userId, postId, body } = req.body;
  if (userId && postId && body) {
    const newComment = {
      id: comments.length + 1,
      userId,
      postId,
      body
    };
    comments.push(newComment);
    res.status(201).json(newComment); // 201 for created resource
  } else {
    res.status(400).json({ error: "Insufficient data" });
  }
});

// Update a comment by ID
router.patch('/:id', (req, res) => {
  const commentIndex = comments.findIndex(c => c.id == req.params.id);
  if (commentIndex !== -1) {
    const updatedComment = { ...comments[commentIndex], ...req.body };
    comments[commentIndex] = updatedComment;
    res.status(200).json(updatedComment);  // 200 for successful update
  } else {
    res.status(404).json({ error: "Comment not found" });
  }
});

// Delete a comment by ID
router.delete('/:id', (req, res) => {
  const commentIndex = comments.findIndex(c => c.id == req.params.id);
  if (commentIndex !== -1) {
    const deletedComment = comments.splice(commentIndex, 1)[0];
    res.status(200).json(deletedComment); // 200 for successful deletion
  } else {
    res.status(404).json({ error: "Comment not found" });
  }
});

module.exports = router;
