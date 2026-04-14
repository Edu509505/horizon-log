import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "#/lib/api"; // Certifique-se de importar sua instância do axios
import { useAuth } from "states/userAuth";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "#/lib/utils";
import logo from "../assets/logo.svg";

// 1. Defina o esquema de validação
const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string(),
});

type LoginData = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginData) => {
    try {
      const response = await api.post("/auth/login", data);
      const { acces_token, user } = response.data;

      setAuth(acces_token, user);
      toast.success(`Bem-vindo, ${user.name}!`);

      navigate({ to: "/" });
    } catch (error: any) {
      const message = error.response?.data?.message || "Falha no login.";
      toast.error(message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <div className="w-full flex justify-center">
            <img src={logo} alt="" className="size-25" />
          </div>
          <CardTitle>Entre com sua conta</CardTitle>
          <CardDescription>
            Insira seu e-mail abaixo para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">E-Mail</FieldLabel>
                <Input
                  {...register("email")} // 4. Registre o input
                  id="email"
                  type="email"
                  placeholder="m@exemplo.com"
                />
                {errors.email && (
                  <span className="text-destructive text-xs">
                    {errors.email.message}
                  </span>
                )}
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input
                  {...register("password")} // 5. Registre o input
                  id="password"
                  type="password"
                />
                {errors.password && (
                  <span className="text-destructive text-xs">
                    {errors.password.message}
                  </span>
                )}
              </Field>

              <Field>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <FieldDescription className="text-center">
                  Não tem uma conta?{" "}
                  <Link
                    to="/create-account"
                    className="underline underline-offset-4"
                  >
                    Cadastre-se
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
