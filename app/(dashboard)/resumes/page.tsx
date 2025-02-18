import { Suspense } from 'react'

import { ResumesGrid } from './_components/resumes-grid'

function ResumesPage() {
  return (
    <Suspense>
      <ResumesGrid />
    </Suspense>
  )
}

export default ResumesPage
