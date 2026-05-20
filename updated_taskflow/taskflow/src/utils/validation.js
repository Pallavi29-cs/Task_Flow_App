/* utils/validation.js
   All form validation functions used across the app */

/**
 * Validate login form fields
 * @param {Object} fields - { name, email, password }
 * @returns {Object} errors map
 */
export function validateLogin({ name, email, password }) {
  const errors = {};

  // Name: required, min 2 chars
  if (!name.trim()) {
    errors.name = 'Full name is required.';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  // Email: required, valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  // Password: min 6 chars, 1 uppercase, 1 number
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  } else if (!hasUppercase) {
    errors.password = 'Password must contain at least one uppercase letter.';
  } else if (!hasNumber) {
    errors.password = 'Password must contain at least one number.';
  }

  return errors;
}

/**
 * Validate add/edit task form
 * @param {Object} fields - { task, assignedTo }
 * @returns {Object} errors map
 */
export function validateTask({ task, assignedTo }) {
  const errors = {};

  if (!task.trim()) {
    errors.task = 'Task name cannot be empty.';
  } else if (task.trim().length < 3) {
    errors.task = 'Task name must be at least 3 characters.';
  }

  if (!assignedTo.trim()) {
    errors.assignedTo = 'Please assign this task to someone.';
  }

  return errors;
}
