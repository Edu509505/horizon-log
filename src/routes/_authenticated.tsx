import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "#/components/ui/sidebar";
import { AppSidebar } from "#/components/app-sidebar";
import { SiteHeader } from "#/components/site-header";
import { TooltipProvider } from "#/components/ui/tooltip";

// import { useAuth } from "../../states/userAuth";

export const Route = createFileRoute("/_authenticated")({
  component: authenticateLayout,
  beforeLoad: async ({ location }) => {
    // Adicione o async
    // Tente ler direto do localStorage se o Zustand falhar na hidratação inicial
    const storage = localStorage.getItem("horizon-auth");
    const authData = storage ? JSON.parse(storage) : null;
    const token = authData?.state?.token;

    if (!token) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
});

function authenticateLayout() {
  return (
    <>
      <TooltipProvider>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <Outlet />
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </>
  );
}
