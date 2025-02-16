'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import * as React from 'react'

import { tableFilters } from '@/lib/const'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { DataTablePagination } from './data-table-pagination'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Input } from './ui/input'
import useDialog from '@/hooks/use-dialog'

export type FilterLabels = {
  [key: string]: string
}

export type TableType = 'contacts' | 'companies' | 'resumes' | 'coverLetters' // 'jobApplications'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  type: TableType
}

function DataTable<TData, TValue>({
  columns,
  data,
  type,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const { openDialog: openContactCreatDialog } = useDialog(
    'contactCreateDialog'
  )
  const { openDialog: openCompanyCreateDialog } = useDialog(
    'companyCreateDialog'
  )

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  const filters = tableFilters[type]

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder={`Filters ${type}`}
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {
          <div className="flex items-center justify-end gap-4">
            <>
              {type === 'contacts' && (
                <Button variant="outline" onClick={openContactCreatDialog}>
                  <Plus /> Add New Contact
                </Button>
              )}
              {type === 'resumes' && (
                <Button variant="outline" onClick={openContactCreatDialog}>
                  <Plus /> Add New Resume
                </Button>
              )}
              {type === 'coverLetters' && (
                <Button variant="outline" onClick={openContactCreatDialog}>
                  <Plus /> Add New Cover Letter
                </Button>
              )}
              {type === 'companies' && (
                <Button variant="outline" onClick={openCompanyCreateDialog}>
                  <Plus /> Add New Company
                </Button>
              )}
            </>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="max-sm:hidden">
                <Button variant="outline" className="ml-auto">
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    const customLabel = filters[column.id] || column.id

                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {customLabel}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}

export { DataTable }
