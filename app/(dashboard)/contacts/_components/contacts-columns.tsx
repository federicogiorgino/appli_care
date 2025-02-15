'use client'

import { Contact } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { capitalizeFirstLetter } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

const contactsColumns: ColumnDef<Contact>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="max-sm:hidden"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="max-sm:hidden"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="ml-4">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: () => <div className="max-sm:hidden">Email</div>,
    cell: ({ row }) => (
      <div className="max-sm:hidden">{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'phoneNumber',
    header: () => <div className="max-sm:hidden">Phone</div>,
    cell: ({ row }) => (
      <div className="max-sm:hidden">{row.getValue('phoneNumber')}</div>
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <Button
          className="max-sm:hidden"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="ml-4 max-sm:hidden">
        {capitalizeFirstLetter(row.getValue('role'))}
      </div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const contact = row.original
      //@ts-ignore
      // return <ContactTableActions contact={contact} />
      return <div></div>
    },
  },
]

export { contactsColumns }
