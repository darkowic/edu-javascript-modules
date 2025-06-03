// CommonJS Module - User Validator
const userValidator = {
  validateEmail: function(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof email === 'string' && emailRegex.test(email);
  },
  
  validateName: function(name) {
    // Name should be a string with at least 2 characters
    return typeof name === 'string' && name.trim().length >= 2;
  },
  
  validateAge: function(age) {
    // Age should be a number between 0 and 120
    return typeof age === 'number' && age >= 0 && age <= 120;
  },
  
  validatePassword: function(password) {
    // Password should be at least 8 characters with at least one number
    return typeof password === 'string' && 
           password.length >= 8 && 
           /\d/.test(password);
  },
  
  name: "User Validator (CommonJS Module)"
};

// Export the validator functions
module.exports = userValidator;
