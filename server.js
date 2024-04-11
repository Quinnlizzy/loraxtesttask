const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.post('/register', (req, res) => {
  // Get form data from request body
  const { firstName, lastName, email, password } = req.body;

  // TODO: Validate form data

  // Read users from JSON file
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
      return;
    }

    // Parse JSON data
    let users = JSON.parse(data);

    // Add new user
    users.push({ firstName, lastName, email, password });

    // Write updated users back to JSON file
    fs.writeFile('users.json', JSON.stringify(users), 'utf8', (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
        return;
      }

      // Send success response
      res.json({ success: true });
    });
  });
});

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));