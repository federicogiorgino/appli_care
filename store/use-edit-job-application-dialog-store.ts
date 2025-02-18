import { JobApplication } from '@prisma/client'
import { create } from 'zustand'

import { JobApplicationValues } from '@/types/job-application'

type EditJobApplicationDialogStore = {
  isOpen: boolean
  jobApplication: any | null
  openDialog: (jobApplication: any) => void
  closeDialog: () => void
}

export const useEditJobApplicationDialogStore =
  create<EditJobApplicationDialogStore>((set) => ({
    isOpen: false,
    jobApplication: null,
    openDialog: (jobApplication) => set({ isOpen: true, jobApplication }),
    closeDialog: () => set({ isOpen: false, jobApplication: null }),
  }))
