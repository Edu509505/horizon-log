import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "#/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import Logo from "@/assets/logo.svg";
import { CadastroMaisInformacoes } from "#/routes/create-account/formCreateAccountCredentials";

export const Route = createFileRoute("/create-account/credentials")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen p-5 bg-background flex justify-center items-center">
      <Card className="w-full max-w-xl">
        {/* <CardHeader className="w-1/2">
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <img src={Logo} alt="" className="size-24" />
            <CardContent className="text-center">PAGINA 2</CardContent>
            <CardDescription className="text-center">
              Para comerçarmos, você vai precisa digitar suas informações
            </CardDescription>
          </div>
        </CardHeader> */}
        <CardContent className="">
          <CadastroMaisInformacoes />
        </CardContent>
      </Card>
      <h1 className="font-bold text-2xl text-foreground"></h1>
    </div>
  );
}
