import {
  Calendar,
  BookOpenCheck,
  LayoutDashboard,
  Dumbbell,
  ConciergeBell,
  CalendarPlus,
} from "lucide-react";

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
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const items = [
  {
    title: "Dashboard",
    url: "/gymapp/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tasks",
    url: "/gymapp/tasks",
    icon: BookOpenCheck,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader>
            {open ? (
              <img
                src={`${apiUrl}/api/logo`}
                alt="My Gym"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
            ) : (
              ""
            )}
          </SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
