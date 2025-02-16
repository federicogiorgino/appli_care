'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { EditCompanyForm } from './edit-company-form'
import { useEditCompanyDialog } from '@/hooks/use-edit-company-dialog'

function EditCompanyDialog() {
  const { isOpen, closeDialog } = useEditCompanyDialog()
  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Company</DialogTitle>
        </DialogHeader>
        <EditCompanyForm />
      </DialogContent>
    </Dialog>
  )
}

export { EditCompanyDialog }
