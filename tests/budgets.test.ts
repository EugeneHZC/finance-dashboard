import { describe, it, expect } from 'vitest';
import { fetchBudgets, createBudget } from '../src/api/budgetsApi';
import { sumMinorUnits } from '../src/lib/money';

describe('Budgets API and Creation', () => {
  it('creates and persists a new budget in minor units', async () => {
    const initialBudgets = await fetchBudgets();
    const initialCount = initialBudgets.length;

    const newBudget = await createBudget({
      category: 'Books & Learning',
      limitMinor: 7500, // $75.00
      period: 'October 2026',
    });

    expect(newBudget.category).toBe('Books & Learning');
    expect(newBudget.limitMinor).toBe(7500);
    expect(newBudget.spentMinor).toBe(0);
    expect(newBudget.id).toBeDefined();

    const updatedBudgets = await fetchBudgets();
    expect(updatedBudgets.length).toBe(initialCount + 1);

    const found = updatedBudgets.find((b) => b.category === 'Books & Learning');
    expect(found).toBeDefined();
    expect(found?.limitMinor).toBe(7500);

    // Reconcile total limit
    const totalLimit = sumMinorUnits(updatedBudgets.map((b) => b.limitMinor));
    const previousTotalLimit = sumMinorUnits(initialBudgets.map((b) => b.limitMinor));
    expect(totalLimit).toBe(previousTotalLimit + 7500);
  });
});
