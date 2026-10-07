import React from 'react';
import { useAccountsQuery } from '../../api/hooks';
import { Table, Column } from '../../components/Table/Table';
import { Account } from '../../data/types';
import { formatMoney, sumMinorUnits } from '../../lib/money';
import { formatDate } from '../../lib/date';
import { ChangeIndicator } from '../../components/ChangeIndicator/ChangeIndicator';
import { TableSkeleton } from '../../components/Skeleton/Skeleton';
import { Button } from '../../components/Button/Button';
import { AlertCircle, RefreshCw, ShieldCheck } from 'lucide-react';

export const AccountsPage: React.FC = () => {
  const { data: accounts, isLoading, isError, refetch, isFetching } = useAccountsQuery();

  // Reconciled total balance
  const totalNetWorth = accounts ? sumMinorUnits(accounts.map((a) => a.balanceMinor)) : 0;
  const previousNetWorth = accounts
    ? sumMinorUnits(accounts.map((a) => a.previousBalanceMinor))
    : 0;

  const columns: Column<Account>[] = [
    {
      key: 'name',
      header: 'Account Name',
      width: '28%',
      render: (acc) => (
        <div>
          <div className="font-semibold text-ink">{acc.name}</div>
          <div className="text-xs text-slate">{acc.institution}</div>
        </div>
      ),
    },
    {
      key: 'maskLast4',
      header: 'Account Number',
      width: '20%',
      render: (acc) => (
        <span className="font-mono text-xs text-slate tracking-wider">
          •••• {acc.maskLast4}
        </span>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      width: '16%',
      render: (acc) => (
        <span className="inline-block px-2 py-0.5 text-xs font-medium bg-canvas text-slate rounded-control capitalize border border-line">
          {acc.type}
        </span>
      ),
    },
    {
      key: 'updatedAt',
      header: 'Last Synced',
      width: '16%',
      render: (acc) => <span className="text-xs text-slate">{formatDate(acc.updatedAt)}</span>,
    },
    {
      key: 'balanceMinor',
      header: 'Balance (USD)',
      align: 'right',
      width: '20%',
      render: (acc) => {
        const isLiability = acc.balanceMinor < 0;
        return (
          <div className="text-right">
            <div
              className={`font-semibold tabular-nums text-sm ${
                isLiability ? 'text-loss' : 'text-ink'
              }`}
            >
              {formatMoney(acc.balanceMinor, { omitCurrencySymbol: true })}
            </div>
            <div className="flex justify-end mt-0.5">
              <ChangeIndicator
                currentMinor={acc.balanceMinor}
                previousMinor={acc.previousBalanceMinor}
                showAmount={false}
              />
            </div>
          </div>
        );
      },
    },
  ];

  if (isError) {
    return (
      <div className="p-8 max-w-lg mx-auto text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-loss-tint flex items-center justify-center text-loss">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-semibold text-ink">Couldn't load accounts</h2>
        <p className="text-sm text-slate">
          Couldn't load accounts. Check your connection and try again.
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
            Accounts
          </h1>
          <p className="text-sm text-slate mt-1">
            Linked depository, investment, and credit accounts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
            <span>Sync accounts</span>
          </Button>
        </div>
      </div>

      {/* Reconciled Aggregate Banner */}
      <div className="bg-surface border border-line rounded-panel p-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-medium text-slate">
              Consolidated Net Balance
            </span>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-3xl font-semibold text-ink tabular-nums">
                {formatMoney(totalNetWorth)}
              </span>
              <ChangeIndicator
                currentMinor={totalNetWorth}
                previousMinor={previousNetWorth}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate">
            <ShieldCheck className="w-4 h-4 text-marine" />
            <span>Account identifiers masked per security policy</span>
          </div>
        </div>
      </div>

      {/* Accounts Table */}
      {isLoading || !accounts ? (
        <div className="bg-surface border border-line rounded-panel">
          <TableSkeleton rows={5} />
        </div>
      ) : (
        <div className="space-y-3">
          <Table
            columns={columns}
            data={accounts}
            keyExtractor={(item) => item.id}
          />
          <div className="text-xs text-slate px-4 py-2 bg-surface border border-line rounded-control flex items-center justify-between">
            <span>{accounts.length} active linked accounts</span>
            <span>All institutions verified</span>
          </div>
        </div>
      )}
    </div>
  );
};
