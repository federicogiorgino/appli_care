import { JobApplicationStatus } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { getJobApplications } from '@/actions/job-applications'

export function useJobApplications(
  filters: {
    q: string
    status: JobApplicationStatus | ''
  },
  page: number,
  itemsPerPage: number
) {
  const jobApplications = useQuery({
    queryKey: ['jobApplications', filters, page, itemsPerPage],
    queryFn: () => getJobApplications(filters, page, itemsPerPage),
  })

  return {
    jobApplications: jobApplications.data?.data ?? [],
    totalPages: jobApplications.data?.totalPages ?? 0,
    isLoading: jobApplications.isLoading,
    error: jobApplications.error || jobApplications.data?.error,
  }
}
