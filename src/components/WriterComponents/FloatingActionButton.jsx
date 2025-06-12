import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFeatherPointed } from '@fortawesome/free-solid-svg-icons';

/**
 * Floating action button for creating new posts
 * @param {function} onClick - Click handler for the button
 * @param {string} label - Accessibility label
 * @param {string} icon - FontAwesome icon to display
 */
const FloatingActionButton = ({ 
  onClick,
  label = "Create new poem",
  Faicon = faFeatherPointed
}) => {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-8 right-8 w-15 h-15 rounded-full z-50
        bg-gradient-to-br from-[#a0522d] to-[#8b4513] text-white
        flex items-center justify-center text-2xl
        shadow-[0_5px_20px_rgba(160,82,45,0.5)]
        transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
        hover:translate-y-[-5px] hover:rotate-[15deg] hover:shadow-[0_8px_25px_rgba(160,82,45,0.6)]
        focus:outline-none focus:ring-4 focus:ring-[#a0522d]/30
        group
      "
      aria-label={label}
      title={label}
    >
      <FontAwesomeIcon 
        icon={Faicon}
        className="transition-transform duration-300 group-hover:scale-110" 
      />
    </button>
  );
};

export default FloatingActionButton;
