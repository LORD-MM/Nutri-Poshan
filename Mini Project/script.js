// Get the input elements
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Add event listeners for input focus and blur events
usernameInput.addEventListener('focus', applyBlur);
usernameInput.addEventListener('blur', removeBlur);
passwordInput.addEventListener('focus', applyBlur);
passwordInput.addEventListener('blur', removeBlur);

// Function to apply the blur effect
function applyBlur() {
  document.body.style.filter = 'blur(3px)'; // Set the desired blur value
}

// Function to remove the blur effect
function removeBlur() {
  document.body.style.filter = 'none'; // Reset the blur value
}
