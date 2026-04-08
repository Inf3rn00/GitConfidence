import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-mono font-medium tracking-tight transition-all duration-75 rounded-none disabled:opacity-30 disabled:cursor-not-allowed uppercase text-[11px]";
  
  const variants = {
    primary: "bg-black text-white dark:bg-white dark:text-black hover:opacity-90 active:bg-accent active:text-white",
    secondary: "bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700",
    ghost: "bg-transparent text-zinc-500 hover:text-black dark:hover:text-white",
    outline: "bg-transparent border border-current hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  const sizes = {
    sm: "h-8 px-3",
    md: "h-10 px-6",
    lg: "h-12 px-8",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};