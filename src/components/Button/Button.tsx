import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 h-10 px-4 text-sm font-medium transition-colors duration-150 ease-out select-none cursor-pointer rounded-control disabled:opacity-50 disabled:cursor-not-allowed',
        // Primary: 40px tall, --marine fill, white text, hover --marine-deep
        variant === 'primary' &&
          'bg-marine text-white hover:bg-marine-deep active:bg-marine-deep border border-transparent',
        // Secondary: --surface fill, --line border, --ink text
        variant === 'secondary' &&
          'bg-surface border border-line text-ink hover:bg-canvas active:bg-canvas',
        // Ghost: transparent fill, subtle hover
        variant === 'ghost' &&
          'bg-transparent text-ink hover:bg-marine-tint/50 active:bg-marine-tint/70 border border-transparent',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
