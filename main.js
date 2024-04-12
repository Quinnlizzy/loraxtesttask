document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
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
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Redirect to login page
          window.location.href = 'login.html';
        } else {
          document.getElementById('messageBox').innerText = data.message;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        document.getElementById('messageBox').innerText = 'An error occurred. Please try again.';
      });
  });