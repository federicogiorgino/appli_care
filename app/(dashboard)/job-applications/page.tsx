import { Suspense } from 'react'

import { JobApplicationsGrid } from './_components/job-applications-grid'

function JobApplicationsPage() {
  return (
    <Suspense>
      <JobApplicationsGrid />
    </Suspense>
  )
}

export default JobApplicationsPage
