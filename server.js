// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

// Create Express app
const app = express();

// Use CORS middleware to allow cross-origin req
app.use(cors());

// Use body-parser middleware to parse JSON req bodies
app.use(bodyParser.json());

// Define POST /login route
app.post('/login', (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;
  
  // Read users from 'users.json' file
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      // Log error and send error response if reading file fails
      console.error(err);
      res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
      return;
    }

    // Parse users data from JSON
    let users = JSON.parse(data);

    // Find user with matched email
    let user = users.find(user => user.email === email);

    if (!user || user.password !== password) {
      // Send error response if user not found and/or password is incorrect
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    // Send success res if user found & password is correct
    res.json({ success: true });
  });
});



// Define POST /register route
app.post('/register', (req, res) => {
    // Extract form data from request body
    const { firstName, lastName, email, password } = req.body;
  
    // Validate form data & send error response if validation fails
        // Check if firstName, lastName, email, or password is not provided
        if (!firstName || !lastName || !email || !password) {
            // If any not provided, send a 400 status code and an error message
            res.status(400).json({ success: false, message: 'All fields are required.' });
            // Stop further execution
            return;
          }
        
          // Check if firstName less than 2 characters or more than 50 characters
          if (firstName.length < 2 || firstName.length > 50) {
            // If it is, send a 400 status code & JSON response w/ error message
            res.status(400).json({ success: false, message: 'First name must be between 2 and 50 characters.' });
            // Stop execution
            return;
          }
        
          // Check if lastName is less than 2 characters or more than 50 characters
          if (lastName.length < 2 || lastName.length > 50) {
            // as above, If it is, send a 400 status code & JSON response w/ error message
            res.status(400).json({ success: false, message: 'Last name must be between 2 and 50 characters.' });
            // Stop execution
            return;
          }
        
          // Check if email is in a valid format by testing it against regular expression
          if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            // If not in valid format, send a 400 status code and an error message
            res.status(400).json({ success: false, message: 'Invalid email format.' });
            // Stop execution
            return;
          }
        
          // Check if password is less than 8 characters or more than 50 characters
          if (password.length < 8 || password.length > 50) {
            // If it is, send a 400 status code and an error message
            res.status(400).json({ success: false, message: 'Password must be between 8 and 50 characters.' });
            // Stop further execution
            return;
          }
  
  // Read users from 'users.json' file
  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
      // Log error and send error response if reading file fails
      console.error(err);
      res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
      return;
    }

    // Parse users data from JSON
    let users = JSON.parse(data);

    // Check if user with given email already exists
    if (users.some(user => user.email === email)) {
      res.status(400).json({ success: false, message: 'Email already in use.' });
      return;
    }

    // Add new user to users array 
    users.push({ firstName, lastName, email, password });

  
    // Write updated users back to 'users.json' file
    fs.writeFile('users.json', JSON.stringify(users), 'utf8', (err) => {
        if (err) {
          // Log error and send error response if writing file fails
          console.error(err);
          res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
          return;
        }
  
        // Send success response
        res.json({ success: true });
      });
    });
  });
  
  // Start the server on port 3000
  app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
  
  // Export the app 
  module.exports = app;
