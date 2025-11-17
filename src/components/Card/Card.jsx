import React from "react";

const VARIANT_CLASSES = {
  default: 'bg-white text-gray-800',
  success: 'bg-green-50 text-green-800',
  danger: 'bg-red-50 text-red-800',
  accent: 'bg-indigo-50 text-indigo-800',
};

const Card = ({ title, value, subtitle, icon, variant = 'default', className = '' }) => {
  const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.default;

  return (
    <div className={`p-5 rounded-xl shadow-sm ${variantClass} ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">{title}</h4>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold">{value}</span>
            {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
          </div>
        </div>

        {icon && <div className="w-11 h-11 flex items-center justify-center rounded-full bg-white/60">{icon}</div>}
      </div>
    </div>
  );
};

export default Card;
