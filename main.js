// Get form elements
let form = document.getElementById('registrationForm');
let messageBox = document.getElementById('messageBox');

// Handle form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form data
  let firstName = form.elements.firstName.value;
  let lastName = form.elements.lastName.value;
  let email = form.elements.email.value;
  let password = form.elements.password.value;

  // Send form data to server
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
    // Display success or error message
    if (data.success) {
      messageBox.textContent = 'Registration successful!';
      messageBox.style.color = 'green';
    } else {
      messageBox.textContent = data.message;
      messageBox.style.color = 'red';
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    messageBox.textContent = 'An error occurred. Please try again.';
    messageBox.style.color = 'red';
  });
});