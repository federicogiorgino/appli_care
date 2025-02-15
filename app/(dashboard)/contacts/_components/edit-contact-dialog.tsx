'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { EditContactForm } from './edit-contact-form'
import { useEditContactDialog } from '@/hooks/use-edit-contact-dialog'

function EditContactDialog() {
  const { isOpen, closeDialog } = useEditContactDialog()
  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl"></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <EditContactForm />
      </DialogContent>
    </Dialog>
  )
}

export { EditContactDialog }
