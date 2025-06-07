import React from "react";
import { UtilityButtonProps } from "./types";

const UtilityButton: React.FC<UtilityButtonProps> = ({ 
  icon, 
  ariaLabel,
  onClick 
}) => {
  return (
    <button
      aria-label={ariaLabel}
      className="p-1 text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
      type="button"
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default UtilityButton;