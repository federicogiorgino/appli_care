import { create } from 'zustand'

type DialogState = {
  openDialogs: Record<string, boolean>
  openDialog: (id: string) => void
  closeDialog: (id: string) => void
  toggleDialog: (id: string) => void
}

export const useDialogStore = create<DialogState>((set) => ({
  openDialogs: {},
  openDialog: (id) =>
    set((state) => ({ openDialogs: { ...state.openDialogs, [id]: true } })),
  closeDialog: (id) =>
    set((state) => ({ openDialogs: { ...state.openDialogs, [id]: false } })),
  toggleDialog: (id) =>
    set((state) => ({
      openDialogs: { ...state.openDialogs, [id]: !state.openDialogs[id] },
    })),
}))
