import React from 'react';
import { ArrowUpRight, ArrowDownRight, AlertTriangle, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';

export type StatusType = 'gain' | 'loss' | 'warning' | 'neutral';

export interface StatusChipProps {
  status: StatusType;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({
  status,
  label,
  icon,
  className,
}) => {
  // Default icons ensuring text is paired with an icon (never color alone)
  const defaultIcon = (() => {
    switch (status) {
      case 'gain':
        return <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'loss':
        return <ArrowDownRight className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'warning':
        return <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'neutral':
        return <Minus className="w-3.5 h-3.5" aria-hidden="true" />;
    }
  })();

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full select-none',
        status === 'gain' && 'bg-gain-tint text-gain',
        status === 'loss' && 'bg-loss-tint text-loss',
        status === 'warning' && 'bg-saffron-tint text-[#8A5A00]',
        status === 'neutral' && 'bg-canvas text-slate border border-line',
        className
      )}
    >
      {icon ?? defaultIcon}
      <span>{label}</span>
    </span>
  );
};
