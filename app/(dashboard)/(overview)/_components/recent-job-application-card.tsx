import { Company, Contact, JobApplication, Resume } from '@prisma/client'
import { format } from 'date-fns'
import { Calendar } from 'lucide-react'

import { JobStatusIcon } from '@/components/job-status-icon'
import { Badge } from '@/components/ui/badge'

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

          <div className="space-y-1">
            <h3 className="text-xl font-semibold">{jobApplication.jobTitle}</h3>

            <p className="text-sm text-muted-foreground">
              {jobApplication.company?.name}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            {jobApplication.applicationStatus.charAt(0).toUpperCase() +
              jobApplication.applicationStatus.slice(1).toLowerCase()}
          </Badge>
          <Badge variant="secondary">
            {jobApplication.jobType.charAt(0).toUpperCase() +
              jobApplication.jobType.slice(1).toLowerCase()}
          </Badge>
          <Badge variant="secondary">
            {jobApplication.interviewStage.charAt(0).toUpperCase() +
              jobApplication.interviewStage.slice(1).toLowerCase()}
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

export { RecentJobApplicationCard }
