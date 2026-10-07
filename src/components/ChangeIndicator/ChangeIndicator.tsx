import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { formatMoney, computePercentChange, TRUE_MINUS } from '../../lib/money';
import { cn } from '../../lib/utils';

export interface ChangeIndicatorProps {
  currentMinor: number;
  previousMinor: number;
  className?: string;
  showAmount?: boolean;
}

export const ChangeIndicator: React.FC<ChangeIndicatorProps> = ({
  currentMinor,
  previousMinor,
  className,
  showAmount = true,
}) => {
  const diffMinor = currentMinor - previousMinor;
  const pctResult = computePercentChange(currentMinor, previousMinor);

  if (diffMinor === 0) {
    return (
      <span className={cn('inline-flex items-center gap-1 text-sm font-medium text-slate', className)}>
        <Minus className="w-3.5 h-3.5" aria-hidden="true" />
        <span>$0.00 (0.0%)</span>
      </span>
    );
  }

  const isGain = diffMinor > 0;
  const formattedAmount = isGain
    ? `+${formatMoney(diffMinor)}`
    : `${TRUE_MINUS}${formatMoney(Math.abs(diffMinor))}`;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-sm font-medium tabular-nums',
        isGain ? 'text-gain' : 'text-loss',
        className
      )}
      aria-label={`${isGain ? 'Increased by' : 'Decreased by'} ${formatMoney(Math.abs(diffMinor))}, ${pctResult.formattedPercent}`}
    >
      {isGain ? (
        <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
      ) : (
        <ArrowDownRight className="w-4 h-4 shrink-0" aria-hidden="true" />
      )}
      <span>
        {showAmount ? `${formattedAmount} (${pctResult.formattedPercent})` : pctResult.formattedPercent}
      </span>
    </span>
  );
};
