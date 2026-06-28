import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const DashboardLayoutPage = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar></DashboardSidebar>

      <main className="flex-1">{children}</main>
    </div>
  );
};

export default DashboardLayoutPage;
