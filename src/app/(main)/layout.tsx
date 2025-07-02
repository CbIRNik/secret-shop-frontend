"use server"

import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar"
import { AppSidebar } from "@/widgets/app-sidebar"
import { UserProvider } from "@/features/user/provider"
import { Separator } from "@/shared/ui/separator"

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className={"w-full"}>
          <header className={"p-2 border-b-1 flex"}>
            <SidebarTrigger />
          </header>
          {children}
        </div>
      </SidebarProvider>
    </UserProvider>
  )
}

export default MainLayout
