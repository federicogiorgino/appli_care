'use client'

import {
  Company,
  Contact,
  CoverLetter,
  JobApplication,
  Resume,
} from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import {
  Calendar,
  Download,
  MapPin,
  MoreVertical,
  Pencil,
  Trash2,
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

import { capitalizeFirstLetter, truncateString } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { JobStatusIcon } from './job-status-icon'
import { Skeleton } from './ui/skeleton'
import { deleteJobApplication } from '@/actions/job-applications'
import { useEditJobApplicationDialog } from '@/hooks/use-edit-job-application-dialog'

interface JobApplicationCardProps {
  jobApplication: JobApplication & {
    contact: Contact | null
    company: Company | null
    resume: Resume | null
    coverLetter: CoverLetter | null
  }
}

function JobApplicationCard({ jobApplication }: JobApplicationCardProps) {
  const queryClient = useQueryClient()
  const { openDialog } = useEditJobApplicationDialog()

  const mutation = useMutation({
    mutationFn: (jobApplicationId: string) =>
      deleteJobApplication(jobApplicationId),
    onSuccess: (data) => {
      if (data.status === 'success') {
        // Invalidate and refetch the companies query
        queryClient.invalidateQueries({ queryKey: ['jobApplications'] })
        toast.success('Job application deleted successfully')
      } else {
        toast.error(data.error || 'Failed to delete job applciation')
      }
    },
    onError: (error) => {
      toast.error('An error occurred while deleting the job applciation')
    },
  })

  return (
    // <Link href={`/job-applications/${jobApplication.id}`}>
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <JobStatusIcon status={jobApplication.applicationStatus} />

          <div>
            <h3 className="text-xl font-semibold">
              {truncateString(jobApplication.jobTitle, 30)}
            </h3>
            <p className="text-sm text-muted-foreground">
              {jobApplication.company?.name}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault()
                openDialog({
                  id: jobApplication.id,
                  userId: jobApplication.userId,
                  jobTitle: jobApplication.jobTitle,
                  jobType: jobApplication.jobType,
                  location: jobApplication.location,
                  salaryExpectation: jobApplication.salaryExpectation as any,
                  applicationDate: jobApplication.applicationDate,
                  applicationDeadline: jobApplication.applicationDeadline,
                  applicationStatus: jobApplication.applicationStatus,
                  source: jobApplication.source,
                  interviewNotes: jobApplication.interviewNotes,
                  interviewStage: jobApplication.interviewStage,
                  resumeId: jobApplication.resume?.id,
                  coverLetterId: jobApplication.coverLetter?.id,
                  companyId: jobApplication.company?.id,
                  contactId: jobApplication.contact?.id,
                })
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault()
                mutation.mutate(jobApplication.id)
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 shrink-0" />
            <span className="truncate">
              {capitalizeFirstLetter(jobApplication.location)}
            </span>
          </div>

          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 shrink-0" />
            <span>{format(jobApplication.applicationDate, 'MMM d, yyyy')}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
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
      </CardFooter>
    </Card>
    // </Link>
  )
}

function JobApplicationCardSkeleton() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="mt-2 h-4 w-32" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <div className="flex items-center">
            <Skeleton className="mr-2 h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center">
            <Skeleton className="mr-2 h-4 w-4" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-24" />
        </div>
      </CardFooter>
    </Card>
  )
}

export { JobApplicationCard, JobApplicationCardSkeleton }
