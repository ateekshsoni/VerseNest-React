/**
 * AuthForm Component
 * 
 * Main authentication form component handling both login and signup
 * Features tab navigation, role-specific fields, and form validation
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.role - User role ('reader' or 'writer')
 * @param {Function} props.onBack - Back button handler
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { Button } from '../ui/button';
import TabGroup from '../ui/TabGroup';
import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';

const AuthForm = ({ role, onBack }) => {
  const { activeTab, setActiveTab, isLoading, error } = useAuth();
  const [localError, setLocalError] = useState('');

  /**
   * Handle tab change between login and signup
   * @param {string} tab - Active tab ('login' or 'signup')
   */
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setLocalError('');
  };

  /**
   * Handle back to role selection
   */
  const handleBack = () => {
    setLocalError('');
    onBack();
  };

  // Tab configuration
  const tabs = [
    { id: 'login', label: 'Sign In' },
    { id: 'signup', label: 'Create Account' }
  ];

  // Role-specific styling
  const roleTheme = {
    writer: {
      primary: 'amber',
      gradient: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-50',
      text: 'text-amber-900'
    },
    reader: {
      primary: 'blue',
      gradient: 'from-blue-500 to-indigo-500',
      bg: 'bg-blue-50',
      text: 'text-blue-900'
    }
  };

  const theme = roleTheme[role];

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className={`${theme.text} hover:${theme.bg} p-2`}
            aria-label="Back to role selection"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <h1 className={`text-2xl font-bold ${theme.text} capitalize`}>
            {role} {activeTab === 'login' ? 'Sign In' : 'Sign Up'}
          </h1>
          
          <div className="w-8" /> {/* Spacer for centering */}
        </div>
        
        <p className="text-gray-600 text-sm">
          {activeTab === 'login' 
            ? `Welcome back! Sign in to your ${role} account.`
            : `Join VerseNest as a ${role} and start your poetry journey.`
          }
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <TabGroup
          tabs={tabs}
          activeTab={activeTab}
          onChange={handleTabChange}
          variant={theme.primary}
        />
      </div>

      {/* Error Display */}
      {(error || localError) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <p className="text-red-700 text-sm">
            {error || localError}
          </p>
        </motion.div>
      )}

      {/* Form Content */}
      <motion.div
        key={`${role}-${activeTab}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {activeTab === 'login' ? (
          <LoginForm 
            role={role} 
            onError={setLocalError}
            theme={theme}
          />
        ) : (
          <SignupForm 
            role={role} 
            onError={setLocalError}
            theme={theme}
          />
        )}
      </motion.div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
          <div className="flex items-center space-x-2 text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">
              {activeTab === 'login' ? 'Signing in...' : 'Creating account...'}
            </span>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>
          By continuing, you agree to our{' '}
          <a href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
