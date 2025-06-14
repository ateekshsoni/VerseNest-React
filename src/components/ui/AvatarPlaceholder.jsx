/**
 * AvatarPlaceholder Component
 * 
 * Creates a simple colored avatar with initials
 * Avoids external requests for placeholder images
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - Name to generate initials from
 * @param {string} props.size - Size class (w-10 h-10, w-12 h-12, etc.)
 * @param {string} props.className - Additional CSS classes
 */

import React from 'react';

const AvatarPlaceholder = ({ 
  name, 
  size = "w-12 h-12", 
  className = "",
  ...props 
}) => {
  // Generate initials from name
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Generate a consistent color based on name
  const colors = [
    'bg-amber-400 text-amber-900',
    'bg-orange-400 text-orange-900',
    'bg-yellow-400 text-yellow-900',
    'bg-lime-400 text-lime-900',
    'bg-emerald-400 text-emerald-900',
    'bg-teal-400 text-teal-900',
    'bg-cyan-400 text-cyan-900',
    'bg-blue-400 text-blue-900',
    'bg-indigo-400 text-indigo-900',
    'bg-purple-400 text-purple-900',
    'bg-pink-400 text-pink-900',
    'bg-rose-400 text-rose-900',
  ];

  const colorIndex = name.charCodeAt(0) % colors.length;
  const colorClass = colors[colorIndex];

  return (
    <div
      className={`
        ${size} rounded-full flex items-center justify-center
        font-semibold text-sm ${colorClass} ${className}
      `}
      {...props}
    >
      {initials}
    </div>
  );
};

export default AvatarPlaceholder;
