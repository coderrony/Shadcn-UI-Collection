import MainMenu from "@/components/custom-ui/main-menu";

function DashboardLayout({ children }) {
  return (
    <div className="grid grid-cols-[250px_1fr]  h-screen">
      <MainMenu />
      <div className="overflow-auto py-2 px-4">
        <h3 className="pb-4">Welcome back Tom</h3>
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
