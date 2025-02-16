'use client'

import { Company } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

import { capitalizeFirstLetter } from '@/lib/utils'

import { DataTableColumnHeader } from '@/components/data-table-column-header'
import { Checkbox } from '@/components/ui/checkbox'

import { CompanyTableActions } from './company-table-actions'

const companiesColumns: ColumnDef<Company>[] = [
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
    accessorKey: 'website',

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Website" />
    ),
    cell: ({ row }) => <div className="">{row.getValue('website')}</div>,
  },
  {
    accessorKey: 'industry',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Industry"
        className="max-sm:hidden"
      />
    ),
    cell: ({ row }) => (
      <div className="max-sm:hidden">{row.getValue('industry')}</div>
    ),
  },
  {
    accessorKey: 'location',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Location"
        className="max-sm:hidden"
      />
    ),
    cell: ({ row }) => (
      <div className="max-sm:hidden">{row.getValue('location')}</div>
    ),
  },
  {
    accessorKey: 'size',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="size"
        className="max-sm:hidden"
      />
    ),
    cell: ({ row }) => (
      <div className="max-sm:hidden">
        {capitalizeFirstLetter(row.getValue('size'))}
      </div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const company = row.original
      return <CompanyTableActions company={company} />
    },
  },
]

export { companiesColumns }
