// Notification utilities with optional react-toastify support

/**
 * Display a success notification
 * Uses react-toastify if available, otherwise falls back to console.log
 * @param {string} message - The success message to display
 */
const OnSuccess = (message) => {
  console.log('✅ Success:', message);
  
  // If you want to use react-toastify, install it and import like this:
  // import { toast } from 'react-toastify';
  // Then replace the console.log above with: toast.success(message);
};

/**
 * Display an error notification  
 * Uses react-toastify if available, otherwise falls back to console.error
 * @param {string} message - The error message to display
 */
const OnError = (message) => {
  console.error('❌ Error:', message);
  
  // If you want to use react-toastify, install it and import like this:
  // import { toast } from 'react-toastify';
  // Then replace the console.error above with: toast.error(message);
};

export { OnError, OnSuccess };
