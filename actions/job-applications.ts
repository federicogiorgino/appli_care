'use server'

import { currentUser } from '@clerk/nextjs/server'
import { JobApplicationStatus, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { jobApplicationSchema } from '@/schemas/job-application'
import { JobApplicationValues } from '@/types/job-application'

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
      take: 8,
    })

    return {
      status: 'success',
      data: recentApplications,
    }
  } catch (error) {
    return { status: 'error', error: 'Error fetching recent job applications' }
  }
}

export const getJobApplications = async (
  filters: {
    q: string
    status: JobApplicationStatus | ''
  },
  page: number,
  itemsPerPage: number
) => {
  try {
    const user = await currentUser()

    if (!user) {
      return { status: 'error', error: 'Unauthorized' }
    }

    const where: Prisma.JobApplicationWhereInput = {
      userId: user.id,
      AND: [
        filters.q
          ? {
              OR: [{ jobTitle: { contains: filters.q, mode: 'insensitive' } }],
            }
          : {},
        filters.status
          ? { applicationStatus: filters.status as JobApplicationStatus }
          : {},
      ],
    }

    const [jobApplications, totalCount] = await Promise.all([
      prisma.jobApplication.findMany({
        where,
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        include: {
          company: true,
          contact: true,
          resume: true,
        },
      }),
      prisma.jobApplication.count({ where }),
    ])

    return {
      status: 'success',
      data: jobApplications,
      totalPages: Math.ceil(totalCount / itemsPerPage),
    }
  } catch (error) {
    return { status: 'error', error: 'Error fetching recent job applications' }
  }
}
