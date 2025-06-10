import React from "react";

const FormGroup = ({ label, children, error, helpText, className = "" }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {children}

      {helpText && !error && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormGroup;
