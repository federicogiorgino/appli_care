'use client'

import { Contact } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MoreVertical } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { deleteContact } from '@/actions/contacts'
import { useEditContactDialog } from '@/hooks/use-edit-contact-dialog'

type ContactTableActionsProps = {
  contact: Contact
}

function ContactTableActions({ contact }: ContactTableActionsProps) {
  const { openDialog } = useEditContactDialog()
  const queryClient = useQueryClient()

  const handleEditContact = () => {
    openDialog(contact)
  }

  const mutation = useMutation({
    mutationFn: (contactId: string) => deleteContact(contactId),
    onSuccess: (data) => {
      if (data.status === 'success') {
        // Invalidate and refetch the contacts query
        queryClient.invalidateQueries({ queryKey: ['contacts'] })
        toast.success('Contact deleted successfully')
      } else {
        toast.error(data.error || 'Failed to delete contact')
      }
    },
    onError: (error) => {
      console.error('Error deleting contact:', error)
      toast.error('An error occurred while deleting the contact')
    },
  })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={handleEditContact}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => mutation.mutate(contact.id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ContactTableActions }
