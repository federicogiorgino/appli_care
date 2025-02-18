import { useQuery } from '@tanstack/react-query'

import { getCoverLetters } from '@/actions/cover-letters'

export function useCoverLetters() {
  const coverLettersQuery = useQuery({
    queryKey: ['coverLetters'],
    queryFn: () => getCoverLetters(),
  })

  return {
    coverLetters: coverLettersQuery.data?.data ?? [],
    isLoading: coverLettersQuery.isLoading,
    error: coverLettersQuery.error || coverLettersQuery.data?.error,
  }
}
