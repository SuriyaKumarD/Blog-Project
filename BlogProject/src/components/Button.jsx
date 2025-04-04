import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-6 py-2 duration-200 rounded-full ${type} ${bgColor} ${textColor}${className} ${props}`}
    >
      {children}
    </button>
  );
}

export default Button;
