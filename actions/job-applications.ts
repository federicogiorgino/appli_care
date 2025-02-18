'use server'

import { currentUser } from '@clerk/nextjs/server'
import { JobApplicationStatus, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import {
  editJobApplicationSchema,
  jobApplicationSchema,
} from '@/schemas/job-application'
import {
  EditJobApplicationValues,
  JobApplicationValues,
} from '@/types/job-application'

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
          coverLetter: true,
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

export async function deleteJobApplication(jobApplicationId: string) {
  try {
    const user = await currentUser()

    if (!user) {
      return { status: 'error', error: 'Unauthorized' }
    }

    const deletedJobApplication = await prisma.jobApplication.delete({
      where: {
        id: jobApplicationId,
        userId: user.id,
      },
    })

    if (!deletedJobApplication) {
      return { status: 'error', error: 'Job application not found.' }
    }

    return {
      status: 'success',
      message: 'Job application deleted successfully',
    }
  } catch (error) {
    return { status: 'error', error: 'Error deleting job application' }
  }
}

export async function updateJobApplication(
  data: JobApplicationValues,
  jobApplicationId: string
) {
  try {
    const user = await currentUser()

    if (!user) {
      return { status: 'error', error: 'Unauthorized' }
    }

    const validated = jobApplicationSchema.safeParse(data)

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors }
    }

    console.log(data)
    await prisma.jobApplication.update({
      where: {
        id: jobApplicationId,
        userId: user.id,
      },
      data: validated.data,
    })
    return { status: 'success' }
  } catch (error) {
    return { status: 'error', error: 'Error updating job application' }
  }
}
