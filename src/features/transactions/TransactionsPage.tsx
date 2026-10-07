import React, { useState, useMemo } from 'react';
import { useTransactionsQuery } from '../../api/hooks';
import { TransactionsTable } from './TransactionsTable';
import { TransactionFilters } from './TransactionFilters';
import { Button } from '../../components/Button/Button';
import { TableSkeleton } from '../../components/Skeleton/Skeleton';
import { formatMoney, sumMinorUnits } from '../../lib/money';
import { Download, AlertCircle, Check } from 'lucide-react';

export const TransactionsPage: React.FC = () => {
  const { data: transactions, isLoading, isError, refetch } = useTransactionsQuery();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortKey, setSortKey] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [exportedStatus, setExportedStatus] = useState<string | null>(null);

  // Extract distinct categories
  const categories = useMemo(() => {
    if (!transactions) return [];
    return Array.from(new Set(transactions.map((t) => t.category))).sort();
  }, [transactions]);

  // Filter & Sort
  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];

    let result = transactions.filter((tx) => {
      const matchesSearch =
        tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.accountName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || tx.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    result.sort((a, b) => {
      let comparison = 0;
      if (sortKey === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortKey === 'amountMinor') {
        comparison = a.amountMinor - b.amountMinor;
      } else if (sortKey === 'description') {
        comparison = a.description.localeCompare(b.description);
      } else if (sortKey === 'category') {
        comparison = a.category.localeCompare(b.category);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [transactions, searchTerm, selectedCategory, sortKey, sortDirection]);

  // Reconciled visible net flow
  const visibleNetFlow = useMemo(() => {
    return sumMinorUnits(filteredTransactions.map((t) => t.amountMinor));
  }, [filteredTransactions]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const handleExportCSV = () => {
    if (!filteredTransactions.length) return;
    const header = 'ID,Date,Description,Category,Account,AmountUSD\n';
    const rows = filteredTransactions
      .map(
        (t) =>
          `"${t.id}","${t.date}","${t.description}","${t.category}","${t.accountName}",${(
            t.amountMinor / 100
          ).toFixed(2)}`
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    // Rule: "A button names its outcome: 'Save budget,' 'Export CSV.' The confirmation uses the same verb: 'CSV exported.'"
    setExportedStatus('CSV exported.');
    setTimeout(() => setExportedStatus(null), 3000);
  };

  if (isError) {
    return (
      <div className="p-8 max-w-lg mx-auto text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-loss-tint flex items-center justify-center text-loss">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-semibold text-ink">Couldn't load transactions</h2>
        <p className="text-sm text-slate">
          Couldn't load transactions. Check your connection and try again.
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
          <h1 className="text-[28px] leading-[34px] font-semibold text-ink">
            Transactions
          </h1>
          <p className="text-sm text-slate mt-1">
            Complete ledger of posted and settled entries.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {exportedStatus && (
            <span className="inline-flex items-center gap-1.5 text-xs text-gain font-medium bg-gain-tint px-3 py-1.5 rounded-control">
              <Check className="w-3.5 h-3.5" />
              {exportedStatus}
            </span>
          )}
          <Button variant="primary" onClick={handleExportCSV}>
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <TransactionFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {/* Ledger Table */}
      {isLoading ? (
        <div className="bg-surface border border-line rounded-panel">
          <TableSkeleton rows={8} />
        </div>
      ) : (
        <div className="space-y-3">
          <TransactionsTable
            transactions={filteredTransactions}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
          />

          {/* Reconciled Summary Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate px-4 py-2 bg-surface border border-line rounded-control">
            <span>
              Showing {filteredTransactions.length} of {transactions?.length ?? 0} transactions
            </span>
            <div className="flex items-center gap-2 mt-1 sm:mt-0">
              <span>Visible Net Flow:</span>
              <strong className="text-ink font-semibold tabular-nums">
                {formatMoney(visibleNetFlow, { showExplicitSign: true })}
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
