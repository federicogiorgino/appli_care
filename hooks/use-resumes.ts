import { useQuery } from '@tanstack/react-query'

import { getResumes } from '@/actions/resumes'

export function useResumes() {
  const resumesQuery = useQuery({
    queryKey: ['resumes'],
    queryFn: () => getResumes(),
  })

  return {
    resumes: resumesQuery.data?.data ?? [],
    isLoading: resumesQuery.isLoading,
    error: resumesQuery.error || resumesQuery.data?.error,
  }
}
