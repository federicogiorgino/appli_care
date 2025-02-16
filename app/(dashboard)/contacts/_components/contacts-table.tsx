'use client'

import { DataTable } from '@/components/data-table'

import { contactsColumns } from './contacts-columns'
import { useContacts } from '@/hooks/use-contacts'

function ContactsTable() {
  const { contacts } = useContacts()

  return <DataTable columns={contactsColumns} data={contacts} type="contacts" />
}

export { ContactsTable }
