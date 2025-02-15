import { Company, Contact, JobApplication, Resume } from '@prisma/client'
import { format } from 'date-fns'
import { Calendar } from 'lucide-react'

import { capitalizeFirstLetter } from '@/lib/utils'

import { JobStatusIcon } from '@/components/job-status-icon'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

type RecentJobApplicationCardProps = {
  jobApplication: JobApplication & {
    contact: Contact | null
    company: Company | null
    resume: Resume | null
  }
}

function RecentJobApplicationCard({
  jobApplication,
}: RecentJobApplicationCardProps) {
  const { applicationDate, applicationDeadline } = jobApplication
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border pb-4 last:border-b-0">
      <div className="flex flex-col justify-between gap-4">
        <div className="flex items-center gap-3">
          <JobStatusIcon status={jobApplication.applicationStatus} />

          <div>
            <h3 className="text-xl font-semibold">{jobApplication.jobTitle}</h3>

            <p className="text-sm text-muted-foreground">
              {jobApplication.company?.name}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            {capitalizeFirstLetter(jobApplication.applicationStatus)}
          </Badge>
          <Badge variant="secondary">
            {capitalizeFirstLetter(jobApplication.jobType)}
          </Badge>
          <Badge variant="secondary">
            {capitalizeFirstLetter(jobApplication.interviewStage)}
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>
          {applicationDeadline
            ? `Deadline: ${applicationDeadline.toLocaleDateString()}`
            : `Applied: ${applicationDate.toLocaleDateString()}`}
        </span>
      </div>
    </div>
  )
}

function RecentJobApplicationCardSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border pb-4 last:border-b-0">
      <div className="flex flex-col justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-6 rounded-full" />
          <div>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  )
}

export { RecentJobApplicationCard, RecentJobApplicationCardSkeleton }
