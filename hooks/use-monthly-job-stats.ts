import { useQuery } from '@tanstack/react-query'

import { getMonthlyJobApplicationStats } from '@/actions/stats'

export function useMonthlyJobStats() {
  const monthlyJobStatsQuery = useQuery({
    queryKey: ['monthlyJobStats'],
    queryFn: () => getMonthlyJobApplicationStats(),
  })

  return {
    monthlyJobStats: monthlyJobStatsQuery.data?.data ?? [],
    isLoading: monthlyJobStatsQuery.isLoading,
    error: monthlyJobStatsQuery.error || monthlyJobStatsQuery.data?.error,
  }
}
