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
    <div>
      <h1 className="mb-5 text-4xl font-bold">Resumes</h1>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8">
          {[...Array(6)].map((_, index) => (
            <ResumeCardSkeleton key={index} />
          ))}
        </div>
      ) : resumes.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center">
          <p className="mb-4 text-lg text-muted-foreground">No resumes found</p>
          <Button onClick={openDialog}>Add a new Resume</Button>
        </div>
      ) : (
        <div className="grid gap-8">
          <div className="flex w-full items-center justify-between gap-8">
            <div className="relative w-full">
              <Input
                className="peer ps-9"
                type="search"
                placeholder="Search resumes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <Search size={16} strokeWidth={2} aria-hidden="true" />
              </div>
            </div>

            <Button onClick={openDialog} variant="outline">
              <Plus /> Add a new Resume
            </Button>
          </div>

          {filteredResumes.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center">
              <p className="mb-4 text-lg text-muted-foreground">
                No resumes match your search
              </p>
              <Button onClick={() => setSearchTerm('')}>Clear Search</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8">
              {filteredResumes.map((resume) => (
                <ResumCard resume={resume} key={resume.id} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export { ResumesGrid }
