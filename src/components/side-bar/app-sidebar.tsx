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
import { useEffect, useState } from "react";

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
  const [logoUrl, setLogoUrl] = useState<string>("");

  useEffect(() => {
    console.log("API URL:", apiUrl);
    fetch(`${apiUrl}/api/logo`)
      .then((res) => res.text())
      .then((url) => {
        console.log("Received logo URL from backend:", url);
        setLogoUrl(url);
      })
      .catch((err) => {
        console.error("Failed to fetch logo URL:", err);
      });
  }, []);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader>
            {open ? (
              <img
                src={`${logoUrl}`}
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
