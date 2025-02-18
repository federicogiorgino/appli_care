import { Suspense } from 'react'

import { CompaniesTable } from './_components/companies-table'

function CompaniesPage() {
  return (
    <Suspense>
      <h1 className="mb-5 text-4xl font-bold">Companies</h1>

      <CompaniesTable />
    </Suspense>
  )
}

export default CompaniesPage
