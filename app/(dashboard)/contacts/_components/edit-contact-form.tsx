'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { JobContactRole } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { updateContact } from '@/actions/contacts'
import { useEditContactDialog } from '@/hooks/use-edit-contact-dialog'
import { contactSchema } from '@/schemas/job-application'
import { ContactValues } from '@/types/job-application'

function EditContactForm() {
  const queryClient = useQueryClient()
  const { closeDialog, contact } = useEditContactDialog()
  const contactId = contact ? contact.id : ''

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: contact as ContactValues,
  })

  const mutation = useMutation({
    mutationFn: (data: ContactValues) => updateContact(data, contactId),
    onSuccess: (data) => {
      if (data.status === 'success') {
        queryClient.invalidateQueries({ queryKey: ['contacts'] })
        toast.success('Contact has been updated.')
        closeDialog()
        form.reset()
      } else {
        toast.error('Unable to update contact.')
      }
    },
    onError: () => {
      toast.error('There was a problem with your request.')
    },
  })

  const onSubmit = async (data: ContactValues) => {
    mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+123 456 789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={JobContactRole.RECRUITER}>
                    Recruiter
                  </SelectItem>
                  <SelectItem value={JobContactRole.HIRING_MANAGER}>
                    Hiring Manager
                  </SelectItem>
                  <SelectItem value={JobContactRole.INTERVIEWER}>
                    Interviewer
                  </SelectItem>
                  <SelectItem value={JobContactRole.OTHER}>Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={closeDialog}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {!mutation.isPending && 'Edit'}
            {mutation.isPending && <Loader2 className="animate-spin" />}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export { EditContactForm }
