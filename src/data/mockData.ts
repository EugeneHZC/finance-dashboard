import {
  Account,
  Transaction,
  Budget,
  MonthlyCashFlowPoint,
} from './types';

/**
 * Obviously simulated account fixtures.
 * All amounts are integers in minor units (cents).
 */
export const mockAccounts: Account[] = [
  {
    id: 'acc-1',
    name: 'Sample Primary Checking',
    institution: 'Demo National Bank',
    type: 'checking',
    maskLast4: '4102',
    balanceMinor: 785420, // $7,854.20
    previousBalanceMinor: 712000, // $7,120.00
    currency: 'USD',
    updatedAt: '2026-10-07T08:00:00Z',
  },
  {
    id: 'acc-2',
    name: 'Sample High-Yield Reserve',
    institution: 'Demo Trust Co',
    type: 'savings',
    maskLast4: '8831',
    balanceMinor: 3245000, // $32,450.00
    previousBalanceMinor: 3180000, // $31,800.00
    currency: 'USD',
    updatedAt: '2026-10-07T08:00:00Z',
  },
  {
    id: 'acc-3',
    name: 'Sample Index Portfolio',
    institution: 'Apex Demo Securities',
    type: 'investment',
    maskLast4: '6540',
    balanceMinor: 4892000, // $48,920.00
    previousBalanceMinor: 4650000, // $46,500.00
    currency: 'USD',
    updatedAt: '2026-10-07T08:00:00Z',
  },
  {
    id: 'acc-4',
    name: 'Sample Rewards Credit Card',
    institution: 'Demo National Bank',
    type: 'credit',
    maskLast4: '9921',
    balanceMinor: -184250, // -$1,842.50 (liability)
    previousBalanceMinor: -162000, // -$1,620.00
    currency: 'USD',
    updatedAt: '2026-10-07T08:00:00Z',
  },
];

/**
 * Obviously simulated transactions.
 * Positive = inflow (money in), Negative = outflow (money out).
 * Dates in ISO 8601 UTC.
 */
export const mockTransactions: Transaction[] = [
  {
    id: 'tx-101',
    accountId: 'acc-1',
    accountName: 'Sample Primary Checking (•••• 4102)',
    date: '2026-10-06T14:30:00Z',
    description: 'Cloud Software Subscription',
    category: 'Technology',
    amountMinor: -4500, // -$45.00
    status: 'posted',
  },
  {
    id: 'tx-102',
    accountId: 'acc-1',
    accountName: 'Sample Primary Checking (•••• 4102)',
    date: '2026-10-05T18:15:00Z',
    description: 'City Organic Market',
    category: 'Food & Dining',
    amountMinor: -13280, // -$132.80
    status: 'posted',
  },
  {
    id: 'tx-103',
    accountId: 'acc-1',
    accountName: 'Sample Primary Checking (•••• 4102)',
    date: '2026-10-04T09:00:00Z',
    description: 'Consulting Retainer Inflow',
    category: 'Income',
    amountMinor: 420000, // +$4,200.00
    status: 'posted',
  },
  {
    id: 'tx-104',
    accountId: 'acc-4',
    accountName: 'Sample Rewards Credit Card (•••• 9921)',
    date: '2026-10-03T12:45:00Z',
    description: 'Metro Transit Monthly Pass',
    category: 'Transportation',
    amountMinor: -9000, // -$90.00
    status: 'posted',
  },
  {
    id: 'tx-105',
    accountId: 'acc-1',
    accountName: 'Sample Primary Checking (•••• 4102)',
    date: '2026-10-02T11:20:00Z',
    description: 'Electric & Gas Utility Co',
    category: 'Utilities',
    amountMinor: -14550, // -$145.50
    status: 'posted',
  },
  {
    id: 'tx-106',
    accountId: 'acc-4',
    accountName: 'Sample Rewards Credit Card (•••• 9921)',
    date: '2026-10-01T20:10:00Z',
    description: 'Downtown Bistro Dining',
    category: 'Food & Dining',
    amountMinor: -8850, // -$88.50
    status: 'posted',
  },
  {
    id: 'tx-107',
    accountId: 'acc-1',
    accountName: 'Sample Primary Checking (•••• 4102)',
    date: '2026-10-01T08:00:00Z',
    description: 'Monthly Apartment Lease',
    category: 'Housing',
    amountMinor: -210000, // -$2,100.00
    status: 'posted',
  },
  {
    id: 'tx-108',
    accountId: 'acc-2',
    accountName: 'Sample High-Yield Reserve (•••• 8831)',
    date: '2026-09-30T23:59:00Z',
    description: 'Monthly Savings Interest Accrual',
    category: 'Income',
    amountMinor: 8920, // +$89.20
    status: 'posted',
  },
  {
    id: 'tx-109',
    accountId: 'acc-4',
    accountName: 'Sample Rewards Credit Card (•••• 9921)',
    date: '2026-09-28T16:20:00Z',
    description: 'Bookstore Academic Textbooks',
    category: 'Education',
    amountMinor: -7200, // -$72.00
    status: 'posted',
  },
  {
    id: 'tx-110',
    accountId: 'acc-1',
    accountName: 'Sample Primary Checking (•••• 4102)',
    date: '2026-09-25T13:00:00Z',
    description: 'Medical Pharmacy Prescription',
    category: 'Health',
    amountMinor: -3550, // -$35.50
    status: 'posted',
  },
];

