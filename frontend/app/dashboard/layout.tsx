import Navbar from "@/components/dashboard/Navbar";
import SideBar from "@/components/dashboard/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className=" pt-20 md:pl-64 transition-all duration-300 min-h-screen">
        <SideBar />
        <div className="p-4 md:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </>
  );
}
