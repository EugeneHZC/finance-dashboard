import React from 'react';
import {
  useOverviewSummaryQuery,
  useCashFlowHistoryQuery,
  useTransactionsQuery,
  useBudgetsQuery,
} from '../../api/hooks';
import { HeadlineFigure } from './HeadlineFigure';
import { CashFlowChart } from './CashFlowChart';
import { Skeleton, ChartSkeleton, TableSkeleton } from '../../components/Skeleton/Skeleton';
import { Button } from '../../components/Button/Button';
import { formatMoney } from '../../lib/money';
import { formatDate } from '../../lib/date';
import { StatusChip } from '../../components/StatusChip/StatusChip';
import { NavItemKey } from '../../components/NavigationRail/NavigationRail';
import { ArrowRight, AlertCircle } from 'lucide-react';

export interface OverviewPageProps {
  onNavigate: (tab: NavItemKey) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ onNavigate }) => {
  const {
    data: summary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
    refetch: refetchSummary,
  } = useOverviewSummaryQuery();

  const {
    data: cashFlow,
    isLoading: isCashFlowLoading,
    isError: isCashFlowError,
  } = useCashFlowHistoryQuery();

  const { data: transactions, isLoading: isTxLoading } = useTransactionsQuery();
  const { data: budgets, isLoading: isBudgetsLoading } = useBudgetsQuery();

  if (isSummaryError || isCashFlowError) {
    return (
      <div className="p-8 max-w-lg mx-auto text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-loss-tint flex items-center justify-center text-loss">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-semibold text-ink">Couldn't load overview</h2>
        <p className="text-sm text-slate">
          Couldn't load overview data. Check your connection and try again.
        </p>
        <Button variant="primary" onClick={() => refetchSummary()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] leading-[34px] font-semibold text-ink">
            Financial Position
          </h1>
          <p className="text-sm text-slate mt-1">
            Summary of accounts, transactions, and cash flow position.
          </p>
        </div>
        <Button variant="secondary" onClick={() => onNavigate('transactions')}>
          <span>View transactions</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* 1. Headline Figure */}
      {isSummaryLoading || !summary ? (
        <div className="bg-surface border border-line rounded-panel p-6 space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-64" />
        </div>
      ) : (
        <HeadlineFigure
          netWorthMinor={summary.netWorthMinor}
          previousNetWorthMinor={summary.previousNetWorthMinor}
          totalAssetsMinor={summary.totalAssetsMinor}
          totalLiabilitiesMinor={summary.totalLiabilitiesMinor}
        />
      )}

      {/* 2. Main Chart */}
      {isCashFlowLoading || !cashFlow ? (
        <div className="bg-surface border border-line rounded-panel p-6">
          <ChartSkeleton />
        </div>
      ) : (
        <CashFlowChart data={cashFlow} />
      )}

      {/* 3. Supporting Lists (Ledger style, not identical card grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions Preview */}
        <section className="bg-surface border border-line rounded-panel p-6">
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <h2 className="text-base font-semibold text-ink">Recent Transactions</h2>
            <button
              type="button"
              onClick={() => onNavigate('transactions')}
              className="text-xs text-marine hover:underline font-medium"
            >
              All transactions &rarr;
            </button>
          </div>
          {isTxLoading || !transactions ? (
            <TableSkeleton rows={4} />
          ) : (
            <div className="divide-y divide-line mt-2">
              {transactions.slice(0, 5).map((tx) => (
                <div key={tx.id} className="py-3 flex items-center justify-between gap-3 text-sm">
                  <div className="min-w-0">
                    <div className="font-medium text-ink truncate">{tx.description}</div>
                    <div className="text-xs text-slate flex items-center gap-2 mt-0.5">
                      <span>{formatDate(tx.date)}</span>
                      <span>•</span>
                      <span>{tx.category}</span>
                    </div>
                  </div>
                  <div
                    className={`font-medium tabular-nums shrink-0 ${
                      tx.amountMinor > 0 ? 'text-gain' : 'text-ink'
                    }`}
                  >
                    {formatMoney(tx.amountMinor, { showExplicitSign: true })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Budget Status Snapshot */}
        <section className="bg-surface border border-line rounded-panel p-6">
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <h2 className="text-base font-semibold text-ink">Budget Pace</h2>
            <button
              type="button"
              onClick={() => onNavigate('budgets')}
              className="text-xs text-marine hover:underline font-medium"
            >
              Manage budgets &rarr;
            </button>
          </div>
          {isBudgetsLoading || !budgets ? (
            <TableSkeleton rows={4} />
          ) : (
            <div className="space-y-4 mt-4">
              {budgets.slice(0, 4).map((b) => {
                const percent = Math.min(100, Math.round((b.spentMinor / b.limitMinor) * 100));
                const isOver = b.spentMinor > b.limitMinor;
                return (
                  <div key={b.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-ink">{b.category}</span>
                      <div className="flex items-center gap-2 tabular-nums">
                        <span className="text-slate">
                          {formatMoney(b.spentMinor)} of {formatMoney(b.limitMinor)}
                        </span>
                        <StatusChip
                          status={isOver ? 'loss' : percent >= 90 ? 'warning' : 'gain'}
                          label={`${percent}%`}
                        />
                      </div>
                    </div>
                    {/* Progress Track */}
                    <div className="w-full h-2 bg-canvas rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isOver ? 'bg-loss' : percent >= 90 ? 'bg-saffron' : 'bg-marine'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
