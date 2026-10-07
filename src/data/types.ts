export type AccountType = 'checking' | 'savings' | 'investment' | 'credit';

export interface Account {
  id: string;
  name: string;
  institution: string;
  type: AccountType;
  maskLast4: string;
  balanceMinor: number;
  previousBalanceMinor: number;
  currency: string;
  updatedAt: string; // ISO 8601 UTC
}

export type TransactionStatus = 'posted' | 'pending';

export interface Transaction {
  id: string;
  accountId: string;
  accountName: string;
  date: string; // ISO 8601 UTC
  description: string;
  category: string;
  amountMinor: number; // positive = inflow, negative = outflow
  status: TransactionStatus;
}

export interface Budget {
  id: string;
  category: string;
  period: string; // e.g. "October 2026"
  limitMinor: number;
  spentMinor: number;
  previousSpentMinor: number;
}

export interface MonthlyCashFlowPoint {
  date: string; // ISO 8601 UTC
  monthLabel: string;
  inflowMinor: number;
  outflowMinor: number; // positive number representing total spending
  netFlowMinor: number; // inflow - outflow
  comparisonNetFlowMinor: number; // same period prior year
  isCurrentPeriod: boolean; // true for "now", colored in Saffron
}

export interface FinancialOverviewSummary {
  totalCashMinor: number;
  previousTotalCashMinor: number;
  totalAssetsMinor: number;
  totalLiabilitiesMinor: number;
  netWorthMinor: number;
  previousNetWorthMinor: number;
  monthlyInflowMinor: number;
  monthlyOutflowMinor: number;
  monthlyNetFlowMinor: number;
  previousMonthlyNetFlowMinor: number;
}
