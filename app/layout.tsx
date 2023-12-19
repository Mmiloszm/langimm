import { roboto } from "@/lib/fonts";
import "@/styles/globals.css";
import { UserContextProvider } from "@/contexts/UserContext";
import DefaultTheme from "@/lib/theme";
import { DashboardContextProvider } from "@/contexts/DashboardContext";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardContextProvider>
      <UserContextProvider>
        <DefaultTheme>
          <html lang="pl-PL" className={`${roboto.variable}`}>
            {/*
          <head /> will contain the components returned by the nearest parent
          head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
        */}
            <head />
            <body>{children}</body>
          </html>
        </DefaultTheme>
      </UserContextProvider>
    </DashboardContextProvider>
  );
}
