/**
 * AuthBookLayout Component
 * 
 * Modern replacement for the old Book component
 * Features responsive design, better accessibility, and improved UX
 * 
 * @component
 * @param {Object} props - Component props
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './AuthProvider';
import RoleCard from './RoleCard';
import AuthForm from './AuthForm';
import { EyeIcon, QuillIcon } from '../ui/icons';

const AuthBookLayout = () => {
  const { activeRole, setActiveRole, activeTab } = useAuth();

  /**
   * Handle role selection
   * @param {string} role - Selected role ('reader' or 'writer')
   */
  const handleRoleSelect = (role) => {
    setActiveRole(role);
  };

  /**
   * Handle back to role selection
   */
  const handleBackToRoles = () => {
    setActiveRole(null);
  };

  // Animation variants for smooth transitions
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const pageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.3, ease: 'easeIn' }
    }
  };

  return (
    <motion.div 
      className="w-full max-w-6xl mx-auto px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[600px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          
          {/* Writer Side */}
          <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 p-8 lg:p-12 flex items-center justify-center border-r border-amber-100">
            {/* Background Pattern */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='1'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3Ccircle cx='33' cy='5' r='4'/%3E%3Ccircle cx='3' cy='23' r='4'/%3E%3Ccircle cx='53' cy='33' r='3'/%3E%3Ccircle cx='23' cy='43' r='2'/%3E%3Ccircle cx='43' cy='23' r='2'/%3E%3Ccircle cx='33' cy='43' r='4'/%3E%3Ccircle cx='53' cy='53' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
            
            <div className="relative z-10 w-full max-w-md">
              <AnimatePresence mode="wait">
                {activeRole !== 'writer' ? (
                  <motion.div
                    key="writer-role"
                    variants={pageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <RoleCard
                      icon={<QuillIcon className="w-10 h-10" />}
                      title="Writer"
                      description="I write to express my soul through verse"
                      buttonText="Join as Writer"
                      onSelect={() => handleRoleSelect('writer')}
                      isSelected={activeRole === 'writer'}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="writer-form"
                    variants={pageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <AuthForm 
                      role="writer" 
                      onBack={handleBackToRoles}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Reader Side */}
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-8 lg:p-12 flex items-center justify-center">
            {/* Background Pattern */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
            
            <div className="relative z-10 w-full max-w-md">
              <AnimatePresence mode="wait">
                {activeRole !== 'reader' ? (
                  <motion.div
                    key="reader-role"
                    variants={pageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <RoleCard
                      icon={<EyeIcon className="w-10 h-10" />}
                      title="Reader"
                      description="I read to feel the depths of human emotion"
                      buttonText="Join as Reader"
                      onSelect={() => handleRoleSelect('reader')}
                      isSelected={activeRole === 'reader'}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="reader-form"
                    variants={pageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <AuthForm 
                      role="reader" 
                      onBack={handleBackToRoles}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Decorative Center Divider */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg border-4 border-gray-100 z-20">
          <div className="w-full h-full bg-gradient-to-r from-amber-400 to-blue-400 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      {activeRole && (
        <motion.div 
          className="mt-6 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex space-x-2">
            <div className={`w-3 h-3 rounded-full ${activeRole ? 'bg-amber-400' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${activeTab ? 'bg-amber-400' : 'bg-gray-300'}`} />
            <div className="w-3 h-3 rounded-full bg-gray-300" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AuthBookLayout;
