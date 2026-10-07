import React from 'react';
import { formatMoney } from '../../lib/money';
import { ChangeIndicator } from '../../components/ChangeIndicator/ChangeIndicator';

export interface HeadlineFigureProps {
  netWorthMinor: number;
  previousNetWorthMinor: number;
  totalAssetsMinor: number;
  totalLiabilitiesMinor: number;
}

export const HeadlineFigure: React.FC<HeadlineFigureProps> = ({
  netWorthMinor,
  previousNetWorthMinor,
  totalAssetsMinor,
  totalLiabilitiesMinor,
}) => {
  return (
    <div className="bg-surface border border-line rounded-panel p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-wider text-slate">
            Total Net Worth
          </span>
          <div className="flex flex-wrap items-baseline gap-3 mt-1">
            {/* Headline figure: 40 / 44, weight 500 */}
            <span className="text-[40px] leading-[44px] font-medium text-ink tabular-nums">
              {formatMoney(netWorthMinor)}
            </span>
            <div className="flex items-center gap-1.5">
              <ChangeIndicator
                currentMinor={netWorthMinor}
                previousMinor={previousNetWorthMinor}
              />
              <span className="text-xs text-slate">vs last month</span>
            </div>
          </div>
        </div>

        {/* Ledger Breakdown: Assets vs Liabilities without identical card grid */}
        <div className="flex items-center gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-line">
          <div>
            <div className="text-xs text-slate">Assets</div>
            <div className="text-base font-semibold text-ink tabular-nums mt-0.5">
              {formatMoney(totalAssetsMinor)}
            </div>
          </div>
          <div className="w-px h-8 bg-line" aria-hidden="true" />
          <div>
            <div className="text-xs text-slate">Liabilities</div>
            <div className="text-base font-semibold text-loss tabular-nums mt-0.5">
              {formatMoney(Math.abs(totalLiabilitiesMinor))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
