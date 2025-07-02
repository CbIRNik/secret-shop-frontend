"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
} from "@/shared/ui/sidebar"
import { SidebarProfilePanel } from "@/features/user/ui/sidebar-profile-panel"
import { UserStore } from "@/entities/user/model"
import { SidebarAuthPanel } from "@/features/user/ui/sidebar-auth-panel"


const AppSidebar = () => {

  const { user } = UserStore()
  
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        { user && <SidebarProfilePanel /> }
        { !user && <SidebarAuthPanel /> }
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export { AppSidebar }