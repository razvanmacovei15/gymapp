// Card.jsx
import React from "react";
import PropTypes from "prop-types";

// Card component
export function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-white shadow-md rounded-lg p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// CardHeader component
export function CardHeader({ children, className = "", ...props }) {
  return (
    <div className={`mb-4 border-b pb-2 ${className}`} {...props}>
      {children}
    </div>
  );
}

// CardTitle component
export function CardTitle({ children, className = "", ...props }) {
  return (
    <h2 className={`text-lg font-bold ${className}`} {...props}>
      {children}
    </h2>
  );
}

// CardContent component
export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`flex flex-col ${className}`} {...props}>
      {children}
    </div>
  );
}

// Prop types for validation (optional)
Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