/**
 * Monthly budget targets and actual spending.
 * Note: spending is expressed in positive minor units (cents).
 */
export const mockBudgets: Budget[] = [
  {
    id: 'bgt-1',
    category: 'Housing',
    period: 'October 2026',
    limitMinor: 210000, // $2,100.00
    spentMinor: 210000, // $2,100.00 (100%)
    previousSpentMinor: 210000,
  },
  {
    id: 'bgt-2',
    category: 'Food & Dining',
    period: 'October 2026',
    limitMinor: 65000, // $650.00
    spentMinor: 22130, // $221.30 (34%)
    previousSpentMinor: 58900,
  },
  {
    id: 'bgt-3',
    category: 'Utilities',
    period: 'October 2026',
    limitMinor: 25000, // $250.00
    spentMinor: 14550, // $145.50 (58%)
    previousSpentMinor: 18200,
  },
  {
    id: 'bgt-4',
    category: 'Transportation',
    period: 'October 2026',
    limitMinor: 20000, // $200.00
    spentMinor: 9000, // $90.00 (45%)
    previousSpentMinor: 14500,
  },
  {
    id: 'bgt-5',
    category: 'Technology',
    period: 'October 2026',
    limitMinor: 10000, // $100.00
    spentMinor: 4500, // $45.00 (45%)
    previousSpentMinor: 9500,
  },
  {
    id: 'bgt-6',
    category: 'Health & Wellness',
    period: 'October 2026',
    limitMinor: 15000, // $150.00
    spentMinor: 3550, // $35.50 (24%)
    previousSpentMinor: 12000,
  },
];

/**
 * Monthly cash flow history for time series chart.
 * Saffron marks "now" (October 2026).
 */
export const mockCashFlowHistory: MonthlyCashFlowPoint[] = [
  {
    date: '2026-05-01T00:00:00Z',
    monthLabel: 'May',
    inflowMinor: 580000,
    outflowMinor: 385000,
    netFlowMinor: 195000,
    comparisonNetFlowMinor: 160000,
    isCurrentPeriod: false,
  },
  {
    date: '2026-06-01T00:00:00Z',
    monthLabel: 'Jun',
    inflowMinor: 610000,
    outflowMinor: 412000,
    netFlowMinor: 198000,
    comparisonNetFlowMinor: 175000,
    isCurrentPeriod: false,
  },
  {
    date: '2026-07-01T00:00:00Z',
    monthLabel: 'Jul',
    inflowMinor: 590000,
    outflowMinor: 395000,
    netFlowMinor: 195000,
    comparisonNetFlowMinor: 180000,
    isCurrentPeriod: false,
  },
  {
    date: '2026-08-01T00:00:00Z',
    monthLabel: 'Aug',
    inflowMinor: 640000,
    outflowMinor: 430000,
    netFlowMinor: 210000,
    comparisonNetFlowMinor: 190000,
    isCurrentPeriod: false,
  },
  {
    date: '2026-09-01T00:00:00Z',
    monthLabel: 'Sep',
    inflowMinor: 635000,
    outflowMinor: 418000,
    netFlowMinor: 217000,
    comparisonNetFlowMinor: 185000,
    isCurrentPeriod: false,
  },
  {
    date: '2026-10-01T00:00:00Z',
    monthLabel: 'Oct',
    inflowMinor: 428920,
    outflowMinor: 264730,
    netFlowMinor: 164190,
    comparisonNetFlowMinor: 142000,
    isCurrentPeriod: true, // Marked with Saffron for "now"
  },
];
