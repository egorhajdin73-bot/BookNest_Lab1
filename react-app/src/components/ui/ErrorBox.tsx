import React from 'react';
import { Button } from './Button';

interface ErrorBoxProps {
  message: string;
  onRetry: () => void;
}

export const ErrorBox: React.FC<ErrorBoxProps> = ({ message, onRetry }) => {
  return (
    <div className="state-box">
      <p style={{ color: 'red', fontWeight: 'bold' }}>{message}</p>
      <Button onClick={onRetry}>Повторить</Button>
    </div>
  );
};