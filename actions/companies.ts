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

export async function updateCompany(data: CompanyValues, contactId: string) {
  try {
    const user = await currentUser()

    if (!user) {
      return { status: 'error', error: 'Unauthorized' }
    }

    const validated = companySchema.safeParse(data)

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors }
    }

    await prisma.company.update({
      where: {
        id: contactId,
        userId: user.id,
      },
      data: validated.data,
    })
    return { status: 'success' }
  } catch (error) {
    return { status: 'error', error: 'Error updating company' }
  }
}

export async function deleteCompany(companyId: string) {
  try {
    const user = await currentUser()

    if (!user) {
      return { status: 'error', error: 'Unauthorized' }
    }

    const deletedCompany = await prisma.company.delete({
      where: {
        id: companyId,
        userId: user.id,
      },
    })

    if (!deletedCompany) {
      return { status: 'error', error: 'Company not found.' }
    }

    return { status: 'success', message: 'Company deleted successfully' }
  } catch (error) {
    return { status: 'error', error: 'Error deleting company' }
  }
}
