import { Sidebar, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar'

import { NavContent } from './nav-content'
import { UserMenu } from './user-menu'

async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <UserMenu />
      </SidebarHeader>

      <NavContent />

      <SidebarFooter></SidebarFooter>
    </Sidebar>
  )
}
export { AppSidebar }
