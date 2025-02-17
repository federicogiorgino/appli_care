'use client'

import { JobApplicationStatus } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import {
  JobApplicationCard,
  JobApplicationCardSkeleton,
} from '@/components/job-application-card'
import { Paginate } from '@/components/paginate'
import { Button } from '@/components/ui/button'

import { Searchbar } from './search-bar'
import useDialog from '@/hooks/use-dialog'
import { useJobApplications } from '@/hooks/use-job-applications'

function JobApplicationsGrid() {
  const { openDialog } = useDialog('jobApplicationCreateDialog')

  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1
  const status = searchParams.get('status') as JobApplicationStatus | ''
  const perPage = searchParams.get('perPage')
    ? Number(searchParams.get('perPage'))
    : 10
  const { jobApplications, totalPages, isLoading } = useJobApplications(
    { q, status },
    page,
    perPage
  )

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-5 text-4xl font-bold">Job Applications</h1>

      <div className="grid gap-8">
        <div className="flex w-full items-center justify-between gap-8">
          <Searchbar />

          <Button onClick={openDialog} variant="outline">
            <Plus />
            <span className="hidden md:block"> Add New Job Application</span>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {[...Array(perPage)].map((_, index) => (
              <JobApplicationCardSkeleton key={index} />
            ))}
          </div>
        ) : jobApplications.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center">
            <p className="mb-4 text-lg text-muted-foreground">
              No job applications found
            </p>
            <Button onClick={openDialog}>Add a Job Application</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {jobApplications.map((jobApplication) => (
              <JobApplicationCard
                jobApplication={jobApplication}
                key={jobApplication.id}
              />
            ))}
          </div>
        )}

        <Paginate totalPages={totalPages} />
      </div>
    </div>
  )
}

export { JobApplicationsGrid }
