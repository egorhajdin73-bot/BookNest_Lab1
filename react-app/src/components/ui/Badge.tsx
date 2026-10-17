import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'green' | 'red';
}

export const Badge: React.FC<BadgeProps> = ({ children, color = 'green' }) => {
  return (
    <span style={{ color: color === 'green' ? 'green' : 'red', fontWeight: 'bold' }}>
      {children}
    </span>
  );
};