import { Card, CardContent } from "#/components/ui/card";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { CadastroMaisInformacoes } from "#/components/forms/createAccount/formCreateAccountCredentials";

export const Route = createFileRoute("/create-account/credentials")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    const storage = localStorage.getItem("horizon-auth");

    try {
      const authData = storage ? JSON.parse(storage) : null;
      const token = authData?.state?.token;

      // 3. Se não tiver token ou for undefined/null, tchau!
      if (!token || token === "undefined") {
        throw redirect({
          to: "/login",
          search: { redirect: location.href },
        });
      }
    } catch (e) {
      throw redirect({ to: "/login" });
    }
  },
});

function RouteComponent() {
  return (
    <div className="h-screen p-5 bg-background flex justify-center items-center">
      <Card className="w-full max-w-xl">
        <CardContent className="">
          <CadastroMaisInformacoes />
        </CardContent>
      </Card>
    </div>
  );
}
