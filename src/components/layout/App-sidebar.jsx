"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar, // correct hook
} from "@/components/ui/sidebar";
import { BookOpen } from "lucide-react";
import Image from "next/image";

/**
 * AppSidebar Component
 * - Fixed logo image
 * - Logo text hides on collapse
 * - Single "Task" link
 */
export default function AppSidebar() {
   const { state } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <Sidebar collapsible="icon" className="rounded-2xl">
      {/* Sidebar header: Logo icon + text */}
      <SidebarHeader className="px-2 py-4">
        <div className="flex items-center justify-start gap-3">
          {/* Logo image stays fixed size */}
          <Image
            src="/logo.png"
            alt="Logo Icon"
            width={40}
            height={40}
            className="object-contain flex-shrink-0"
          />
          {/* Logo text hides when sidebar collapses */}
          {isExpanded && (
            <span
              className="text-lg font-bold"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: "#000000",
              }}
            >
              Taska
            </span>
          )}
        </div>
      </SidebarHeader>

      {/* Sidebar content: Task link */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="pt-14">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="/"
                    className="flex items-center gap-3 px-2 py-1"
                    style={{
                      backgroundColor: "#e2e2e2ff",
                      borderRadius: "0.75rem",
                    }}
                  >
                    <BookOpen className="h-5 w-5" />
                    <span className="text-lg font-semibold">Task</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}