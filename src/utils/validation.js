export function validateLogin({ name, email, password }) {
  const errors = {};

  
  if (!name || !name.trim()) {
    errors.name = 'Full name is required.';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  
  if (!email || !email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  
  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  } else if (!/[A-Z]/.test(password)) {
    errors.password = 'Password must contain at least one uppercase letter.';
  } else if (!/[0-9]/.test(password)) {
    errors.password = 'Password must contain at least one number.';
  }

  return errors;
}


export function validateTask({ task, assignedTo }) {
  const errors = {};

  
  if (!task || !task.trim()) {
    errors.task = 'Task name is required.';
  } else if (task.trim().length < 3) {
    errors.task = 'Task name must be at least 3 characters.';
  }

  
  if (!assignedTo || !assignedTo.trim()) {
    errors.assignedTo = 'Please assign this task to someone.';
  }

  return errors;
}