import { describe, it, expect } from 'vitest';
import { sumMinorUnits, formatMoney } from '../src/lib/money';

describe('Financial Aggregation and Reconciliation', () => {
  it('reconciles account balances with total net worth', () => {
    const accounts = [
      { id: '1', name: 'Main Checking', balanceMinor: 842050 }, // $8,420.50
      { id: '2', name: 'High-Yield Savings', balanceMinor: 2541000 }, // $25,410.00
      { id: '3', name: 'Investment Account', balanceMinor: 5218000 }, // $52,180.00
      { id: '4', name: 'Credit Card', balanceMinor: -145025 }, // -$1,450.25 (liability)
    ];

    const computedTotal = sumMinorUnits(accounts.map((a) => a.balanceMinor));
    const expectedTotal = 842050 + 2541000 + 5218000 - 145025; // 8456025 minor units

    expect(computedTotal).toBe(expectedTotal);
    expect(formatMoney(computedTotal)).toBe('$84,560.25');
  });

  it('reconciles monthly transaction amounts with net flow', () => {
    const transactions = [
      { id: 't1', amountMinor: 450000 }, // +$4,500.00 (Salary inflow)
      { id: 't2', amountMinor: -180000 }, // -$1,800.00 (Rent outflow)
      { id: 't3', amountMinor: -14250 }, // -$142.50 (Groceries outflow)
      { id: 't4', amountMinor: -6500 }, // -$65.00 (Utilities outflow)
      { id: 't5', amountMinor: 12000 }, // +$120.00 (Cashback inflow)
    ];

    const totalInflow = sumMinorUnits(
      transactions.filter((t) => t.amountMinor > 0).map((t) => t.amountMinor)
    );
    const totalOutflow = sumMinorUnits(
      transactions.filter((t) => t.amountMinor < 0).map((t) => t.amountMinor)
    );
    const netFlow = sumMinorUnits(transactions.map((t) => t.amountMinor));

    expect(totalInflow).toBe(462000); // $4,620.00
    expect(totalOutflow).toBe(-200750); // -$2,007.50
    expect(netFlow).toBe(totalInflow + totalOutflow);
    expect(netFlow).toBe(261250); // $2,612.50
  });

  it('reconciles budget category actual spend with overall spend', () => {
    const budgets = [
      { category: 'Housing', spentMinor: 180000, limitMinor: 180000 },
      { category: 'Food & Dining', spentMinor: 62450, limitMinor: 80000 },
      { category: 'Utilities', spentMinor: 21500, limitMinor: 25000 },
      { category: 'Transportation', spentMinor: 14500, limitMinor: 30000 },
    ];

    const totalSpent = sumMinorUnits(budgets.map((b) => b.spentMinor));
    const totalLimit = sumMinorUnits(budgets.map((b) => b.limitMinor));

    expect(totalSpent).toBe(278450); // $2,784.50
    expect(totalLimit).toBe(315000); // $3,150.00
  });
});
