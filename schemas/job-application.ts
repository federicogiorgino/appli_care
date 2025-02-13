import {
  JobApplicationStatus,
  JobCompanySize,
  JobContactRole,
  JobInterviewStage,
  JobType,
} from '@prisma/client'
import * as z from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email().optional(),
  phoneNumber: z.string().min(10).max(15).optional(),
  role: z.enum([
    JobContactRole.RECRUITER,
    JobContactRole.INTERVIEWER,
    JobContactRole.HIRING_MANAGER,
    JobContactRole.OTHER,
  ]),
})

export const companySchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters'),
  website: z.string().url().optional(),
  industry: z.string().optional(),
  location: z.string().optional(),
  size: z.enum([
    JobCompanySize.SMALL,
    JobCompanySize.MEDIUM,
    JobCompanySize.LARGE,
  ]),
})

export const jobApplicationSchema = z.object({
  jobTitle: z.string().min(2, 'Job title must be at least 2 characters'),
  jobType: z.enum([
    JobType.CONTRACT,
    JobType.FREELANCE,
    JobType.FULL_TIME,
    JobType.INTERNSHIP,
    JobType.PART_TIME,
    JobType.OTHER,
  ]),
  location: z.string().optional(),
  companyId: z.string().optional(),
  salaryExpectation: z.string().optional(),
  applicationDate: z.date().default(() => new Date()),
  applicationDeadline: z.date().optional(),
  applicationStatus: z.enum([
    JobApplicationStatus.APPLIED,
    JobApplicationStatus.INTERVIEWING,
    JobApplicationStatus.OFFER,
    JobApplicationStatus.REJECTED,
  ]),
  source: z.string().optional(),
  resumeId: z.string().optional(),
  coverLetterId: z.string().optional(),
  interviewNotes: z.array(z.string()).min(1, 'At least one note is required'),
  interviewStage: z.enum([
    JobInterviewStage.TECHNICAL_INTERVIEW,
    JobInterviewStage.FINAL_ROUND,
    JobInterviewStage.OFFER,
    JobInterviewStage.ONSITE_INTERVIEW,
    JobInterviewStage.PHONE_SCREEN,
    JobInterviewStage.OTHER,
  ]),
  contactId: z.string().optional(),
})

export const resumeSchema = z.object({
  name: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  url: z.string({
    message: 'Please upload a curriculum file.',
  }),
})

export const coverLetterSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  body: z.string().min(100, {
    message: 'Body must be at least 100 characters.',
  }),
})
