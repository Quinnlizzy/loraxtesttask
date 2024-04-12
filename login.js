document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
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
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Redirect to some page after successful login
          window.location.href = 'welcome.html';
        } else {
          document.getElementById('messageBox').innerText = data.message;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        document.getElementById('messageBox').innerText = 'An error occurred. Please try again.';
      });
  });