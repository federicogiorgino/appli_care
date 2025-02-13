'use client'

import { Plus } from 'lucide-react'

import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

import { NavContent } from './nav-content'
import { UserMenu } from './user-menu'
import useDialog from '@/hooks/use-dialog'

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { openDialog } = useDialog('jobApplicationCreateDialog')
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <UserMenu />
      </SidebarHeader>

      <NavContent />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => openDialog()}>
              <Plus />
              <span>New Job Application</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
export { AppSidebar }
