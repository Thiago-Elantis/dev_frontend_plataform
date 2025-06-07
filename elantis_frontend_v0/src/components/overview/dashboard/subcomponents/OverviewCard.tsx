import React, { memo } from "react";
import { CardProps } from "./types";

export const Card = memo(function Card({
  title,
  value,
  change,
  icon,
  color,
}: CardProps) {
  const isPositive = change?.includes("+");
  const isNegative = change?.includes("-");

  

  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            {title}
          </h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${color} p-2 rounded-lg`}>{icon}</div>
      </div>

      {change && (
        <div className="flex items-center mt-4">
          <span
            className={`text-sm font-medium ${
              isPositive
                ? "text-green-600"
                : isNegative
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {change}
          </span>
          <span className="ml-2 text-xs text-muted-foreground">
            vs. último mês
          </span>
        </div>
      )}
    </div>
  );
});
