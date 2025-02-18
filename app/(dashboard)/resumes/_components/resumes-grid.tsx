'use client'

import { Plus, Search } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { ResumCard, ResumeCardSkeleton } from './resume-card'
import useDialog from '@/hooks/use-dialog'
import { useResumes } from '@/hooks/use-resumes'

function ResumesGrid() {
  const { resumes, isLoading } = useResumes()
  const { openDialog } = useDialog('resumeCreateDialog')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredResumes = resumes.filter((resume) =>
    resume.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-5 text-4xl font-bold">Resumes</h1>

      <div className="grid gap-8">
        <div className="flex w-full items-center justify-between gap-8">
          <Input
            className="max-w-sm"
            type="search"
            placeholder="Filter resumes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button onClick={openDialog} variant="outline">
            <Plus />
            <span className="hidden md:block"> Add New Resume</span>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-8">
            {[...Array(6)].map((_, index) => (
              <ResumeCardSkeleton key={index} />
            ))}
          </div>
        ) : resumes.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center">
            <p className="mb-4 text-lg text-muted-foreground">
              No resumes found
            </p>
            <Button onClick={openDialog}>Add a new Resume</Button>
          </div>
        ) : filteredResumes.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center">
            <p className="mb-4 text-lg text-muted-foreground">
              No resumes match your search
            </p>
            <Button onClick={() => setSearchTerm('')}>Clear Search</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-8">
            {filteredResumes.map((resume) => (
              <ResumCard resume={resume} key={resume.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export { ResumesGrid }
