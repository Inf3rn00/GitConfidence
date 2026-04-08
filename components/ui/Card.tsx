import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  noPadding = false
}) => {
  return (
    <div 
      className={`
        bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-none transition-colors
        ${className}
      `}
    >
      <div className={`${noPadding ? '' : 'p-6'}`}>
        {children}
      </div>
    </div>
  );
};