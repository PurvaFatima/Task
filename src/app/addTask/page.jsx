// src/app/addTask/page.jsx (routed full-page form for /addTask, wrapped in DashboardLayout, matching Figma details)
import DashboardLayout from "@/components/layout/DashboardLayout";
import AddTaskPage from "@/components/tasks/AddTaskPage";  

export default function AddTaskRoute() {
  return (
    <DashboardLayout>
      <AddTaskPage />
    </DashboardLayout>
  );
}