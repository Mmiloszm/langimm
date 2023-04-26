import Navbar from "@/components/shared/navbar/Navbar";
import "../styles/globals.css";
import { roboto } from "@/lib/fonts";
import Footer from "@/components/shared/footer/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Navbar /> {children} <Footer />
      </body>
    </html>
  );
}
