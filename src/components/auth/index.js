/**
 * Authentication Pages and Components
 * 
 * Centralized authentication system with reusable components
 * Includes login, signup, and role selection functionality
 * 
 * Structure:
 * - AuthLayout: Main authentication page layout
 * - AuthForm: Generic form component for login/signup
 * - RoleCard: Individual role selection card
 * - AuthProvider: Context for authentication state
 * 
 * Backend Integration Points:
 * - API endpoints for login/signup/logout
 * - JWT token management
 * - User role and permissions handling
 * - Form validation and error handling
 * 
 * @fileoverview Authentication system index
 */

// Main Components
export { default as AuthLayout } from './AuthLayout';
export { default as AuthForm } from './AuthForm';
export { default as RoleCard } from './RoleCard';
export { default as AuthBookLayout } from './AuthBookLayout';

// Context and Hooks
export { default as AuthProvider } from './AuthProvider';
export { default as useAuth } from './useAuth';

// Form Components
export { default as LoginForm } from './forms/LoginForm';
export { default as SignupForm } from './forms/SignupForm';

// Utilities
export * from './authUtils';
export * from './authValidation';
