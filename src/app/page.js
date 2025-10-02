import DashboardLayout from "@/components/layout/DashboardLayout";
export default function Home() {
  return (
 <DashboardLayout>
      {/* Dashboard content goes here */}
      <div className="text-gray-700">
        <h2 className="text-xl font-semibold mb-4">Welcome to the Dashboard</h2>
        <p>This is where the main content will be rendered.</p>
      </div>
    </DashboardLayout>
  );
}
