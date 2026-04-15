import { Card, CardContent } from "#/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { CadastroMaisInformacoes } from "#/routes/create-account/formCreateAccountCredentials";

export const Route = createFileRoute("/create-account/credentials")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen p-5 bg-background flex justify-center items-center">
      <Card className="w-full max-w-xl">
        <CardContent className="">
          <CadastroMaisInformacoes />
        </CardContent>
      </Card>
      <h1 className="font-bold text-2xl text-foreground"></h1>
    </div>
  );
}
