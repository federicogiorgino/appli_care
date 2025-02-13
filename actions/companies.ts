'use server'

import { currentUser } from '@clerk/nextjs/server'

import { prisma } from '@/lib/prisma'

import { companySchema } from '@/schemas/job-application'
import { CompanyValues } from '@/types/job-application'

export async function getCompanies() {
  try {
    const user = await currentUser()

    if (!user) {
      return { status: 'error', error: 'Unauthorized' }
    }

    const companies = await prisma.company.findMany({
      where: {
        userId: user.id,
      },
      orderBy: { name: 'asc' },
    })
    return { status: 'success', data: companies }
  } catch (error) {
    return { status: 'error', error: 'Error fetching companies' }
  }
}

export async function createCompany(data: CompanyValues) {
  try {
    const user = await currentUser()

    if (!user) {
      return { status: 'error', error: 'Unauthorized' }
    }

    const validated = companySchema.safeParse(data)

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors }
    }

    await prisma.company.create({
      data: {
        userId: user.id,
        ...validated.data,
      },
    })
    return { status: 'success' }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: 'Error adding company' }
  }
}
