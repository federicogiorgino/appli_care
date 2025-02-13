'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

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
import { ResumeValues } from '@/types/job-application'

const resumeSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  url: z.string().url({
    message: 'Please upload a curriculum file.',
  }),
})

type ResumeFormValues = z.infer<typeof resumeSchema>

function CreateResumeForm() {
  const [isUploading, setIsUploading] = useState(false)
  const [pdfFileName, setPdfFileName] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const { closeDialog } = useDialog('resumeCreateDialog')

  const form = useForm<ResumeFormValues>({
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

        form.reset()
      } else {
        toast.error('Unable to add resume.')
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
        // toast.success('File uploaded successfully')
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

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleDownloadPdf = () => {
    try {
      const base64Data = form.getValues('url')
      if (!base64Data) {
        throw new Error('No PDF data available for download.')
      }

      // Remove the data URL prefix if present
      const base64Content = base64Data.includes('base64,')
        ? base64Data.split('base64,')[1]
        : base64Data

      // Decode the base64 string
      const binaryString = window.atob(base64Content)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }

      // Create a Blob from the bytes
      const blob = new Blob([bytes], { type: 'application/pdf' })

      // Create a download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = pdfFileName || 'resume.pdf'

      // Append to the document, click, and remove
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up the URL object
      window.URL.revokeObjectURL(url)

      toast.success('PDF Downloaded successfully')
    } catch (error) {
      console.error('Error downloading PDF:', error)
      toast.error('There was a problem downloading your PDF. Please try again.')
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
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>Enter your full name</FormDescription>
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
            {!mutation.isPending && 'Create'}
            {mutation.isPending && <Loader2 className="animate-spin" />}
          </Button>
        </div>
        {/* <div className="flex space-x-4">
          <Button type="submit" disabled={isUploading}>
            {!mutation.isPending && 'Create'}
            {mutation.isPending && <Loader2 className="animate-spin" />}
          </Button> */}
        {/* {pdfFileName && (
            <Button type="button" onClick={handleDownloadPdf}>
              Download PDF
            </Button>
          )} */}
        {/* </div> */}
      </form>
    </Form>
  )
}

export { CreateResumeForm }
