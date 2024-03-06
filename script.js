document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('validationForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        validateForm();
    });

    attachInputListeners();
});

function validateForm() {
    clearAlerts();

    var invalidFields = [];

    if (!validateField('username', 'Username is required')) {
        invalidFields.push('username');
    }

    if (!validateField('email', 'Invalid email format', isValidEmail)) {
        invalidFields.push('email');
    }

    if (!validateField('password', 'Password must contain at least 8 characters', isValidPassword)) {
        invalidFields.push('password');
    }

    if (!validateField('confirmPassword', 'Password and Confirm Password do not match', function () {
        return document.getElementById('password').value === document.getElementById('confirmPassword').value;
    })) {
        invalidFields.push('confirmPassword');
    }

    if (invalidFields.length === 0) {
        alert('Form submitted successfully!');
    }
}

function validateField(inputId, errorMessage, validationFunction) {
    var inputElement = document.getElementById(inputId);

    if (validationFunction && !validationFunction()) {
        showAlert(errorMessage, inputId);
        return false;
    }

    return true;
}

function showAlert(message, inputId) {
    var inputElement = document.getElementById(inputId);
    var alertElement = document.createElement('div');
    alertElement.className = 'alert';
    alertElement.innerHTML = message;
    inputElement.parentNode.insertBefore(alertElement, inputElement);
}

function clearAlerts() {
    var alertElements = document.querySelectorAll('.alert');
    alertElements.forEach(function (element) {
        element.parentNode.removeChild(element);
    });
}

function isValidEmail() {
    var email = document.getElementById('email').value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword() {
    var password = document.getElementById('password').value;
    return password.length >= 8;
}

function attachInputListeners() {
    var inputElements = document.querySelectorAll('input');
    inputElements.forEach(function (input) {
        input.addEventListener('input', function () {
            clearAlerts();
        });
    });
}
