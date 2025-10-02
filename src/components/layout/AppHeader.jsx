"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

/**
 * AppHeader Component
 * - White background (#FFFFFF)
 * - Sidebar collapsible button with hamburger icon (Menu from Lucide)
 * - "Tasks" title
 * - Logout button on the right
 */
export function AppHeader() {
  return (
    <header
      className="flex justify-between items-center w-full px-6 py-0 "
      style={{ 
        backgroundColor: "#FFFFFF", 
        height: "84px"
      }}
    >
      {/* Left section: Collapse button + Title */}
      <div className="flex items-center gap-4">
        <SidebarTrigger
          className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          title="Toggle Sidebar"
        >
          <Menu size={20} strokeWidth={2} />
        </SidebarTrigger>

        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "36px",
            letterSpacing: "-0.03em",
            color: "#000000",
            margin: 0
          }}
        >
          Tasks
        </h1>
      </div>

      {/* Logout button on the right */}
      <button
        type="button"
        className="flex items-center justify-center rounded-xl hover:bg-blue-600 transition-colors duration-200"
        style={{
          width: "127px",
          height: "44px",
          borderRadius: "10px",
          backgroundColor: "#546FFF",
          fontSize: "16px",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 600,
          color: "#FFFFFF",
          border: "none",
          cursor: "pointer"
        }}
        onClick={() => {
          // Add logout logic here (e.g., signOut from auth provider)
          console.log("Logout clicked");
        }}
      >
        Logout
      </button>
    </header>
  );
}