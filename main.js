// JavaScript
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form data
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
      // Validate form data
  // Check if email is valid
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Check if password length is at least 8
  if (password.length < 8) {
    alert('Password should be at least 8 characters long.');
    return;
  }
    
    // Submit form data to server
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Redirect to login page
          window.location.href = '/login';
        } else {
          // Show error message
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
});