document.getElementById('userForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:3000/secufleet/auth/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      console.log(data); // Log the response data for debugging

      // Assuming your server returns a token upon successful login
      const token = data.token;

      // Store token in localStorage
      localStorage.setItem('jwtToken', token);

      // Redirect to admin page after successful login
      window.location.href = '../admin/adminPage.html';
  })
  .catch(error => {
      console.error('Error:', error);
      // Handle error (e.g., display error message to user)
  });
});
