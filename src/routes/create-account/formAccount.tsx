import { Cadastro } from "#/components/forms/createAccount/formAccount";
import { Card, CardContent } from "#/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create-account/formAccount")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen p-5 bg-background flex justify-center items-center">
      <Card className="w-full max-w-xl">
        <CardContent className="">
          <Cadastro />
        </CardContent>
      </Card>
    </div>
  );
}
