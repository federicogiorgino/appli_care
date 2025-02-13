'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { JobCompanySize, JobContactRole } from '@prisma/client'
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

import { createCompany } from '@/actions/companies'
import useDialog from '@/hooks/use-dialog'
import { companySchema } from '@/schemas/job-application'
import { CompanyValues } from '@/types/job-application'

function CreateCompanyForm() {
  const queryClient = useQueryClient()
  const { closeDialog } = useDialog('createCompanyDialog')

  const form = useForm<CompanyValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: '',
      size: JobCompanySize.SMALL,
    },
  })

  const mutation = useMutation({
    mutationFn: createCompany,
    onSuccess: (data) => {
      if (data.status === 'success') {
        queryClient.invalidateQueries({ queryKey: ['companies'] })
        toast.success('Company has been added.')
        closeDialog()
        form.reset()
      } else {
        toast.error('Unable to add company.')
      }
    },
    onError: () => {
      toast.error('Unable to add contact.')
    },
  })

  const onSubmit = async (data: CompanyValues) => {
    mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="123 Cool Street, New York" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Input placeholder="Tech" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a company size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={JobCompanySize.SMALL}>Small</SelectItem>
                    <SelectItem value={JobCompanySize.MEDIUM}>
                      Medium
                    </SelectItem>
                    <SelectItem value={JobCompanySize.LARGE}>Large</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
      </form>
    </Form>
  )
}

export { CreateCompanyForm }
