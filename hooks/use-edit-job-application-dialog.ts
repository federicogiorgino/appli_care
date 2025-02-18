import { useEditJobApplicationDialogStore } from '@/store/use-edit-job-application-dialog-store'

export const useEditJobApplicationDialog = () => {
  const { isOpen, jobApplication, openDialog, closeDialog } =
    useEditJobApplicationDialogStore()
  return { isOpen, jobApplication, openDialog, closeDialog }
}
