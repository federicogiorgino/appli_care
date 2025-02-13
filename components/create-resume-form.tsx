'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { convertToBase64 } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { createResume } from '@/actions/resumes'
import useDialog from '@/hooks/use-dialog'
import { resumeSchema } from '@/schemas/job-application'
import { ResumeValues } from '@/types/job-application'

function CreateResumeForm() {
  const [isUploading, setIsUploading] = useState(false)
  const [_, setPdfFileName] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const { closeDialog } = useDialog('resumeCreateDialog')

  const form = useForm<ResumeValues>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      name: '',
      url: '',
    },
  })

  const mutation = useMutation({
    mutationFn: createResume,
    onSuccess: (data) => {
      if (data.status === 'success') {
        queryClient.invalidateQueries({ queryKey: ['resumes'] })
        toast.success('Resume has been added.')
        resetFileInput()
        closeDialog()
        form.reset()
      } else {
        toast.error('Unable to add resume.')
        closeDialog()
      }
    },
    onError: () => {
      toast.error('There was a problem with your request.')
    },
  })

  const onSubmit = async (data: ResumeValues) => {
    mutation.mutate(data)
  }

  const resetFileInput = () => {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
    setPdfFileName(null)
  }
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploading(true)
      try {
        const base64String = await convertToBase64(file)
        form.setValue('url', base64String)
        setPdfFileName(file.name)
      } catch (error) {
        console.error('Error converting file to base64:', error)
        toast.error(
          'There was a problem uploading your file. Please try again.'
        )
      } finally {
        setIsUploading(false)
      }
    }
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
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume PDF</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </FormControl>
              <FormDescription>
                Upload your resume in PDF format
              </FormDescription>
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

export { CreateResumeForm }
