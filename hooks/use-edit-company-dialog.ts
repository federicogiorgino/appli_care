import { useEditCompanyDialogStore } from '@/store/use-edit-company-dialog-store'

export const useEditCompanyDialog = () => {
  const { isOpen, company, openDialog, closeDialog } =
    useEditCompanyDialogStore()
  return { isOpen, company, openDialog, closeDialog }
}
