"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

/**
 * AppHeader Component
 * - White background (#FFFFFF)
 * - Sidebar collapsible button (Shadcn SidebarTrigger)
 * - "Tasks" title
 * - Logout button on the right
 */
export function AppHeader() {
  return (
    <header
      className="flex justify-between items-center w-full px-6"
      style={{ backgroundColor: "#FFFFFF", height: "88px" }}
    >
      {/* Left section: Collapse button + Title */}
      <div className="flex items-center gap-4">
        <SidebarTrigger
          className="flex items-center justify-center p-1 rounded hover:bg-gray-200"
          title="Toggle Sidebar"
        >
          <Menu size={20} />
        </SidebarTrigger>

        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "36px",
            letterSpacing: "-0.03em",
          }}
        >
          Tasks
        </h1>
      </div>

      {/* Logout button on the right */}
      <button
        type="button"
        className="text-white font-semibold flex items-center justify-center"
        style={{
          width: "127px",
          height: "44px",
          borderRadius: "10px",
          backgroundColor: "#546FFF",
          fontSize: "16px",
        }}
      >
        Logout
      </button>
    </header>
  );
}
