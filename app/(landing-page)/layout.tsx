import Navbar from "@/components/shared/navbar/Navbar";
import "@/styles/globals.css";
import Footer from "@/components/shared/footer/Footer";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar /> {children} <Footer />
    </section>
  );
}
