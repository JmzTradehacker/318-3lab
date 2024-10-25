const express = require("express");
const router = express.Router();
const users = require("../data/users.js");

// BASE PATH FOR THIS ROUTER IS: /api/users

////////////// USERS //////////////

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Get a user by ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Create a new user
router.post('/', (req, res) => {
  const { name, username, email } = req.body;

  if (name && username && email) {
    const foundUser = users.find(u => u.username === username);
    if (foundUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const newUser = {
      id: users[users.length - 1].id + 1, // Mock auto-increment ID
      name: name,
      username: username,
      email: email
    };

    users.push(newUser);
    res.status(201).json(newUser); // 201 for successful creation
  } else {
    res.status(400).json({ error: "Insufficient data: Name, Username, and Email are required" });
  }
});

// Update a user by ID
router.patch('/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id == req.params.id);

  if (userIndex !== -1) {
    // Update the user with the data from req.body
    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;

    res.status(200).json(updatedUser); // 200 for successful update
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Delete a user by ID
router.delete('/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id == req.params.id);

  if (userIndex !== -1) {
    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);
    res.status(200).json(deletedUser); // 200 for successful deletion
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

module.exports = router;