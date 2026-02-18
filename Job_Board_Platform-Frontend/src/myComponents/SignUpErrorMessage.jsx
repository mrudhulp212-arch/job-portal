// ErrorMessage.js
import React from 'react';

const ErrorMessage = ({ error, fieldName }) => {
  if (!error) return null;

  let message = '';
  switch (fieldName) {
    case 'name':
      message = 'Name is required';
      break;
    case 'profession':
      message = 'Profession is required';
      break;
    case 'experienced':
      message = 'Experience is required';
      break;
    case 'bio':
      message = 'Bio is required';
      break;
    case 'email':
      message = error.type === 'pattern' ? 'Invalid email address' : 'Email is required';
      break;
    case 'password':
      message = error.type === 'pattern' ? "Password must be at least 8 characters, with at least one uppercase letter, one lowercase letter, and one number" : 'Password is required';
      break;
    case 'confirmPassword':
      message = error.message || 'Passwords do not match';
      break;
    case 'userType':
      message = 'Please select an option';
      break;
    default:
      message = 'This field is required';
  }

  return <span className="text-red-500 text-xs">{message}</span>;
};

export default ErrorMessage;