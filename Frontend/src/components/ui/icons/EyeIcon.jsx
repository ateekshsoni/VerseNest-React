import React from "react";
import PropTypes from "prop-types";

const EyeIcon = ({
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
      className={`eye-icon ${className}`}
      {...props}
    >
      {/* Eye SVG paths */}
      <path d="M12 5.25c-4.5 0-8.25 5.25-8.25 6.75S7.5 18.75 12 18.75s8.25-5.25 8.25-6.75S16.5 5.25 12 5.25z"></path>
      <circle cx="12" cy="12" r="3"></circle>

      {/* Optional: Small light reflection in the eye */}
      <circle
        cx="10.5"
        cy="10.5"
        r="1"
        fill={color}
        fillOpacity="0.5"
        stroke="none"
      ></circle>
    </svg>
  );
};

EyeIcon.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  className: PropTypes.string,
  strokeWidth: PropTypes.number,
};

export default EyeIcon;
