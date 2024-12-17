import { Calendar,BookOpenCheck, LayoutDashboard,Dumbbell,ConciergeBell ,CalendarPlus} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "Tasks",
    url: "#",
    icon: BookOpenCheck,
  },
  {
    title: "Schedule",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Equipment Maintenance",
    url: "#",
    icon: Dumbbell,
  },
  {
    title: "Front Desk",
    url: "#",
    icon: ConciergeBell,
  },
  {
    title: "Future Events",
    url: "#",
    icon: CalendarPlus,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
         <SidebarHeader>My Gym</SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
