import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-trashBlue text-trashGreen px-3 py-3 rounded-lg mt-4 text-center hover:bg-trashGreen hover:text-trashBlue w-[180px] h-[45px] ${className}`}
    >
      {children}
    </button>
  );
};
export default Button;
