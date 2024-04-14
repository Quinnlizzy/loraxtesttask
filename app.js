// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Initialize Express app
const app = express();

// Use body-parser middleware to parse incoming JSON objects
app.use(bodyParser.json());

// Define POST route for user reg
app.post('/register', (req, res) => {
  // Extract form data from req body
  const { firstName, lastName, email, password } = req.body;

  // Read the users.json file
  fs.readFile('users.json', (err, data) => {
    // If there's an error reading the file, throw error
    if (err) throw err;

    // Parse data from the file into a JS object
    let users = JSON.parse(data);

    // Check if a user with the same email already exists
    if (users.find(user => user.email === email)) {
      // If a user with the same email exists, send a response with a failure message
      res.json({ success: false, message: 'Email already in use' });
      return;
    }

    // If no user with the same email exists, add new user to the users array
    users.push({ firstName, lastName, email, password });

    // Write the updated users array back to the users.json file
    fs.writeFile('users.json', JSON.stringify(users), (err) => {
      // If there's an error writing to the file, throw error
      if (err) throw err;

      // If file was written successfully, send response with a success message
      res.json({ success: true });
    });
  });
});

// Start Express server
app.listen(3000, () => console.log('Server started on port 3000'));