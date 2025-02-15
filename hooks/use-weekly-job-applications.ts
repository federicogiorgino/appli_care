import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getWeeklyJobApplicationStats } from '@/actions/stats'

export function useWeeklyJobApplicationStats() {
  const queryClient = useQueryClient()

  const weeklyJobApplicationStats = useQuery({
    queryKey: ['weeklyJobApplicationStats'],
    queryFn: () => getWeeklyJobApplicationStats(),
  })

  const invalidateWeeklyJobApplicationStats = () => {
    queryClient.invalidateQueries({
      queryKey: ['weeklyJobApplicationStats'],
    })
  }

  return {
    stats: weeklyJobApplicationStats.data?.data ?? {
      byStatus: [],
      byType: [],
      byLocation: [],
    },
    isLoading: weeklyJobApplicationStats.isLoading,
    error:
      weeklyJobApplicationStats.error || weeklyJobApplicationStats.data?.error,
    invalidateWeeklyJobApplicationStats,
  }
}
