'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const searchSchema = z.object({
  query: z.string().optional(),
})

type SearchFormData = z.infer<typeof searchSchema>

function Searchbar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: searchParams.get('q') || '',
    },
  })

  const onSubmit = (data: SearchFormData) => {
    if (!data.query) {
      router.push('/job-applications')
    } else
      router.push(
        `/job-applications?q=${encodeURIComponent(data.query.trim())}`
      )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="max-w-sm"
                  placeholder="Search..."
                  type="search"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export { Searchbar }
