import React from 'react';
import PropTypes from 'prop-types';

const QuillIcon = ({ 
  size = 24, 
  color = "currentColor", 
  className = "", 
  strokeWidth = 1.5, 
  ...props 
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`quill-icon ${className}`}
      {...props}
    >
      {/* Quill pen SVG path */}
      <path d="M20 2c-1.5 1-2 3.7-2 6.5 0 4.5-2.3 9.5-4 9.5-.7 0-1.5-.5-2-3-.5-2.5-1-3-2.5-3s-2 .5-2.5 3c-.3 1.5-.7 2.3-1.2 2.75"></path>
      <path d="M8.5 17c-1 2-2 3-3 3-1.5 0-3.8-4.5-3.8-9.5C1.7 5.7 2 2 3.5 2c2 0 3.5 4 8.5 4 1 0 2 0 3-1"></path>
      <path d="M20 2c-1 1-4 2-5 2-.5 0-1-.2-1-.6 0-.4.5-.6 1-.8.8-.3 2.7-1.5 3.8-2.6"></path>
      <path d="M10 22l-5-6"></path>
      <path d="M9.5 20.5l1 1.5"></path>
    </svg>
  );
};

QuillIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  className: PropTypes.string,
  strokeWidth: PropTypes.number,
};

export default QuillIcon;