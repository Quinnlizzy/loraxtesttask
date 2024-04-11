// JavaScript
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form data
    let firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    // Validate form data
    // TODO: Add your validation logic here
    
    // Submit form data to server
    // TODO: Add your server communication logic here
  });