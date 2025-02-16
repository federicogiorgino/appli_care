import { useEditResumeDialogStore } from '@/store/use-edit-resume-dialog-store'

export const useEditResumeDialog = () => {
  const { isOpen, resume, openDialog, closeDialog } = useEditResumeDialogStore()
  return { isOpen, resume, openDialog, closeDialog }
}
