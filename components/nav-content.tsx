'use client'

import { JobApplicationStatus } from '@prisma/client'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useQueryState } from 'nuqs'

import { SIDEBAR_ITEMS } from '@/lib/const'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

const subItems = [
  { label: 'All', value: '' },
  { label: 'Applied', value: JobApplicationStatus.APPLIED },
  {
    label: 'Interviewing',
    value: JobApplicationStatus.INTERVIEWING,
  },
  { label: 'Offered', value: JobApplicationStatus.OFFER },
  { label: 'Rejected', value: JobApplicationStatus.REJECTED },
]

function NavContent() {
  const [status, setStatus] = useQueryState('status', {
    defaultValue: '' as JobApplicationStatus | string,
    parse: (value) =>
      Object.values(JobApplicationStatus).includes(
        value as JobApplicationStatus
      )
        ? (value as JobApplicationStatus)
        : '',
    serialize: (value) => value,
  })
  return (
    <SidebarContent>
      {SIDEBAR_ITEMS.map((category) => (
        <SidebarGroup key={category.name}>
          <SidebarGroupLabel className="font-bold uppercase">
            {category.name}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {category.items.map((item) => (
                <SidebarMenuItem key={item.name}>
                  {item.subItems ? (
                    <Collapsible defaultOpen>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon className="mr-3" size={20} />
                          {item.name}
                          <ChevronDown className="ml-auto h-4 w-4" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {subItems.map((subItem) => (
                            <SidebarMenuSubItem
                              key={subItem.label}
                              className="ml-3"
                            >
                              <SidebarMenuSubButton
                                asChild
                                onClick={() => setStatus(subItem.value)}
                              >
                                <div>{subItem.label}</div>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link href={item.href}>
                        <item.icon className="mr-3" size={20} />
                        {item.name}
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  )
}

export { NavContent }
