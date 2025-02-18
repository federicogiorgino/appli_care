'use client'

import { DataTable } from '@/components/data-table'

import { companiesColumns } from './companies-columns'
import { useCompanies } from '@/hooks/use-companies'
import { useContacts } from '@/hooks/use-contacts'

function CompaniesTable() {
  const { companies } = useCompanies()

  return (
    <DataTable columns={companiesColumns} data={companies} type="companies" />
  )
}

export { CompaniesTable }
