'use server'

import { currentUser } from '@clerk/nextjs/server'

import { prisma } from '@/lib/prisma'

import { coverLetterSchema } from '@/schemas/job-application'
import { CoverLetterValues } from '@/types/job-application'

export async function getCoverLetters() {
  try {
    const user = await currentUser()

    if (!user) {
      return { status: 'error', error: 'Unauthorized' }
    }

    const coverLetters = await prisma.coverLetter.findMany({
      where: {
        userId: user.id,
      },
      orderBy: { name: 'asc' },
    })
    return { status: 'success', data: coverLetters }
  } catch (error) {
    return { status: 'error', error: 'Error fetching resumens' }
  }
}

export async function createCoverLetter(data: CoverLetterValues) {
  try {
    const user = await currentUser()

    if (!user) {
      return { status: 'error', error: 'Unauthorized' }
    }

    const validated = coverLetterSchema.safeParse(data)

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors }
    }

    await prisma.coverLetter.create({
      data: {
        userId: user.id,
        ...validated.data,
      },
    })

    return { status: 'success' }
  } catch (error) {
    return { status: 'error', error: 'Error creating cover letter' }
  }
}
