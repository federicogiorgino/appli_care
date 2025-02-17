'use client'

import { JobApplicationStatus } from '@prisma/client'
import { Plus, Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import { JobApplicationCard } from '@/components/job-application-card'
import { Paginate } from '@/components/paginate'
import { PerPageSelect } from '@/components/per-page-select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
  const { jobApplications, totalPages } = useJobApplications(
    { q, status },
    page,
    perPage
  )

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-5 text-4xl font-bold">Job Applications</h1>
      <div className="grid gap-8">
        <div className="flex w-full items-center justify-between gap-8">
          {/* <Input
            className="max-w-sm"
            type="search"
            placeholder="Filter job applications..."
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
          /> */}
          <Searchbar />

          <Button onClick={openDialog} variant="outline">
            <Plus />
            <span className="hidden md:block"> Add New Job Application</span>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          {jobApplications.map((el) => (
            <JobApplicationCard jobApplication={el} />
          ))}

          {/* Skeleton will map through the per page */}
        </div>
        <Paginate totalPages={totalPages} />
      </div>
    </div>
  )
}

export { JobApplicationsGrid }
