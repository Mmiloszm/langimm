import Navbar from "@/components/shared/navbar/Navbar";
import "@/styles/globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar version="dashboard" />
      {children}
    </section>
  );
}
