import { z } from 'zod'

import {
  companySchema,
  contactSchema,
  coverLetterSchema,
  editJobApplicationSchema,
  jobApplicationSchema,
  resumeSchema,
} from '@/schemas/job-application'

export type JobApplicationValues = z.infer<typeof jobApplicationSchema>
export type EditJobApplicationValues = z.infer<typeof editJobApplicationSchema>
export type ContactValues = z.infer<typeof contactSchema>
export type CompanyValues = z.infer<typeof companySchema>
export type ResumeValues = z.infer<typeof resumeSchema>
export type CoverLetterValues = z.infer<typeof coverLetterSchema>
