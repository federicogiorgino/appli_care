'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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

import { Textarea } from './ui/textarea'
import { createCoverLetter } from '@/actions/cover-letters'
import useDialog from '@/hooks/use-dialog'
import { coverLetterSchema } from '@/schemas/job-application'
import { CoverLetterValues } from '@/types/job-application'

function CreateCoverLetterForm() {
  const queryClient = useQueryClient()
  const { closeDialog } = useDialog('coverLetterCreateDialog')

  const form = useForm<CoverLetterValues>({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: {
      name: '',
      body: '',
    },
  })

  const mutation = useMutation({
    mutationFn: createCoverLetter,
    onSuccess: (data) => {
      if (data.status === 'success') {
        queryClient.invalidateQueries({ queryKey: ['coverLetters'] })

        toast.success('Cover letter has been added.')
        form.reset()
        closeDialog()
      } else {
        toast.error('Unable to add cover letter.')
        closeDialog()
      }
    },
    onError: () => {
      toast.error('There was a problem with your request.')
    },
  })

  const onSubmit = async (data: CoverLetterValues) => {
    mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Apple Junior Web Developer Cover Letter June 2024"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter text here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => closeDialog()}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {!mutation.isPending && 'Add'}
            {mutation.isPending && <Loader2 className="animate-spin" />}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export { CreateCoverLetterForm }
