'use server'

import { currentUser } from '@clerk/nextjs/server'

import { prisma } from '@/lib/prisma'

import { contactSchema } from '@/schemas/job-application'
import { ContactValues } from '@/types/job-application'

export async function getContacts() {
  try {
    const user = await currentUser()

    if (!user) {
      return { status: 'error', error: 'Unauthorized' }
    }

    const contacts = await prisma.contact.findMany({
      where: {
        userId: user.id,
      },
      orderBy: { name: 'asc' },
    })

    return { status: 'success', data: contacts }
  } catch (error) {
    return { status: 'error', error: 'Error fetching contacts' }
  }
}

export async function createContact(data: ContactValues) {
  try {
    const user = await currentUser()

    if (!user) {
      return { status: 'error', error: 'Unauthorized' }
    }

    const validated = contactSchema.safeParse(data)

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors }
    }

    await prisma.contact.create({
      data: {
        userId: user.id,
        ...validated.data,
      },
    })
    return { status: 'success' }
  } catch (error) {
    console.error(error)
    return { status: 'error', error: 'Error adding contact' }
  }
}
