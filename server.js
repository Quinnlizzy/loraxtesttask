const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Initialize express app
const app = express();

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Handle registration
app.post('/register', (req, res) => {
  // Get form data
  const { firstName, lastName, email, password } = req.body;

  // Read users from JSON file
  fs.readFile('users.json', (err, data) => {
    if (err) throw err;
    let users = JSON.parse(data);

    // Check if user already exists
    if (users.find(user => user.email === email)) {
      res.json({ success: false, message: 'Email already in use' });
      return;
    }

    // Add new user
    users.push({ firstName, lastName, email, password });

    // Write users back to JSON file
    fs.writeFile('users.json', JSON.stringify(users), (err) => {
      if (err) throw err;
      res.json({ success: true });
    });
  });
});

// Start server
app.listen(3000, () => console.log('Server started on port 3000'));