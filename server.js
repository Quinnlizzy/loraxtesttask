const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Initialize express app
const app = express();

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Initialize SQLite database
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// Handle registration
app.post('/register', (req, res) => {
  // Get form data
  const { firstName, lastName, email, password } = req.body;

  // TODO: Add your validation and database logic here

  // Send response
  res.json({ success: true });
});

// Start server
app.listen(3000, () => console.log('Server started on port 3000'));