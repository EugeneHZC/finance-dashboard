import React from 'react';
import { Transaction } from '../../data/types';
import { Table, Column } from '../../components/Table/Table';
import { formatMoney } from '../../lib/money';
import { formatDate } from '../../lib/date';

export interface TransactionsTableProps {
  transactions: Transaction[];
  sortKey: string;
  sortDirection: 'asc' | 'desc';
  onSort: (key: string) => void;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  sortKey,
  sortDirection,
  onSort,
}) => {
  const columns: Column<Transaction>[] = [
    {
      key: 'date',
      header: 'Date',
      sortable: true,
      width: '15%',
      render: (tx) => <span className="tabular-nums text-slate">{formatDate(tx.date)}</span>,
    },
    {
      key: 'description',
      header: 'Description',
      sortable: true,
      width: '30%',
      render: (tx) => <span className="font-medium text-ink">{tx.description}</span>,
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      width: '18%',
      render: (tx) => <span className="text-slate">{tx.category}</span>,
    },
    {
      key: 'accountName',
      header: 'Account',
      width: '22%',
      render: (tx) => <span className="text-xs text-slate truncate">{tx.accountName}</span>,
    },
    {
      key: 'amountMinor',
      header: 'Amount (USD)',
      align: 'right',
      sortable: true,
      width: '15%',
      render: (tx) => {
        const isPositive = tx.amountMinor > 0;
        return (
          <span
            className={`font-medium tabular-nums ${
              isPositive ? 'text-gain' : 'text-ink'
            }`}
          >
            {formatMoney(tx.amountMinor, {
              showExplicitSign: true,
              omitCurrencySymbol: true,
            })}
          </span>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      data={transactions}
      keyExtractor={(item) => item.id}
      sortKey={sortKey}
      sortDirection={sortDirection}
      onSort={onSort}
      emptyMessage="No transactions match your search. Clear filters to see all transactions."
    />
  );
};
