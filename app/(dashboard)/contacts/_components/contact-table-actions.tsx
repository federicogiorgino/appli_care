'use client'

import { Contact } from '@prisma/client'
import { MoreVertical } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useEditContactDialog } from '@/hooks/use-edit-contact-dialog'

type ContactTableActionsProps = {
  contact: Contact
}

function ContactTableActions({ contact }: ContactTableActionsProps) {
  const { openDialog } = useEditContactDialog()

  const handleEditContact = () => {
    openDialog(contact)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Details</DropdownMenuItem>
        <DropdownMenuItem onSelect={handleEditContact}>Edit</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ContactTableActions }
