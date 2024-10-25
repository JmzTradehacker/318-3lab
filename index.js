require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const secretKey = process.env.API_KEY_SECRET;

// Import route files
const usersRouter = require("./routes/users.js");
const postsRouter = require("./routes/posts.js");
const commentsRouter = require("./routes/comments.js");

// Middleware for parsing form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Logging middleware for requests
app.use((req, res, next) => {
  const time = new Date();
  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

// API key validation middleware
const apikeys = ["perscholas", "ps-example", process.env.API_KEY_SECRET];  // Mock API keys for testing
app.use('/api', (req, res, next) => {
  const key = req.query['api-key'];
  
  if (apikeys.indexOf(key) === -1) {
    return res.status(403).json({ error: "Invalid API key" });
  }
  
  next(); // Call next() to pass control to the next middleware or route
});

// Router setup for users, posts, and comments
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Work in progress!");
});

// 404 Error Handling Middleware
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// 500 Internal Server Error Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
