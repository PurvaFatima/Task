"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/App-sidebar";
import { AppHeader } from "@/components/layout/AppHeader";

/**
 * DashboardLayout
 * - Combines persistent sidebar + header
 * - Main content scrolls independently
 */
export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-screen">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <AppHeader />

          {/* Page content */}
          <main className="flex-1 p-6 overflow-y-auto bg-[#FAFAFA]">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
