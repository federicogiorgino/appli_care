import { useQuery } from '@tanstack/react-query'

import { getRecentJobApplications } from '@/actions/job-applications'

export function useRecentJobApplications() {
  const recentJobApplications = useQuery({
    queryKey: ['recentJobApplications'],
    queryFn: () => getRecentJobApplications(),
  })

  return {
    recentJobApplications: recentJobApplications.data?.data ?? [],
    isLoading: recentJobApplications.isLoading,
    error: recentJobApplications.error || recentJobApplications.data?.error,
  }
}
