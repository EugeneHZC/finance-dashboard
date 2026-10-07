import { mockBudgets } from '../data/mockData';
import { Budget } from '../data/types';

let currentBudgets: Budget[] = [...mockBudgets];

/**
 * Data access layer for Budgets.
 */
export async function fetchBudgets(): Promise<Budget[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return [...currentBudgets];
}

export async function createBudget(newBudget: {
  category: string;
  limitMinor: number;
  period?: string;
}): Promise<Budget> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const created: Budget = {
    id: `bgt-${Date.now()}`,
    category: newBudget.category,
    period: newBudget.period ?? 'October 2026',
    limitMinor: newBudget.limitMinor,
    spentMinor: 0,
    previousSpentMinor: 0,
  };
  currentBudgets = [...currentBudgets, created];
  return created;
}
