/**
 * AvatarPlaceholder Component
 * 
 * Generates colored avatar placeholders without external requests
 * Used when no avatar image is available or when images fail to load
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - Name to generate initials from
 * @param {number} props.size - Size of the avatar (default: 40)
 * @param {string} props.className - Additional CSS classes
 */

import React from 'react';

const AvatarPlaceholder = ({ 
  name = 'Unknown', 
  size = 40, 
  className = '' 
}) => {
  // Generate initials from name
  const getInitials = (fullName) => {
    return fullName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate consistent color based on name
  const getColor = (fullName) => {
    let hash = 0;
    for (let i = 0; i < fullName.length; i++) {
      hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const colors = [
      'bg-amber-400 text-amber-900',
      'bg-orange-400 text-orange-900',
      'bg-rose-400 text-rose-900',
      'bg-pink-400 text-pink-900',
      'bg-purple-400 text-purple-900',
      'bg-indigo-400 text-indigo-900',
      'bg-blue-400 text-blue-900',
      'bg-cyan-400 text-cyan-900',
      'bg-teal-400 text-teal-900',
      'bg-emerald-400 text-emerald-900',
      'bg-green-400 text-green-900',
      'bg-lime-400 text-lime-900',
    ];
    
    return colors[Math.abs(hash) % colors.length];
  };

  const initials = getInitials(name);
  const colorClass = getColor(name);

  return (
    <div
      className={`
        ${colorClass}
        flex items-center justify-center
        rounded-full font-bold text-center
        ${className}
      `}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size * 0.4}px`,
      }}
      aria-label={`Avatar for ${name}`}
    >
      {initials}
    </div>
  );
};

export default AvatarPlaceholder;
