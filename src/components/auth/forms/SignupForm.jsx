/**
 * SignupForm Component
 * 
 * Comprehensive signup form with role-specific fields
 * Features validation, accessibility, and smooth UX
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.role - User role ('reader' or 'writer')
 * @param {Function} props.onError - Error handler
 * @param {Object} props.theme - Theme configuration
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Edit3, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { validateForm } from '../authValidation';
import { getRedirectUrl, GENRE_OPTIONS, MOOD_OPTIONS } from '../authUtils';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import FormGroup from '../../ui/FormGroup';
import CheckboxGroup from '../../ui/CheckboxGroup';

const SignupForm = ({ role, onError, theme }) => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Writer-specific fields
    ...(role === 'writer' && {
      penName: '',
      bio: '',
      genres: []
    }),
    // Reader-specific fields
    ...(role === 'reader' && {
      preferredGenres: [],
      moodPreferences: []
    })
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle input changes
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

    if (onError) onError('');
  };

  /**
   * Handle checkbox group changes (genres, preferences)
   * @param {string} fieldName - Field name
   * @param {Array} selectedValues - Selected values
   */
  const handleCheckboxChange = (fieldName, selectedValues) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: selectedValues
    }));

    // Clear error
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateForm(formData, 'signup', role);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await signup(formData);

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
      {/* Name Field */}
      <motion.div variants={itemVariants}>
        <FormGroup 
          label="Full Name" 
          error={errors.name}
          required
        >
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="pl-10 py-3"
              hasError={!!errors.name}
              autoComplete="name"
              required
            />
          </div>
        </FormGroup>
      </motion.div>

      {/* Writer-specific: Pen Name */}
      {role === 'writer' && (
        <motion.div variants={itemVariants}>
          <FormGroup 
            label="Pen Name" 
            error={errors.penName}
            required
          >
            <div className="relative">
              <Edit3 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                name="penName"
                value={formData.penName}
                onChange={handleChange}
                placeholder="Your pen name"
                className="pl-10 py-3"
                hasError={!!errors.penName}
                required
              />
            </div>
          </FormGroup>
        </motion.div>
      )}

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
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </FormGroup>
      </motion.div>

      {/* Confirm Password Field */}
      <motion.div variants={itemVariants}>
        <FormGroup 
          label="Confirm Password" 
          error={errors.confirmPassword}
          required
        >
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="pl-10 pr-10 py-3"
              hasError={!!errors.confirmPassword}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </FormGroup>
      </motion.div>

      {/* Writer-specific: Bio */}
      {role === 'writer' && (
        <motion.div variants={itemVariants}>
          <FormGroup 
            label="Bio (Optional)" 
            error={errors.bio}
          >
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself and your writing style..."
              className="py-3 resize-none"
              rows={3}
              maxLength={500}
              hasError={!!errors.bio}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {formData.bio.length}/500 characters
            </div>
          </FormGroup>
        </motion.div>
      )}

      {/* Writer-specific: Genres */}
      {role === 'writer' && (
        <motion.div variants={itemVariants}>
          <FormGroup 
            label="Writing Genres" 
            error={errors.genres}
            required
          >
            <CheckboxGroup
              options={GENRE_OPTIONS}
              selectedValues={formData.genres}
              onChange={(values) => handleCheckboxChange('genres', values)}
              hasError={!!errors.genres}
              maxSelect={5}
            />
          </FormGroup>
        </motion.div>
      )}

      {/* Reader-specific: Preferred Genres */}
      {role === 'reader' && (
        <motion.div variants={itemVariants}>
          <FormGroup 
            label="Preferred Genres" 
            error={errors.preferredGenres}
            required
          >
            <CheckboxGroup
              options={GENRE_OPTIONS}
              selectedValues={formData.preferredGenres}
              onChange={(values) => handleCheckboxChange('preferredGenres', values)}
              hasError={!!errors.preferredGenres}
              maxSelect={5}
            />
          </FormGroup>
        </motion.div>
      )}

      {/* Reader-specific: Mood Preferences */}
      {role === 'reader' && (
        <motion.div variants={itemVariants}>
          <FormGroup 
            label="Mood Preferences" 
            error={errors.moodPreferences}
            required
          >
            <CheckboxGroup
              options={MOOD_OPTIONS}
              selectedValues={formData.moodPreferences}
              onChange={(values) => handleCheckboxChange('moodPreferences', values)}
              hasError={!!errors.moodPreferences}
              maxSelect={4}
            />
          </FormGroup>
        </motion.div>
      )}

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
              Creating account...
            </>
          ) : (
            <>
              <Heart className="w-4 h-4 mr-2" />
              Join as {role}
            </>
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default SignupForm;
