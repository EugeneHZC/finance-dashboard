import { mockAccounts } from '../data/mockData';
import { Account } from '../data/types';

/**
 * Data access layer for Accounts.
 * Simulates async API latency and returns typed account objects.
 */
export async function fetchAccounts(): Promise<Account[]> {
  // Simulate 100ms network roundtrip
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [...mockAccounts];
}
