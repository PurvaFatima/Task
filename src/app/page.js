"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import dynamic from "next/dynamic";

const TaskTable = dynamic(() => import("@/components/tasks/TasksTable"), { ssr: false });

export default function Page() {
  return (
    <DashboardLayout>
      <TaskTable />
    </DashboardLayout>
  );
}