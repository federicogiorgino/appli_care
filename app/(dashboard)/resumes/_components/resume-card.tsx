'use client'

import { Resume } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Calendar, Download, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { downloadPdf } from '@/lib/utils'
import { truncateString } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icons } from '@/components/ui/icons'
import { Skeleton } from '@/components/ui/skeleton'

import { deleteResume } from '@/actions/resumes'
import { useEditResumeDialog } from '@/hooks/use-edit-resume-dialog'

type ResumeCardProps = {
  resume: Resume
}

function ResumCard({ resume }: ResumeCardProps) {
  const queryClient = useQueryClient()
  const { openDialog } = useEditResumeDialog()

  const handleEdit = () => {
    openDialog(resume)
  }

  const handleDownload = (resume: Resume) => {
    downloadPdf(resume.url, resume.name)
  }
  const mutation = useMutation({
    mutationFn: (resumeId: string) => deleteResume(resumeId),
    onSuccess: (data) => {
      if (data.status === 'success') {
        // Invalidate and refetch the resumes query
        queryClient.invalidateQueries({ queryKey: ['resumes'] })
        toast.success('Resume deleted successfully')
      } else {
        toast.error(data.error || 'Failed to delete resume')
      }
    },
    onError: (_) => {
      toast.error('An error occurred while deleting the resume')
    },
  })
  return (
    <Card className="relative">
      <CardHeader className="pb-2">
        <div className="absolute right-2 top-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleDownload(resume)}>
                <Download className="mr-2 h-4 w-4" />
                <span>Download</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit()}>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => mutation.mutate(resume.id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center pt-2">
        <Icons.pdf className="mb-4 h-24 w-24 text-primary" />
        <CardTitle className="mb-2 text-center text-lg font-semibold">
          {truncateString(resume.name)}.pdf
        </CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{format(resume.createdAt, 'dd MMM yyyy')}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function ResumeCardSkeleton() {
  return (
    <Card className="relative">
      <CardHeader className="pb-2">
        <div className="absolute right-2 top-2">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center pt-2">
        <Skeleton className="mb-4 h-24 w-24 rounded" />
        <Skeleton className="mb-2 h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  )
}
export { ResumCard, ResumeCardSkeleton }
