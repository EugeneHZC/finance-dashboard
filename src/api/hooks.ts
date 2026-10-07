import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAccounts } from './accountsApi';
import { fetchTransactions } from './transactionsApi';
import { fetchBudgets, createBudget } from './budgetsApi';
import { fetchOverviewSummary, fetchCashFlowHistory } from './overviewApi';

export function useAccountsQuery() {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: fetchAccounts,
    staleTime: 60 * 1000,
  });
}

export function useTransactionsQuery() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
    staleTime: 60 * 1000,
  });
}

export function useBudgetsQuery() {
  return useQuery({
    queryKey: ['budgets'],
    queryFn: fetchBudgets,
    staleTime: 60 * 1000,
  });
}

export function useCreateBudgetMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
}

export function useOverviewSummaryQuery() {
  return useQuery({
    queryKey: ['overviewSummary'],
    queryFn: fetchOverviewSummary,
    staleTime: 60 * 1000,
  });
}

export function useCashFlowHistoryQuery() {
  return useQuery({
    queryKey: ['cashFlowHistory'],
    queryFn: fetchCashFlowHistory,
    staleTime: 60 * 1000,
  });
}
