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
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider";

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
  const { logoUrl, fetchLogo } = useAuth();

  useEffect(() => {
    fetchLogo();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <Sidebar collapsible="icon" className="flex-grow">
        <SidebarContent className="flex flex-col h-full justify-between">
          <div>
            <SidebarGroup>
              <SidebarHeader>
                {open ? (
                  <img
                    src={`${logoUrl}`}
                    alt="My Gym"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                  />
                ) : null}
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
          </div>

          {/* Bottom button */}
          <div className="p-4">
            <Button className="w-full" variant="default">
              Add Entries
            </Button>
          </div>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
