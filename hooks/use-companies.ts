import { useQuery } from '@tanstack/react-query'

import { getCompanies } from '@/actions/companies'

export function useCompanies() {
  const companiesQuery = useQuery({
    queryKey: ['companies'],
    queryFn: () => getCompanies(),
  })

  return {
    companies: companiesQuery.data?.data ?? [],
    isLoading: companiesQuery.isLoading,
    error: companiesQuery.error || companiesQuery.data?.error,
  }
}
