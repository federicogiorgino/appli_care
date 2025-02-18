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

export async function updateContact(data: ContactValues, contactId: string) {
  try {
    const user = await currentUser()

    if (!user) {
      return { status: 'error', error: 'Unauthorized' }
    }

    const validated = contactSchema.safeParse(data)

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors }
    }

    await prisma.contact.update({
      where: {
        id: contactId,
        userId: user.id,
      },
      data: validated.data,
    })
    return { status: 'success' }
  } catch (error) {
    return { status: 'error', error: 'Error updating contact' }
  }
}

export async function deleteContact(contactId: string) {
  try {
    const user = await currentUser()

    if (!user) {
      return { status: 'error', error: 'Unauthorized' }
    }

    const deletedContact = await prisma.contact.delete({
      where: {
        id: contactId,
        userId: user.id,
      },
    })

    if (!deletedContact) {
      return { status: 'error', error: 'Contact not found.' }
    }

    return { status: 'success', message: 'Contact deleted successfully' }
  } catch (error) {
    return { status: 'error', error: 'Error deleting contact' }
  }
}
