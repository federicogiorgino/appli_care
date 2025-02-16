import { Resume } from '@prisma/client'
import { create } from 'zustand'

type EditResumeDialogStore = {
  isOpen: boolean
  resume: Resume | null
  openDialog: (resume: Resume) => void
  closeDialog: () => void
}

export const useEditResumeDialogStore = create<EditResumeDialogStore>(
  (set) => ({
    isOpen: false,
    resume: null,
    openDialog: (resume) => set({ isOpen: true, resume }),
    closeDialog: () => set({ isOpen: false, resume: null }),
  })
)
