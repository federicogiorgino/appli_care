import { useDialogStore } from '@/store/use-dialog-store'

const useDialog = (id: string) => {
  const { openDialogs, openDialog, closeDialog, toggleDialog } =
    useDialogStore()
  const isOpen = !!openDialogs[id]
  return {
    isOpen,
    openDialog: () => openDialog(id),
    closeDialog: () => closeDialog(id),
    toggleDialog: () => toggleDialog(id),
  }
}

export default useDialog
