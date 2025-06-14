/**
 * RoleCard Component
 * 
 * Reusable card component for role selection (Reader/Writer)
 * Features hover effects, accessible design, and consistent styling
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactElement} props.icon - Role icon component
 * @param {string} props.title - Role title
 * @param {string} props.description - Role description
 * @param {string} props.buttonText - Button text
 * @param {Function} props.onSelect - Selection handler
 * @param {boolean} props.isSelected - Whether this role is selected
 * @param {boolean} props.disabled - Whether the card is disabled
 */

import React from 'react';
import { Button } from '../ui/button';

const RoleCard = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  onSelect, 
  isSelected = false,
  disabled = false,
  className = ''
}) => {
  return (
    <div 
      className={`
        text-center p-8 rounded-lg transition-all duration-300 
        ${isSelected 
          ? 'bg-amber-50 border-2 border-amber-300 shadow-lg' 
          : 'bg-white border-2 border-gray-200 hover:border-amber-200 hover:shadow-md'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onClick={!disabled ? onSelect : undefined}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelect();
        }
      }}
      aria-pressed={isSelected}
      aria-disabled={disabled}
    >
      {/* Icon Container */}
      <div className={`
        w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full 
        transition-colors duration-300
        ${isSelected 
          ? 'bg-amber-100 text-amber-700' 
          : 'bg-gray-100 text-gray-600 group-hover:bg-amber-50 group-hover:text-amber-600'
        }
      `}>
        {icon}
      </div>

      {/* Title */}
      <h2 className={`
        text-2xl font-bold mb-3 transition-colors duration-300
        ${isSelected ? 'text-amber-900' : 'text-gray-900'}
      `}>
        {title}
      </h2>

      {/* Description */}
      <p className={`
        italic mb-8 text-base leading-relaxed transition-colors duration-300
        ${isSelected ? 'text-amber-700' : 'text-gray-600'}
      `}>
        {description}
      </p>

      {/* Action Button */}
      <Button
        variant={isSelected ? 'default' : 'outline'}
        size="lg"
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) onSelect();
        }}
        disabled={disabled}
        className={`
          transition-all duration-300 min-w-[160px]
          ${isSelected 
            ? 'bg-amber-600 hover:bg-amber-700 text-white border-amber-600' 
            : 'border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white'
          }
        `}
        aria-label={`Select ${title.toLowerCase()} role`}
      >
        {buttonText}
      </Button>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="mt-4 flex items-center justify-center text-amber-600">
          <svg 
            className="w-5 h-5 mr-2" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
          <span className="text-sm font-medium">Selected</span>
        </div>
      )}
    </div>
  );
};

export default RoleCard;
