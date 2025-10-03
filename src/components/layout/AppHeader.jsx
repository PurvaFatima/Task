"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

/**
 * AppHeader Component
 * - White background (#FFFFFF)
 * - Sidebar collapsible button with hamburger icon (Menu from Lucide)
 * - "Tasks" title
 * - Logout button on the right
 */
export function AppHeader() {
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  };
  return (
    <header
      className="flex justify-between items-center w-full px-6 py-0"
      style={{ 
        backgroundColor: "#FFFFFF", 
        height: "10px",
        minHeight: "84px",  // Ensures fixed minimum height
        overflow: "hidden"  // Prevents any content overflow
      }}
    >
      {/* Left section: Collapse button + Title */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <SidebarTrigger
          className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
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
        className="flex items-center justify-center rounded-xl hover:bg-blue-600 transition-colors duration-200 flex-shrink-0"
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
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
}