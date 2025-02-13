'use server'

import { currentUser } from '@clerk/nextjs/server'

import { prisma } from '@/lib/prisma'

import { resumeSchema } from '@/schemas/job-application'
import { ResumeValues } from '@/types/job-application'

export async function getResumes() {
  try {
    const user = await currentUser()

    if (!user) {
      return { status: 'error', error: 'Unauthorized' }
    }

    const resumes = await prisma.resume.findMany({
      where: {
        userId: user.id,
      },
      orderBy: { name: 'asc' },
    })
    return { status: 'success', data: resumes }
  } catch (error) {
    return { status: 'error', error: 'Error fetching resumens' }
  }
}

export async function createResume(data: ResumeValues) {
  try {
    const user = await currentUser()

    if (!user) {
      return { status: 'error', error: 'Unauthorized' }
    }

    const validated = resumeSchema.safeParse(data)

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors }
    }

    await prisma.resume.create({
      data: {
        userId: user.id,
        ...validated.data,
      },
    })

    return { status: 'success' }
  } catch (error) {
    return { status: 'error', error: 'Error creating resume' }
  }
}
