import { AppSidebar } from '@/components/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <main className="p-4">
          <SidebarTrigger />
          <div className="px-4 pt-4">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
