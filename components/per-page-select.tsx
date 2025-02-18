import { useQueryState } from 'nuqs'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function PerPageSelect() {
  const [perPage, setPerPage] = useQueryState('perPage', {
    defaultValue: 10,
    parse: (value) => {
      const parsed = Number.parseInt(value, 10)
      return isNaN(parsed) || parsed < 1 ? 10 : parsed
    },
    serialize: (value) => value.toString(),
  })

  return (
    <Select
      value={perPage.toString()}
      onValueChange={(value) => setPerPage(Number.parseInt(value, 10))}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select items per page" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="10">10 per page</SelectItem>
        <SelectItem value="20">20 per page</SelectItem>
        <SelectItem value="50">50 per page</SelectItem>
        <SelectItem value="100">100 per page</SelectItem>
      </SelectContent>
    </Select>
  )
}

export { PerPageSelect }
