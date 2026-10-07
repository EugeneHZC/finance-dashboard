import React, { useState } from 'react';
import { useBudgetsQuery, useCreateBudgetMutation } from '../../api/hooks';
import { BudgetBarChart } from './BudgetBarChart';
import { Button } from '../../components/Button/Button';
import { StatusChip } from '../../components/StatusChip/StatusChip';
import { TableSkeleton } from '../../components/Skeleton/Skeleton';
import { formatMoney, sumMinorUnits } from '../../lib/money';
import { Plus, Check, AlertCircle, X } from 'lucide-react';
import { Input } from '../../components/Input/Input';

export const BudgetsPage: React.FC = () => {
  const { data: budgets, isLoading, isError, refetch } = useBudgetsQuery();
  const createBudgetMutation = useCreateBudgetMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newLimitDollars, setNewLimitDollars] = useState('');
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  // Reconciled totals
  const totalLimitMinor = budgets ? sumMinorUnits(budgets.map((b) => b.limitMinor)) : 0;
  const totalSpentMinor = budgets ? sumMinorUnits(budgets.map((b) => b.spentMinor)) : 0;
  const totalRemainingMinor = totalLimitMinor - totalSpentMinor;

  const handleSaveBudget = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedCategory = newCategory.trim();
    const dollars = parseFloat(newLimitDollars);
    if (!trimmedCategory || isNaN(dollars) || dollars <= 0) return;

    const limitMinor = Math.round(dollars * 100);

    try {
      await createBudgetMutation.mutateAsync({
        category: trimmedCategory,
        limitMinor,
        period: 'October 2026',
      });

      setIsModalOpen(false);
      setNewCategory('');
      setNewLimitDollars('');

      // Rule: "A button names its outcome: 'Save budget,' 'Export CSV.' The confirmation uses the same verb: 'Budget saved.'"
      setSavedStatus('Budget saved.');
      setTimeout(() => setSavedStatus(null), 3500);
    } catch {
      // In case of error
    }
  };

  if (isError) {
    return (
      <div className="p-8 max-w-lg mx-auto text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-loss-tint flex items-center justify-center text-loss">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-semibold text-ink">Couldn't load budgets</h2>
        <p className="text-sm text-slate">
          Couldn't load budgets. Check your connection and try again.
        </p>
        <Button variant="primary" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] leading-[34px] font-semibold text-ink">Budgets</h1>
          <p className="text-sm text-slate mt-1">
            Monthly target caps and spend pacing for October 2026.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {savedStatus && (
            <span className="inline-flex items-center gap-1.5 text-xs text-gain font-medium bg-gain-tint px-3 py-1.5 rounded-control">
              <Check className="w-3.5 h-3.5" />
              {savedStatus}
            </span>
          )}
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4" />
            <span>Create budget</span>
          </Button>
        </div>
      </div>

      {/* Reconciled Budget Pacing Ledger Banner */}
      <div className="bg-surface border border-line rounded-panel p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-line">
          <div>
            <div className="text-xs uppercase font-medium text-slate">Total Budgeted</div>
            <div className="text-2xl font-semibold text-ink tabular-nums mt-1">
              {formatMoney(totalLimitMinor)}
            </div>
          </div>
          <div className="pt-4 sm:pt-0 sm:pl-6">
            <div className="text-xs uppercase font-medium text-slate">Total Spent</div>
            <div className="text-2xl font-semibold text-marine tabular-nums mt-1">
              {formatMoney(totalSpentMinor)}
            </div>
          </div>
          <div className="pt-4 sm:pt-0 sm:pl-6">
            <div className="text-xs uppercase font-medium text-slate">Total Remaining</div>
            <div
              className={`text-2xl font-semibold tabular-nums mt-1 ${
                totalRemainingMinor >= 0 ? 'text-gain' : 'text-loss'
              }`}
            >
              {formatMoney(totalRemainingMinor)}
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Bar Chart */}
      {isLoading || !budgets ? (
        <div className="bg-surface border border-line rounded-panel p-6">
          <TableSkeleton rows={4} />
        </div>
      ) : (
        <BudgetBarChart budgets={budgets} />
      )}

      {/* Budget Breakdown Table */}
      {isLoading || !budgets ? (
        <div className="bg-surface border border-line rounded-panel p-6">
          <TableSkeleton rows={6} />
        </div>
      ) : (
        <div className="bg-surface border border-line rounded-panel overflow-hidden">
          <div className="px-6 py-4 border-b border-line">
            <h2 className="text-base font-semibold text-ink">Category Allocations</h2>
          </div>
          <div className="divide-y divide-line">
            {budgets.map((b) => {
              const percent = Math.round((b.spentMinor / b.limitMinor) * 100);
              const remaining = b.limitMinor - b.spentMinor;
              const isOver = remaining < 0;

              return (
                <div key={b.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="w-full md:w-1/3">
                    <div className="font-semibold text-sm text-ink">{b.category}</div>
                    <div className="text-xs text-slate mt-0.5">{b.period}</div>
                  </div>

                  <div className="w-full md:w-1/3 space-y-1.5">
                    <div className="flex justify-between text-xs tabular-nums">
                      <span className="text-slate">
                        {formatMoney(b.spentMinor)} spent
                      </span>
                      <span className="font-medium text-ink">
                        {formatMoney(b.limitMinor)} limit
                      </span>
                    </div>
                    <div className="w-full h-2 bg-canvas rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isOver ? 'bg-loss' : percent >= 90 ? 'bg-saffron' : 'bg-marine'
                        }`}
                        style={{ width: `${Math.min(100, percent)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-1/3">
                    <div className="text-right">
                      <div className="text-xs text-slate">
                        {isOver ? 'Over budget' : 'Remaining'}
                      </div>
                      <div
                        className={`text-sm font-semibold tabular-nums ${
                          isOver ? 'text-loss' : 'text-gain'
                        }`}
                      >
                        {formatMoney(Math.abs(remaining))}
                      </div>
                    </div>

                    <StatusChip
                      status={isOver ? 'loss' : percent >= 90 ? 'warning' : 'gain'}
                      label={isOver ? 'Over' : `${percent}%`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Accessible Create Budget Dialog */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
          <div className="bg-surface border border-line rounded-panel max-w-md w-full p-6 shadow-elevation space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h2 id="modal-title" className="text-lg font-semibold text-ink">
                New Budget Target
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate hover:text-ink cursor-pointer p-1 rounded-control"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBudget} className="space-y-4">
              <Input
                id="new-category"
                label="Category name"
                placeholder="e.g. Entertainment"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                required
              />

              <Input
                id="new-limit"
                label="Monthly limit ($)"
                placeholder="e.g. 250"
                type="number"
                min="1"
                step="1"
                value={newLimitDollars}
                onChange={(e) => setNewLimitDollars(e.target.value)}
                required
              />

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-line">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                {/* Rule: button names its outcome */}
                <Button
                  type="submit"
                  variant="primary"
                  disabled={createBudgetMutation.isPending}
                >
                  {createBudgetMutation.isPending ? 'Saving...' : 'Save budget'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
