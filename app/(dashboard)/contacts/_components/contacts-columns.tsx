'use client'

import { Contact } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

import { capitalizeFirstLetter } from '@/lib/utils'

import { DataTableColumnHeader } from '@/components/data-table-column-header'
import { Checkbox } from '@/components/ui/checkbox'

import { ContactTableActions } from './contact-table-actions'

const contactsColumns: ColumnDef<Contact>[] = [
  {
    id: 'select',

    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Email"
        className="max-sm:hidden"
      />
    ),
    cell: ({ row }) => (
      <div className="max-sm:hidden">{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Phone"
        className="max-sm:hidden"
      />
    ),
    cell: ({ row }) => (
      <div className="max-sm:hidden">{row.getValue('phoneNumber')}</div>
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Role"
        className="max-sm:hidden"
      />
    ),
    cell: ({ row }) => (
      <div className="max-sm:hidden">
        {capitalizeFirstLetter(row.getValue('role'))}
      </div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const contact = row.original
      return <ContactTableActions contact={contact} />
    },
  },
]

export { contactsColumns }
