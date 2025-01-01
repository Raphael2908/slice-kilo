import Navbar from "./navbar";

export default async function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex relative h-screen">
            <Navbar/>
          <div className="w-full container mx-auto py-4 flex flex-col items-center">
            {children}
          </div>
      </div>
    );
  }
  