const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); // Add this line

const app = express();

app.use(cors()); // And this line

// Middleware to parse JSON bodies
app.use(bodyParser.json());



app.post('/login', (req, res) => {
    // Get form data from request body
    const { email, password } = req.body;
  
    // Read users from JSON file
    fs.readFile('users.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
        return;
      }
  
      // Parse JSON data
      let users = JSON.parse(data);
  
      // Find user with matching email
      let user = users.find(user => user.email === email);
  
      if (!user) {
        // User not found
        res.status(401).json({ success: false, message: 'Invalid email or password.' });
        return;
      }
  
      if (user.password !== password) {
        // Incorrect password
        res.status(401).json({ success: false, message: 'Invalid email or password.' });
        return;
      }
  
      // User found and password is correct
      // Send success response
      res.json({ success: true });
    });
  });



  app.post('/register', (req, res) => {
    // Get form data from request body
    const { firstName, lastName, email, password } = req.body;
  
    // Validate form data
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ success: false, message: 'All fields are required.' });
      return;
    }
  
    if (firstName.length < 2 || firstName.length > 50) {
      res.status(400).json({ success: false, message: 'First name must be between 2 and 50 characters.' });
      return;
    }
  
    if (lastName.length < 2 || lastName.length > 50) {
      res.status(400).json({ success: false, message: 'Last name must be between 2 and 50 characters.' });
      return;
    }
  
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      res.status(400).json({ success: false, message: 'Invalid email format.' });
      return;
    }
  
    if (password.length < 8 || password.length > 50) {
      res.status(400).json({ success: false, message: 'Password must be between 8 and 50 characters.' });
      return;
    }
  
    // Read users from JSON file
    fs.readFile('users.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
        return;
      }
  
      // Parse JSON data
      let users = JSON.parse(data);
  
      // Check if user with given email already exists
      if (users.some(user => user.email === email)) {
        res.status(400).json({ success: false, message: 'Email already in use.' });
        return;
      }
  
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

module.exports = app;
