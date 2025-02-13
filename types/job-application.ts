import { z } from 'zod'

import {
  companySchema,
  contactSchema,
  coverLetterSchema,
  jobApplicationSchema,
  resumeSchema,
} from '@/schemas/job-application'

export type JobApplicationValues = z.infer<typeof jobApplicationSchema>
export type ContactValues = z.infer<typeof contactSchema>
export type CompanyValues = z.infer<typeof companySchema>
export type ResumeValues = z.infer<typeof resumeSchema>
export type CoverLetterValues = z.infer<typeof coverLetterSchema>
export type JobStats = {
  status: string
  jobs: {
    lastMonth: number
    currentMonth: number
  }
}

export type JobByTypeStats = {
  month: string
  FULL_TIME: number
  PART_TIME: number
  CONTRACT: number
  INTERNSHIP: number
  FREELANCE: number
  OTHERS: number
}

export type JobByStatusStats = {
  month: string
  APPLIED: number
  INTERVIEWING: number
  OFFER: number
  REJECTED: number
}

export type JobApplicationStats = {
  byStatus: JobByStatusStats[]
  byType: JobByTypeStats[]
}
