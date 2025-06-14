/**
 * Authentication Validation Utilities
 * 
 * Reusable validation functions for authentication forms
 * Provides consistent validation across login and signup forms
 * 
 * @fileoverview Authentication validation utilities
 */

/**
 * Email validation regex pattern
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Password validation rules
 */
export const PASSWORD_RULES = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: false
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {Object} Validation result
 */
export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }
  
  if (!EMAIL_REGEX.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < PASSWORD_RULES.minLength) {
    return { 
      isValid: false, 
      message: `Password must be at least ${PASSWORD_RULES.minLength} characters long` 
    };
  }
  
  if (PASSWORD_RULES.requireUppercase && !/[A-Z]/.test(password)) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one uppercase letter' 
    };
  }
  
  if (PASSWORD_RULES.requireLowercase && !/[a-z]/.test(password)) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one lowercase letter' 
    };
  }
  
  if (PASSWORD_RULES.requireNumbers && !/\d/.test(password)) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one number' 
    };
  }
  
  if (PASSWORD_RULES.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one special character' 
    };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate password confirmation
 * @param {string} password - Original password
 * @param {string} confirmPassword - Confirmation password
 * @returns {Object} Validation result
 */
export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (!confirmPassword) {
    return { isValid: false, message: 'Please confirm your password' };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, message: 'Passwords do not match' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @param {string} fieldName - Name of the field for error message
 * @returns {Object} Validation result
 */
export const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === '') {
    return { 
      isValid: false, 
      message: `${fieldName} is required` 
    };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate name field
 * @param {string} name - Name to validate
 * @returns {Object} Validation result
 */
export const validateName = (name) => {
  const requiredCheck = validateRequired(name, 'Name');
  if (!requiredCheck.isValid) return requiredCheck;
  
  if (name.trim().length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters long' };
  }
  
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return { isValid: false, message: 'Name can only contain letters and spaces' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate pen name for writers
 * @param {string} penName - Pen name to validate
 * @returns {Object} Validation result
 */
export const validatePenName = (penName) => {
  const requiredCheck = validateRequired(penName, 'Pen name');
  if (!requiredCheck.isValid) return requiredCheck;
  
  if (penName.trim().length < 2) {
    return { isValid: false, message: 'Pen name must be at least 2 characters long' };
  }
  
  if (penName.trim().length > 50) {
    return { isValid: false, message: 'Pen name must be less than 50 characters' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate bio field
 * @param {string} bio - Bio to validate
 * @returns {Object} Validation result
 */
export const validateBio = (bio) => {
  if (bio && bio.length > 500) {
    return { isValid: false, message: 'Bio must be less than 500 characters' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate array selection (genres, preferences, etc.)
 * @param {Array} selection - Array to validate
 * @param {string} fieldName - Field name for error message
 * @param {number} minItems - Minimum required items
 * @returns {Object} Validation result
 */
export const validateSelection = (selection, fieldName, minItems = 1) => {
  if (!Array.isArray(selection) || selection.length < minItems) {
    return { 
      isValid: false, 
      message: `Please select at least ${minItems} ${fieldName.toLowerCase()}` 
    };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate entire form
 * @param {Object} formData - Form data to validate
 * @param {string} formType - Type of form ('login' or 'signup')
 * @param {string} userRole - User role ('reader' or 'writer')
 * @returns {Object} Validation result with errors object
 */
export const validateForm = (formData, formType, userRole) => {
  const errors = {};
  let isValid = true;
  
  // Common validations
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message;
    isValid = false;
  }
  
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
    isValid = false;
  }
  
  // Signup-specific validations
  if (formType === 'signup') {
    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid) {
      errors.name = nameValidation.message;
      isValid = false;
    }
    
    const confirmPasswordValidation = validatePasswordConfirmation(
      formData.password, 
      formData.confirmPassword
    );
    if (!confirmPasswordValidation.isValid) {
      errors.confirmPassword = confirmPasswordValidation.message;
      isValid = false;
    }
    
    // Writer-specific validations
    if (userRole === 'writer') {
      const penNameValidation = validatePenName(formData.penName);
      if (!penNameValidation.isValid) {
        errors.penName = penNameValidation.message;
        isValid = false;
      }
      
      const bioValidation = validateBio(formData.bio);
      if (!bioValidation.isValid) {
        errors.bio = bioValidation.message;
        isValid = false;
      }
      
      if (formData.genres && formData.genres.length === 0) {
        errors.genres = 'Please select at least one genre';
        isValid = false;
      }
    }
    
    // Reader-specific validations
    if (userRole === 'reader') {
      if (formData.preferredGenres && formData.preferredGenres.length === 0) {
        errors.preferredGenres = 'Please select at least one preferred genre';
        isValid = false;
      }
      
      if (formData.moodPreferences && formData.moodPreferences.length === 0) {
        errors.moodPreferences = 'Please select at least one mood preference';
        isValid = false;
      }
    }
  }
  
  return { isValid, errors };
};
