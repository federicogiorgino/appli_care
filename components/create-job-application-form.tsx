'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  CoverLetter,
  JobApplicationStatus,
  JobInterviewStage,
  JobType,
  Resume,
} from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { CalendarIcon, Loader2, Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'

import { BulletListInput } from '@/components/bullet-list-input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { createJobApplication } from '@/actions/job-applications'
import { useCompanies } from '@/hooks/use-companies'
import { useContacts } from '@/hooks/use-contacts'
import { useCoverLetters } from '@/hooks/use-cover-letters'
import useDialog from '@/hooks/use-dialog'
import { useResumes } from '@/hooks/use-resumes'
import { jobApplicationSchema } from '@/schemas/job-application'
import { JobApplicationValues } from '@/types/job-application'

const steps = [
  {
    id: 1,
    title: 'Basic Informations',
    fields: ['jobTitle', 'jobType', 'location', 'companyId'],
  },
  {
    id: 2,
    title: 'Application Details',
    fields: [
      'applicationDate',
      'applicationDeadline',
      'applicationStatus',
      'source',
      'salaryExptectation',
    ],
  },
  { id: 3, title: 'Documents', fields: ['resumeId', 'coverLetterUsed'] },
  {
    id: 4,
    title: 'Job Interview Details',
    fields: ['contactId', 'interviewNotes', 'interviewStage'],
  },
]

function CreateJobApplicationForm() {
  const queryClient = useQueryClient()
  const [currentStep, setCurrentStep] = useState(0)

  const { contacts } = useContacts()
  const { companies } = useCompanies()
  const { resumes } = useResumes()
  const { coverLetters } = useCoverLetters()

  const { closeDialog } = useDialog('jobApplicationCreateDialog')

  const { openDialog: openCoverLetterCreateDialog } = useDialog(
    'coverLetterCreateDialog'
  )
  const { openDialog: openResumeCreateDialog } = useDialog('resumeCreateDialog')
  const { openDialog: openCompanyCreateDialog } = useDialog(
    'companyCreateDialog'
  )
  const { openDialog: openContactCreateDialog } = useDialog(
    'contactCreateDialog'
  )

  const form = useForm<JobApplicationValues>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      jobType: JobType.OTHER,
      applicationDate: new Date(),
      applicationStatus: JobApplicationStatus.APPLIED,
      interviewStage: JobInterviewStage.OTHER,
      interviewNotes: [],
    },
  })
  const { trigger } = form

  const nextStep = async () => {
    const fields = steps[currentStep].fields as Array<
      keyof JobApplicationValues
    >
    const output = await trigger(fields, { shouldFocus: true })
    if (output) {
      setCurrentStep((step) => step + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep((step) => step - 1)
  }

  const mutation = useMutation({
    mutationFn: createJobApplication,
    onSuccess: (data) => {
      if (data.status === 'success') {
        queryClient.invalidateQueries({ queryKey: ['jobApplications'] })
        queryClient.invalidateQueries({
          queryKey: ['monthlyJobStats'],
        })
        queryClient.invalidateQueries({
          queryKey: ['recentJobApplications'],
        })
        queryClient.invalidateQueries({
          queryKey: ['yearlyJobApplicationsStats'],
        })

        toast.success('Job application has been added.')
        closeDialog()
        form.reset()
      } else {
        toast.error('Unable to add job application.')
        closeDialog()
      }
    },
    onError: () => {
      toast.error('There was a problem with your request.')
    },
  })

  const onSubmit = async (data: JobApplicationValues) => {
    if (currentStep === 3) mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="z-40 space-y-6">
        <div>
          <div className="mx-auto w-full">
            <div className="relative pt-1">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <span className="inline-block rounded-full bg-primary-foreground px-2 py-1 text-xs font-semibold text-primary">
                    {steps[currentStep].title}
                  </span>
                </div>
                <div className="text-right">
                  <span className="inline-block text-xs font-semibold text-primary">
                    {Math.round((currentStep / (steps.length - 1)) * 100)}%
                  </span>
                </div>
              </div>
              <div className="mb-4 flex h-2 overflow-hidden rounded bg-primary/20 text-xs">
                <div
                  style={{
                    width: `${(currentStep / (steps.length - 1)) * 100}%`,
                  }}
                  className="flex flex-col justify-center whitespace-nowrap bg-primary text-center text-white shadow-none transition-all duration-500 ease-in-out"
                ></div>
              </div>
            </div>
          </div>
        </div>

        {currentStep === 0 && (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter post title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <div className="flex gap-2">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select company" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companies?.map((company: any) => (
                            <SelectItem key={company.id} value={company.id}>
                              {company.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openCompanyCreateDialog()}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123 Cool Street, Cool Place"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={JobType.CONTRACT}>
                          Contract
                        </SelectItem>
                        <SelectItem value={JobType.FREELANCE}>
                          Freelance
                        </SelectItem>
                        <SelectItem value={JobType.FULL_TIME}>
                          Full Time
                        </SelectItem>
                        <SelectItem value={JobType.INTERNSHIP}>
                          Internship
                        </SelectItem>
                        <SelectItem value={JobType.PART_TIME}>
                          Part Time
                        </SelectItem>
                        <SelectItem value={JobType.OTHER}>Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}
        {currentStep === 1 && (
          <>
            <FormField
              control={form.control}
              name="applicationStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select application status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={JobApplicationStatus.APPLIED}>
                        Applied
                      </SelectItem>
                      <SelectItem value={JobApplicationStatus.INTERVIEWING}>
                        Interviewing
                      </SelectItem>
                      <SelectItem value={JobApplicationStatus.OFFER}>
                        Offered
                      </SelectItem>
                      <SelectItem value={JobApplicationStatus.REJECTED}>
                        Rejected
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="applicationDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Application Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="applicationDeadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Application Deadline</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. LinkedIn, Company Website"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Where you found this job opportunity.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salaryExpectation"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Salary Expectation</FormLabel>
                  <FormControl>
                    <div className="relative flex rounded-lg shadow-sm shadow-black/5">
                      <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground">
                        €
                      </span>
                      <Input
                        className="-me-px rounded-e-none ps-6 shadow-none"
                        placeholder="0.00"
                        type="number"
                        {...field}
                      />
                      <span className="-z-10 inline-flex items-center rounded-e-lg border border-input bg-background px-3 text-sm text-muted-foreground">
                        EUR
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {currentStep === 2 && (
          <>
            <FormField
              control={form.control}
              name="resumeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume</FormLabel>
                  <div className="flex gap-2">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select resume" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resumes?.map((resume: Resume) => (
                          <SelectItem key={resume.id} value={resume.id}>
                            {resume.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openResumeCreateDialog()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverLetterId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Letter</FormLabel>
                  <div className="flex gap-2">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select cover letter" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {coverLetters?.map((letter: CoverLetter) => (
                          <SelectItem key={letter.id} value={letter.id}>
                            {letter.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openCoverLetterCreateDialog()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {currentStep === 3 && (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="contactId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact</FormLabel>
                    <div className="flex gap-2">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select contact" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {contacts?.map((contact: any) => (
                            <SelectItem key={contact.id} value={contact.id}>
                              {contact.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openContactCreateDialog()}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interviewStage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interview Stage</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select interview stage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={JobInterviewStage.OFFER}>
                          Offer
                        </SelectItem>
                        <SelectItem value={JobInterviewStage.ONSITE_INTERVIEW}>
                          Onsite Interview
                        </SelectItem>
                        <SelectItem value={JobInterviewStage.FINAL_ROUND}>
                          Final Round
                        </SelectItem>
                        <SelectItem value={JobInterviewStage.PHONE_SCREEN}>
                          Phone Screen
                        </SelectItem>
                        <SelectItem
                          value={JobInterviewStage.TECHNICAL_INTERVIEW}
                        >
                          Technical Interview
                        </SelectItem>
                        <SelectItem value={JobInterviewStage.OTHER}>
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="interviewNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interview notes</FormLabel>
                  <FormDescription className="text-xs">
                    Add items to your bullet list.
                  </FormDescription>
                  <BulletListInput
                    value={field.value}
                    onChange={field.onChange}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div className="flex justify-end gap-2">
          {currentStep > 0 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="submit" disabled={mutation.isPending}>
              {!mutation.isPending && 'Create'}
              {mutation.isPending && <Loader2 className="animate-spin" />}
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}

export { CreateJobApplicationForm }
