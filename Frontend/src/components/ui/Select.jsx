import React from 'react';

const Select = ({
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  hasError = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseSelectStyles = `
    block w-full rounded-md shadow-sm
    ${hasError
      ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
    ${className}
  `;

  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={baseSelectStyles}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;