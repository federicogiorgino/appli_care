import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

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

function NavContent() {
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
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem
                              key={subItem.name}
                              className="ml-3"
                            >
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.href}>{subItem.name}</Link>
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
