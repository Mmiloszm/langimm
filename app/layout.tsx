import Navbar from "@/components/shared/navbar/Navbar";
import "../styles/globals.css";
import { Roboto } from "next/font/google";
import Footer from "@/components/shared/footer/Footer";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
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
