import { useQuery } from '@tanstack/react-query'

import { getContacts } from '@/actions/contacts'

export function useContacts() {
  const contactsQuery = useQuery({
    queryKey: ['contacts'],
    queryFn: () => getContacts(),
  })

  return {
    contacts: contactsQuery.data?.data ?? [],
    isLoading: contactsQuery.isLoading,
    error: contactsQuery.error || contactsQuery.data?.error,
  }
}
