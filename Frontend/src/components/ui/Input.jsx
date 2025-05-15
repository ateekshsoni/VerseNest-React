import React from 'react';

const Input = ({
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder,
  hasError = false,
  disabled = false,
  className = '',
  icon,
  iconPosition = 'left',
  ...props
}) => {
  const baseInputStyles = `
    block w-full rounded-md shadow-sm
    ${hasError
      ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
    ${icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : ''}
    ${className}
  `;

  return (
    <div className="relative rounded-md shadow-sm">
      {icon && iconPosition === 'left' && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={baseInputStyles}
        {...props}
      />
      
      {icon && iconPosition === 'right' && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
    </div>
  );
};

export default Input;