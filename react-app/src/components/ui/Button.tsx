import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  const btnClass = variant === 'secondary' ? 'btn btn--secondary' : 'btn';
  return (
    <button className={`${btnClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
};