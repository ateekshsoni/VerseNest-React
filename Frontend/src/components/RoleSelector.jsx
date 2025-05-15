import React from 'react';

/**
 * RoleSelector Component
 * Displays a role selection card with icon, title, description, and action button
 * 
 * @param {ReactNode} icon - Icon component to display
 * @param {string} title - Role title
 * @param {string} description - Brief description of the role
 * @param {string} buttonText - Text to display on the button
 * @param {Function} onSelect - Function to call when the role is selected
 */
const RoleSelector = ({ icon, title, description, buttonText, onSelect }) => {
  return (
    <div className="text-center p-5">
      {/* Icon container */}
      <div className="w-20 h-20 mx-auto mb-5 flex items-center justify-center rounded-full bg-black/5">
        {icon}
      </div>
      
      {/* Role title */}
      <h2 className="font-serif text-[#2c2417] text-2xl font-bold my-4">
        {title}
      </h2>
      
      {/* Role description */}
      <p className="italic mb-8 text-gray-600">
        {description}
      </p>
      
      {/* Role selection button */}
      <button 
        className="bg-transparent border-2 border-[#2c2417] text-[#2c2417] py-2.5 px-6 text-base rounded-full cursor-pointer transition-all duration-300 hover:bg-[#2c2417] hover:text-white"
        onClick={onSelect}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default RoleSelector;