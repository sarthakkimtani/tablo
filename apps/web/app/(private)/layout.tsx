import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { SessionProvider } from "@/contexts/session-context";
import { getSession } from "@/lib/session";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = (await headers()).get("cookie") ?? "";
  const { data } = await getSession(cookie);

  if (!data) {
    redirect("/auth");
  }

  return (
    <SessionProvider initialSession={data}>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset className="relative flex min-h-screen flex-col">
          <SidebarTrigger className="absolute top-4 left-4 z-20" />
          <div className="flex flex-1 flex-col px-20 py-3">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
