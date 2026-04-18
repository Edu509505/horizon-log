import { Cadastro } from "#/components/forms/createAccount/formAccount";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "#/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import Logo from "@/assets/logo.svg";
import { PreCadastro } from "#/components/forms/createAccount/cadastrarEmail";

export const Route = createFileRoute("/create-account/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen p-5 bg-background flex justify-center items-center">
      <Card className="w-full max-w-xl flex-row">
        <CardHeader className="w-1/2">
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <img src={Logo} alt="" className="size-24" />
            <CardContent className="text-center">
              Seja muito Bem-vindo
            </CardContent>
            <CardDescription className="text-center">
              Para comerçarmos, você vai precisa digitar suas informações
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="w-1/2">
          <PreCadastro />
        </CardContent>
      </Card>
    </div>
  );
}
