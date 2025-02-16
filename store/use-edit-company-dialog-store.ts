import { Company } from '@prisma/client'
import { create } from 'zustand'

type EditCompanyDialogStore = {
  isOpen: boolean
  company: Company | null
  openDialog: (company: Company) => void
  closeDialog: () => void
}

export const useEditCompanyDialogStore = create<EditCompanyDialogStore>(
  (set) => ({
    isOpen: false,
    company: null,
    openDialog: (company) => set({ isOpen: true, company }),
    closeDialog: () => set({ isOpen: false, company: null }),
  })
)
