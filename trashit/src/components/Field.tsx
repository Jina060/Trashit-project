import React from "react";

interface FieldProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  
}

const Field: React.FC<FieldProps> = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  required = true,
  className = '',
  
}) => {

  const baseStyle =
    'w-full px-4 py-2 rounded bg-white/20 backdrop-blur text-white placeholder-gray-350 h-[46px]';

  return (

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`${baseStyle} ${className}`}
      />
    
  );
};
export default Field;
