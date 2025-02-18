import { Trash, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function BulletListInput({
  value,
  onChange,
}: {
  value: string[] | undefined
  onChange: (value: string[]) => void
}) {
  const [inputValue, setInputValue] = useState('')
  const addItem = () => {
    if (inputValue && value?.includes && !value.includes(inputValue)) {
      onChange([...(value || []), inputValue])
      setInputValue('')
    }
  }
  const removeItem = (item: string) => {
    onChange((value || []).filter((t) => t !== item))
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addItem()
            }
          }}
          placeholder="Enter a note"
        />
        <Button type="button" onClick={addItem} className="ml-2">
          Add
        </Button>
      </div>

      <ul className="spacey list-disc pl-5">
        {!!value?.length &&
          value.map((item, i) => (
            <li key={i}>
              <div className="flex items-start overflow-hidden">
                <span className="mr-4 flex-grow overflow-x-auto whitespace-pre-wrap break-all pl-1 text-sm text-muted-foreground">
                  <span className="-ml-4 mr-2 mt-2 inline-block h-2 w-2 rounded-full" />
                  {item}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item)}
                  className="mt-0.5 flex-shrink-0 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <Trash size={12} />
                  <span className="sr-only">Delete note</span>
                </Button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export { BulletListInput }
