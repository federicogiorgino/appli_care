'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { EditJobApplicationForm } from './edit-job-application-form'
import { useEditJobApplicationDialog } from '@/hooks/use-edit-job-application-dialog'

function EditJobApplicationDialog() {
  const { isOpen, closeDialog } = useEditJobApplicationDialog()
  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Job Application</DialogTitle>
        </DialogHeader>
        <EditJobApplicationForm />
      </DialogContent>
    </Dialog>
  )
}

export { EditJobApplicationDialog }
