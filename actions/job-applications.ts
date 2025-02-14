'use server'

import { currentUser } from '@clerk/nextjs/server'
import { JobApplicationStatus, JobType } from '@prisma/client'
import { addMonths, startOfMonth, subMonths } from 'date-fns'
import { format } from 'date-fns'

import { prisma } from '@/lib/prisma'

import { jobApplicationSchema } from '@/schemas/job-application'
import { JobApplicationValues } from '@/types/job-application'
import { JobApplicationStats, JobByTypeStats, JobStats } from '@/types/stats'

export async function createJobApplication(data: JobApplicationValues) {
  try {
    const user = await currentUser()

    if (!user) {
      return { status: 'error', error: 'Unauthorized' }
    }

    const validated = jobApplicationSchema.safeParse(data)

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors }
    }

    await prisma.jobApplication.create({
      data: {
        userId: user.id,
        ...validated.data,
      },
    })

    return { status: 'success' }
  } catch (error) {
    return { status: 'error', error: 'Error creating job application' }
  }
}

export const getRecentJobApplications = async () => {
  try {
    const user = await currentUser()

    if (!user) {
      return { status: 'error', error: 'Unauthorized' }
    }

    const recentApplications = await prisma.jobApplication.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        applicationDate: 'desc',
      },
      include: {
        company: true,
        contact: true,
        resume: true,
      },
      take: 3,
    })

    return {
      status: 'success',
      data: recentApplications,
    }
  } catch (error) {
    return { status: 'error', error: 'Error fetching recent job applications' }
  }
}
