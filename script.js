// Select all necessary DOM elements (form, inputs, error message spans)

// Step 1 Select the form
const form = document.getElementById('registrationForm')

//Step 2 Select inputs,
const usernameInput = document.getElementById('username')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const confirmPasswordInput = document.getElementById('confirmPassword')

// Step 3 Select error message spans
const usernameError = document.getElementById('usernameError')
const emailError = document.getElementById('emailError')
const passwordError = document.getElementById('passwordError')
const confirmPasswordError = document.getElementById('confirmPasswordError')

// Load saved username: On page load, check if a username is saved in localStorage. If so, pre-fill the username field.

// Step 1 when page loads, check if a username is save 
window.addEventListener('DOMContentLoaded', () => {
    const savedUsername = localStorage.getItem('username')
    if (savedUsername) {
        usernameInput.value = savedUsername
    }
})

// Real-time validation: Add input event listeners to each field.
// Check validity using the Constraint Validation API (inputElement.validity).
// step 1 Create a function to show error messages 
function showError(input, errorElement) {
    if (input.validity.valueMissing) {
        errorElement.textContent = "This field is required."
    } else if (input.type === "email" && input.validity.typeMismatch) {
        errorElement.textContent = "Please enter a valid email address."
    } else if  (input.id === "password" && input.value.length < 8) {
        errorElement.textContent = "Password must be at least 8 characters."
    } else {
        errorElement.textContent = ""; // clear error if valid
    }
}

// Step 2 Adding input event listeners for real-time validation
usernameInput.addEventListener('input', () => showError(usernameInput, usernameError))
emailInput.addEventListener('input', () => showError(emailInput, emailError))
passwordInput.addEventListener('input', () => showError(passwordInput, passwordError));
confirmPasswordInput.addEventListener('input', () => {
  if (confirmPasswordInput.value !== passwordInput.value) {
    confirmPasswordError.textContent = "Passwords do not match.";
  } else {
    confirmPasswordError.textContent = "";
  }
});

// Step 3 Confirm Password validation
function validateConfirmPassword() {
  if (confirmPasswordInput.value === "") {
    confirmPasswordError.textContent = "Please confirm your password.";
  } else if (confirmPasswordInput.value !== passwordInput.value) {
    confirmPasswordError.textContent = "Passwords do not match.";
  } else {
    confirmPasswordError.textContent = ""; // Clear if valid
  }
}

// Attaching real-time check
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

// Also check whenever password changes (so user gets feedback if they edit the first field later)
passwordInput.addEventListener('input', validateConfirmPassword);

// Form submission: Add a submit event listener to the form.
formvar = document.getElementById('registrationForm')

//Call event.preventDefault().
formvar.addEventListener("submit", function (e){
   e.preventDefault()
    console.log(emailInput.value)
    console.log(usernameInput.value)
    console.log(passwordInput.value)
    console.log(confirmPasswordInput.value)

    // Perform a final validation check on all fields.

    showError(usernameInput, usernameError)
    showError(emailInput, emailError)
    showError(passwordInput, passwordError)
    validateConfirmPassword();

    // check if all fields are valid
    if ( 
        usernameError.textContent === "" &&
        emailError.textContent === "" &&
        passwordError.textContent === "" &&
        confirmPasswordError.textContent === "" 
    ) {
        // if success show message, save username, rest the form
        alert("Registration successful!");
        localStorage.setItem("username", usernameInput.value)
        localStorage.setItem("email", emailInput.value)
        form.reset();
    } else {

        if (usernameError.textContent) {
            usernameInput.focus();
        } else if (emailError.textContent) {
            emailInput.focus();
        } else if (passwordError.textContent) {
            passwordInput.focus();
        } else if (confirmPasswordError.textContent) {
            confirmPasswordInput.focus();
        }
    }
})
