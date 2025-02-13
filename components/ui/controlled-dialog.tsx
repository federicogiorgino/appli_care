'use client'

import type * as React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import useDialog from '@/hooks/use-dialog'

interface ControlledDialogProps {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  content?: React.ReactNode
}

function ControlledDialog({
  id,
  title,
  description,
  children,
  content,
}: ControlledDialogProps) {
  const { isOpen, closeDialog } = useDialog(id)

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      {children}
      <DialogContent>
        <DialogHeader>
          {title && <DialogTitle className="text-2xl">{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  )
}

export { ControlledDialog }
