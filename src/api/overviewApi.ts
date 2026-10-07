import { mockAccounts, mockCashFlowHistory } from '../data/mockData';
import { FinancialOverviewSummary, MonthlyCashFlowPoint } from '../data/types';
import { sumMinorUnits } from '../lib/money';

/**
 * Computes overview summary dynamically from account and cashflow records.
 * Adheres strictly to the rule: "Every figure shown must be computed from data."
 */
export async function fetchOverviewSummary(): Promise<FinancialOverviewSummary> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const cashAccounts = mockAccounts.filter(
    (acc) => acc.type === 'checking' || acc.type === 'savings'
  );
  const totalCashMinor = sumMinorUnits(cashAccounts.map((a) => a.balanceMinor));
  const previousTotalCashMinor = sumMinorUnits(
    cashAccounts.map((a) => a.previousBalanceMinor)
  );

  const assetAccounts = mockAccounts.filter((acc) => acc.balanceMinor > 0);
  const liabilityAccounts = mockAccounts.filter((acc) => acc.balanceMinor < 0);

  const totalAssetsMinor = sumMinorUnits(assetAccounts.map((a) => a.balanceMinor));
  const totalLiabilitiesMinor = sumMinorUnits(liabilityAccounts.map((a) => a.balanceMinor));
  const netWorthMinor = sumMinorUnits(mockAccounts.map((a) => a.balanceMinor));
  const previousNetWorthMinor = sumMinorUnits(
    mockAccounts.map((a) => a.previousBalanceMinor)
  );

  const currentMonthPoint = mockCashFlowHistory.find((p) => p.isCurrentPeriod) ?? mockCashFlowHistory[mockCashFlowHistory.length - 1];
  const previousMonthPoint = mockCashFlowHistory[mockCashFlowHistory.length - 2];

  return {
    totalCashMinor,
    previousTotalCashMinor,
    totalAssetsMinor,
    totalLiabilitiesMinor,
    netWorthMinor,
    previousNetWorthMinor,
    monthlyInflowMinor: currentMonthPoint.inflowMinor,
    monthlyOutflowMinor: currentMonthPoint.outflowMinor,
    monthlyNetFlowMinor: currentMonthPoint.netFlowMinor,
    previousMonthlyNetFlowMinor: previousMonthPoint?.netFlowMinor ?? 0,
  };
}

export async function fetchCashFlowHistory(): Promise<MonthlyCashFlowPoint[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [...mockCashFlowHistory];
}
