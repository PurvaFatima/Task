// app/dashboard/page.jsx
import DashboardLayout from "@/components/layout/DashboardLayout";
import dynamic from "next/dynamic";

const TaskTable = dynamic(() => import("@/components/tasks/TasksTable"), { ssr: false });

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <TaskTable />
    </DashboardLayout>
  );
}
