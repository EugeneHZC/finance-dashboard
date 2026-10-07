import { mockTransactions } from '../data/mockData';
import { Transaction } from '../data/types';

/**
 * Data access layer for Transactions.
 */
export async function fetchTransactions(): Promise<Transaction[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [...mockTransactions];
}
