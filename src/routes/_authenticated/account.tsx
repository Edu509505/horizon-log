import { Account } from "#/components/accountscreen/account";
import { Corporation } from "#/components/accountscreen/corporation";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/account")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Minha Conta</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie suas informações pessoais e organizações vinculadas.
        </p>
      </div>

      <div className="grid gap-6">
        <Account />
        <Corporation />
      </div>
    </div>
  );
}