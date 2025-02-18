import { useEditContactDialogStore } from '@/store/use-edit-contact-dialog-store'

export const useEditContactDialog = () => {
  const { isOpen, contact, openDialog, closeDialog } =
    useEditContactDialogStore()
  return { isOpen, contact, openDialog, closeDialog }
}
