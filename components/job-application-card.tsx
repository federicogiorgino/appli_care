'use client'

import { Company, Contact, JobApplication, Resume } from '@prisma/client'
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

interface JobApplicationCardProps {
  jobApplication: JobApplication & {
    contact: Contact | null
    company: Company | null
    resume: Resume | null
  }
}

export function JobApplicationCard({
  jobApplication,
}: JobApplicationCardProps) {
  return (
    <Link href={`/job-applications/${jobApplication.id}`}>
      <Card className="flex h-full flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <JobStatusIcon status={jobApplication.applicationStatus} />

            <div>
              <h3 className="text-xl font-semibold">
                {truncateString(jobApplication.jobTitle)}
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
              <DropdownMenuItem onClick={() => {}}>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>
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
              <span>
                {format(jobApplication.applicationDate, 'MMM d, yyyy')}
              </span>
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
    </Link>
  )
}
