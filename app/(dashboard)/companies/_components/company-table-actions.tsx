'use client'

import { Company } from '@prisma/client'
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

import { deleteCompany } from '@/actions/companies'
import { useEditCompanyDialog } from '@/hooks/use-edit-company-dialog'

type CompanyTableActionsProps = {
  company: Company
}

function CompanyTableActions({ company }: CompanyTableActionsProps) {
  const { openDialog } = useEditCompanyDialog()
  const queryClient = useQueryClient()

  const handleEditCompany = () => {
    openDialog(company)
  }

  const mutation = useMutation({
    mutationFn: (companyId: string) => deleteCompany(companyId),
    onSuccess: (data) => {
      if (data.status === 'success') {
        // Invalidate and refetch the companies query
        queryClient.invalidateQueries({ queryKey: ['companies'] })
        toast.success('Company deleted successfully')
      } else {
        toast.error(data.error || 'Failed to delete company')
      }
    },
    onError: (error) => {
      console.error('Error deleting company:', error)
      toast.error('An error occurred while deleting the company')
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
        <DropdownMenuItem onSelect={handleEditCompany}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => mutation.mutate(company.id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { CompanyTableActions }
