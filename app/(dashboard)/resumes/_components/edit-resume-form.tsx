'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

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

import { updateResume } from '@/actions/resumes'
import { useEditResumeDialog } from '@/hooks/use-edit-resume-dialog'
import { resumeSchema } from '@/schemas/job-application'
import { ResumeValues } from '@/types/job-application'

function EditResumeForm() {
  const queryClient = useQueryClient()
  const { closeDialog, resume } = useEditResumeDialog()

  const form = useForm<ResumeValues>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      name: resume?.name,
      url: resume?.url,
    },
  })

  const resumeId = resume ? resume.id : ''

  const mutation = useMutation({
    mutationFn: (data: ResumeValues) => updateResume(data, resumeId),
    onSuccess: (data) => {
      if (data.status === 'success') {
        queryClient.invalidateQueries({ queryKey: ['resumes'] })
        toast.success('Resume has been updated.')
        closeDialog()
        form.reset()
      } else {
        toast.error('Unable to update resume.')
        closeDialog()
      }
    },
    onError: () => {
      toast.error('There was a problem with your request.')
    },
  })

  // const onSubmit = async (data: EditResumeValues) => {
  const onSubmit = async (data: ResumeValues) => {
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
                  placeholder="Amazone Java Developer Resume January 2024"
                  {...field}
                />
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

export { EditResumeForm }
