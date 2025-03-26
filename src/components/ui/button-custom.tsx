
import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const ButtonCustom = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "primary", 
    size = "md", 
    children, 
    fullWidth = false,
    icon,
    iconPosition = "left",
    ...props 
  }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-insura-neon focus:ring-opacity-50 shadow-sm hover:shadow-md transform hover:-translate-y-0.5";
    
    const variantStyles = {
      primary: "bg-insura-neon text-black hover:bg-insura-neon/90 shadow-insura-neon/20",
      secondary: "bg-insura-purple text-white border border-insura-purple hover:bg-insura-darkpurple",
      outline: "bg-transparent border border-insura-neon text-insura-neon hover:bg-insura-neon/10",
      ghost: "bg-transparent text-insura-neon hover:bg-insura-neon/10",
    };
    
    const sizeStyles = {
      sm: "text-sm px-3 py-1.5",
      md: "text-base px-5 py-2.5",
      lg: "text-lg px-6 py-3",
    };

    return (
      <button
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth ? "w-full" : "",
          className
        )}
        ref={ref}
        {...props}
      >
        {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
      </button>
    );
  }
);

ButtonCustom.displayName = "ButtonCustom";

export { ButtonCustom };
