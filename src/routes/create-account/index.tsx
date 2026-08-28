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
    <div className="min-h-screen p-4 sm:p-5 bg-background flex justify-center items-center">
      <Card className="w-full max-w-sm md:max-w-xl flex flex-col md:flex-row items-center justify-center">
        <CardHeader className="w-full md:w-1/2">
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <img src={Logo} alt="Logo" className="size-20 md:size-24" />
            <CardContent className="text-center p-0 font-semibold text-lg">
              Seja muito Bem-vindo
            </CardContent>
            <CardDescription className="text-center">
              Para começarmos, você vai precisar digitar suas informações
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="w-full md:w-1/2 pt-0 md:pt-6">
          <PreCadastro />
        </CardContent>
      </Card>
    </div>
  );
}
