// Attach event listener to form with id 'registrationForm'
// trigger on submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    // Prevent default
    event.preventDefault();
  
    // Get firstName, lastName, email, and password values from the form
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Send a POST request to the '/register' endpoint
    // The body of the request is a JSON string containing the firstName, lastName, email, and password
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    })
      // Parse the response as JSON
      .then((response) => response.json())
      .then((data) => {
        // If registration was successful, redirect to the login page
        if (data.success) {
          window.location.href = 'login.html';
        } else {
          // If registration was not successful, display error message
          document.getElementById('messageBox').innerText = data.message;
        }
      })
      // If there was an error with the fetch request, log error and display a generic error message
      .catch((error) => {
        console.error('Error:', error);
        document.getElementById('messageBox').innerText = 'An error occurred. Please try again.';
      });
  });