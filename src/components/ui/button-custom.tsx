
import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cyber" | "cyber-outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  glow?: boolean;
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
    glow = false,
    ...props 
  }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-insura-blue/40 shadow-sm hover:shadow-md transform hover:-translate-y-0.5";
    
    const variantStyles = {
      primary: "bg-insura-blue text-white hover:bg-insura-darkblue",
      secondary: "bg-white text-insura-blue border border-insura-blue hover:bg-insura-lightblue",
      outline: "bg-transparent border border-insura-blue text-insura-blue hover:bg-insura-lightblue",
      ghost: "bg-transparent text-insura-blue hover:bg-insura-lightblue/20",
      cyber: "bg-gradient-to-r from-insura-neon to-insura-purple text-white hover:shadow-lg hover:shadow-insura-purple/20",
      "cyber-outline": "bg-transparent text-insura-neon border border-insura-neon hover:bg-insura-neon/10 hover:shadow-md hover:shadow-insura-neon/10",
    };
    
    const sizeStyles = {
      sm: "text-sm px-3 py-1.5",
      md: "text-base px-5 py-2.5",
      lg: "text-lg px-6 py-3",
    };

    const glowEffect = glow ? "after:absolute after:inset-0 after:bg-gradient-to-r after:from-insura-neon/0 after:via-insura-neon/20 after:to-insura-purple/0 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500 overflow-hidden relative" : "";

    return (
      <button
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth ? "w-full" : "",
          glowEffect,
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
