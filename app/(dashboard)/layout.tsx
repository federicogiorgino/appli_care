import { AppSidebar } from '@/components/app-sidebar'
import { DialogsProvider } from '@/components/dialogs-provider'
import { TwIndicator } from '@/components/tw-indicator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

import '@/app//globals.css'

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
          <DialogsProvider />
          <SidebarTrigger />
          <TwIndicator />
          <div className="px-4 pt-4">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
