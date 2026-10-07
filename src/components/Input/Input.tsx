import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {/* Label always visible above field */}
        <label htmlFor={id} className="text-xs font-medium text-slate">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className={cn(
            'h-10 px-3 text-sm bg-surface text-ink border rounded-control transition-colors duration-150 ease-out placeholder:text-slate/60',
            error ? 'border-loss' : 'border-line hover:border-slate/50',
            'focus:outline-none focus:ring-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-marine focus-visible:outline-offset-2',
            className
          )}
          {...props}
        />
        {error ? (
          <span className="text-xs text-loss font-normal">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-slate font-normal">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
