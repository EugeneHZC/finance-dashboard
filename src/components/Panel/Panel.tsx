import React from 'react';
import { cn } from '../../lib/utils';

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Panel: React.FC<PanelProps> = ({
  children,
  header,
  footer,
  className,
  ...props
}) => {
  return (
    <section
      className={cn(
        'bg-surface border border-line rounded-panel transition-colors duration-150 ease-out overflow-hidden',
        className
      )}
      {...props}
    >
      {header && (
        <div className="px-6 py-4 border-b border-line flex items-center justify-between">
          {header}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-3 border-t border-line bg-canvas/40 flex items-center justify-between">
          {footer}
        </div>
      )}
    </section>
  );
};
