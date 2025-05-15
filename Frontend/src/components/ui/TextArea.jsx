import React from 'react';

const Textarea = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  hasError = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseTextareaStyles = `
    block w-full rounded-md shadow-sm
    ${hasError
      ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
    ${className}
  `;

  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className={baseTextareaStyles}
      {...props}
    />
  );
};

export default Textarea;