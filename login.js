// Attach event listener to the form with id 'loginForm'
// will trigger when form is submitted
document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Prevent default form sub behavior
    event.preventDefault();
  
    // Get email & password values from form fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Send a POST request to the '/login' endpoint
    // The body of the request is a JSON string containing the email and password
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      // Parse the response as JSON
      .then((response) => response.json())
      .then((data) => {
        // If login was successful, redirect to welcome page
        if (data.success) {
          window.location.href = 'welcome.html';
        } else {
          // If login unsuccessful, display error message
          document.getElementById('messageBox').innerText = data.message;
        }
      })
      // If there was an error with the fetch, log the error and display a generic error message
      .catch((error) => {
        console.error('Error:', error);
        document.getElementById('messageBox').innerText = 'An error occurred. Please try again.';
      });
  });