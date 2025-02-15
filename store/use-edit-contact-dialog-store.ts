import { Contact } from '@prisma/client'
import { create } from 'zustand'

type EditContactDialogStore = {
  isOpen: boolean
  contact: Contact | null
  openDialog: (contact: Contact) => void
  closeDialog: () => void
}

export const useEditContactDialogStore = create<EditContactDialogStore>(
  (set) => ({
    isOpen: false,
    contact: null,
    openDialog: (contact) => set({ isOpen: true, contact }),
    closeDialog: () => set({ isOpen: false, contact: null }),
  })
)
