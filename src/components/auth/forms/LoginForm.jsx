/**
 * LoginForm Component
 * 
 * Clean, reusable login form with validation and error handling
 * Supports both reader and writer authentication
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.role - User role ('reader' or 'writer')
 * @param {Function} props.onError - Error handler
 * @param {Object} props.theme - Theme configuration
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { validateEmail, validatePassword } from '../authValidation';
import { getRedirectUrl } from '../authUtils';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import FormGroup from '../../ui/FormGroup';

const LoginForm = ({ role, onError, theme }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle input changes with real-time validation
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear form-level error
    if (onError) onError('');
  };

  /**
   * Validate form fields
   * @returns {boolean} Whether form is valid
   */
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.message;
    }

    // Password validation
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await login({
        ...formData,
        role
      });

      if (result.success) {
        // Redirect based on user role
        const redirectUrl = getRedirectUrl(role);
        navigate(redirectUrl);
      } else {
        if (onError) onError(result.error);
      }
    } catch (error) {
      if (onError) onError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle forgot password
   */
  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
    console.log('Forgot password clicked');
    if (onError) onError('Forgot password feature coming soon!');
  };

  // Form animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Email Field */}
      <motion.div variants={itemVariants}>
        <FormGroup 
          label="Email Address" 
          error={errors.email}
          required
        >
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="pl-10 py-3"
              hasError={!!errors.email}
              autoComplete="email"
              required
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          </div>
        </FormGroup>
      </motion.div>

      {/* Password Field */}
      <motion.div variants={itemVariants}>
        <FormGroup 
          label="Password" 
          error={errors.password}
          required
        >
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="pl-10 pr-10 py-3"
              hasError={!!errors.password}
              autoComplete="current-password"
              required
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </FormGroup>
      </motion.div>

      {/* Forgot Password Link */}
      <motion.div variants={itemVariants} className="flex justify-end">
        <button
          type="button"
          onClick={handleForgotPassword}
          className={`text-sm ${theme.text} hover:underline transition-colors`}
        >
          Forgot your password?
        </button>
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={itemVariants}>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className={`
            w-full bg-gradient-to-r ${theme.gradient} 
            hover:shadow-lg transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
              />
              Signing in...
            </>
          ) : (
            `Sign in as ${role}`
          )}
        </Button>
      </motion.div>

      {/* Demo Credentials (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <motion.div 
          variants={itemVariants}
          className="mt-4 p-3 bg-gray-50 rounded-lg border"
        >
          <p className="text-xs text-gray-600 mb-2 font-medium">Demo Credentials:</p>
          <div className="text-xs text-gray-500 space-y-1">
            <p>Email: demo@versenest.com</p>
            <p>Password: Demo123!</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setFormData({
                email: 'demo@versenest.com',
                password: 'Demo123!'
              });
            }}
            className="mt-2 text-xs"
          >
            Fill Demo Data
          </Button>
        </motion.div>
      )}
    </motion.form>
  );
};

export default LoginForm;
