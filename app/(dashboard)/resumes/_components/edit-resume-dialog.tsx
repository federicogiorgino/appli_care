'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { EditResumeForm } from './edit-resume-form'
import { useEditResumeDialog } from '@/hooks/use-edit-resume-dialog'

function EditResumeDialog() {
  const { isOpen, closeDialog } = useEditResumeDialog()
  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Resume</DialogTitle>
        </DialogHeader>
        <EditResumeForm />
      </DialogContent>
    </Dialog>
  )
}

export { EditResumeDialog }
