// import { useQueryState } from 'nuqs'
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from '@/components/ui/pagination'
// type PaginateProps = {
//   currentPage: number
//   totalPages: number
// }
// function Paginate({ currentPage, totalPages }: PaginateProps) {
//   const [page, setPage] = useQueryState('page', {
//     defaultValue: 1,
//     parse: (value) => {
//       const parsed = Number.parseInt(value, 10)
//       return isNaN(parsed) || parsed < 1 ? 1 : parsed
//     },
//     serialize: (value) => value.toString(),
//   })
//   const renderPageNumbers = () => {
//     const pageNumbers = []
//     const maxVisiblePages = 3
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
//     const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1)
//     }
//     if (startPage > 1) {
//       pageNumbers.push(
//         <PaginationItem key={1} className="hidden sm:inline-flex">
//           <PaginationLink
//             href="#"
//             onClick={(e) => {
//               e.preventDefault()
//               setPage(1)
//             }}
//           >
//             1
//           </PaginationLink>
//         </PaginationItem>
//       )
//       if (startPage > 2) {
//         pageNumbers.push(
//           <PaginationEllipsis
//             key="ellipsis-start"
//             className="hidden sm:inline-flex"
//           />
//         )
//       }
//     }
//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(
//         <PaginationItem
//           key={i}
//           className={i === currentPage ? '' : 'hidden sm:inline-flex'}
//         >
//           <PaginationLink
//             href="#"
//             isActive={currentPage === i}
//             onClick={(e) => {
//               e.preventDefault()
//               setPage(i)
//             }}
//           >
//             {i}
//           </PaginationLink>
//         </PaginationItem>
//       )
//     }
//     if (endPage < totalPages) {
//       if (endPage < totalPages - 1) {
//         pageNumbers.push(
//           <PaginationEllipsis
//             key="ellipsis-end"
//             className="hidden sm:inline-flex"
//           />
//         )
//       }
//       pageNumbers.push(
//         <PaginationItem key={totalPages} className="hidden sm:inline-flex">
//           <PaginationLink
//             href="#"
//             onClick={(e) => {
//               e.preventDefault()
//               setPage(totalPages)
//             }}
//           >
//             {totalPages}
//           </PaginationLink>
//         </PaginationItem>
//       )
//     }
//     return pageNumbers
//   }
//   return (
//     <Pagination>
//       <PaginationContent>
//         <PaginationItem>
//           <PaginationPrevious
//             href="#"
//             onClick={(e) => {
//               e.preventDefault()
//               if (currentPage > 1) setPage(currentPage - 1)
//             }}
//           />
//         </PaginationItem>
//         {currentPage > 1 && (
//           <PaginationItem className="sm:hidden">
//             <PaginationLink
//               href="#"
//               onClick={(e) => {
//                 e.preventDefault()
//                 setPage(1)
//               }}
//             >
//               1
//             </PaginationLink>
//           </PaginationItem>
//         )}
//         {currentPage > 2 && <PaginationEllipsis className="sm:hidden" />}
//         {renderPageNumbers()}
//         {currentPage < totalPages - 1 && (
//           <PaginationEllipsis className="sm:hidden" />
//         )}
//         {currentPage < totalPages && (
//           <PaginationItem className="sm:hidden">
//             <PaginationLink
//               href="#"
//               onClick={(e) => {
//                 e.preventDefault()
//                 setPage(totalPages)
//               }}
//             >
//               {totalPages}
//             </PaginationLink>
//           </PaginationItem>
//         )}
//         <PaginationItem>
//           <PaginationNext
//             href="#"
//             onClick={(e) => {
//               e.preventDefault()
//               if (currentPage < totalPages) setPage(currentPage + 1)
//             }}
//           />
//         </PaginationItem>
//       </PaginationContent>
//     </Pagination>
//   )
// }
// export { Paginate }
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { useQueryState } from 'nuqs'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface PaginationProps {
  totalPages: number
}

function Paginate({ totalPages }: PaginationProps) {
  const [page, setPage] = useQueryState('page', {
    defaultValue: 1,
    parse: (value) => {
      const parsed = Number.parseInt(value, 10)
      return isNaN(parsed) || parsed < 1 ? 1 : parsed
    },
    serialize: (value) => value.toString(),
  })

  const [perPage, setPerPage] = useQueryState('perPage', {
    defaultValue: 10,
    parse: (value) => {
      const parsed = Number.parseInt(value, 10)
      return isNaN(parsed) || parsed < 1 ? 10 : parsed
    },
    serialize: (value) => value.toString(),
  })

  const currentPage = Math.min(page, totalPages)

  const handlePageSizeChange = (newSize: number) => {
    setPerPage(newSize)
    setPage(1) // Reset to first page when changing page size
  }

  return (
    <div className="flex items-center justify-end px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={perPage.toString()}
            onValueChange={(value) => handlePageSizeChange(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={perPage} />
            </SelectTrigger>

            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={currentPage === 1}
            onClick={() => setPage(1)}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">First page</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={currentPage === totalPages}
            onClick={() => setPage(totalPages)}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export { Paginate }
