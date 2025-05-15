import React from 'react';

const CheckboxGroup = ({
  options = [],
  selectedValues = [],
  onChange,
  name,
  orientation = 'vertical',
  disabled = false,
  className = '',
}) => {
  const handleCheckboxChange = (value) => {
    let newSelection;
    
    if (selectedValues.includes(value)) {
      // If already selected, remove from selection
      newSelection = selectedValues.filter(item => item !== value);
    } else {
      // If not selected, add to selection
      newSelection = [...selectedValues, value];
    }
    
    onChange(newSelection);
  };

  return (
    <div 
      className={`
        ${orientation === 'horizontal' ? 'flex flex-wrap gap-4' : 'space-y-2'}
        ${className}
      `}
    >
      {options.map((option) => (
        <div 
          key={option.value} 
          className="flex items-start"
        >
          <div className="flex items-center h-5">
            <input
              id={`${name}-${option.value}`}
              type="checkbox"
              name={name}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
              disabled={disabled}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label 
              htmlFor={`${name}-${option.value}`} 
              className={`font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}
            >
              {option.label}
            </label>
            {option.description && (
              <p className={`${disabled ? 'text-gray-400' : 'text-gray-500'}`}>
                {option.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;