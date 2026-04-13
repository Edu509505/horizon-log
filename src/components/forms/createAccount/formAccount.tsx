import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { isCPF, isDate, isPhone } from "brazilian-values";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { InputNumeroCelular } from "../../inputAutoCurrent/inputNumeroCelular";
import { Inputcpf } from "../../inputAutoCurrent/InputCpf";
import { InputData } from "../../inputAutoCurrent/InputDataNascimento";
import { Link } from "@tanstack/react-router";
import { InputSenha } from "#/components/inputAutoCurrent/inputSenha";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "#/components/ui/spinner";
import { AlertDialog, AlertDialogTrigger } from "#/components/ui/alert-dialog";
import { format } from "date-fns";

const createAccountSchema = z.object({
  name: z.string().min(5, "Digite seu nome"),
  email: z.email(),
  cpf: z.string().refine((val) => isCPF(val), { error: "CPF inválido" }),
  numero: z
    .string()
    .refine((val) => isPhone(val), { error: "Insira um número válido" }),
  nascimento: z
    .string()
    .refine((val) => isDate(val), { error: "Insira uma data válida" })
    .refine(
      (val) =>
        parseInt(new Date().toString().split(" ")[3]) -
          parseInt(val.split("/")[2]) >=
        22,
      {
        error: "A idade mínima é de 22 anos",
      },
    ),
  password: z.string().min(6, "Sua senha precisa ter no mínimo 6 digitos"),
});

console.log();

export function Cadastro() {
  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      nascimento: "",
      numero: "",
      password: "",
    },
  });

  const createAccount = useMutation({
    mutationKey: ["createaccount"],
    mutationFn: async (data: z.infer<typeof createAccountSchema>) => {
      const response = await fetch(`http://localhost:3333/users`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }

      return response.json();
    },
  });
  async function onsubmit(data: z.infer<typeof createAccountSchema>) {
    createAccount.mutateAsync(data);
  }

  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onsubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Nome</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="Digite seu nome"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="cpf"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contato">CPF</FieldLabel>
              <Inputcpf value={field.value} onChange={field.onChange} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="nascimento"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contato">Data de Nascimento</FieldLabel>

              {/* Conectamos o componente customizado aqui */}
              <InputData value={field.value} onChange={field.onChange} />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="numero"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contato">Contato</FieldLabel>

              {/* Conectamos o componente customizado aqui */}
              <InputNumeroCelular
                value={field.value}
                onChange={field.onChange}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">E-Mail</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="seuemail@exemplo.com"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Senha</FieldLabel>

              {/* Aqui a mágica acontece de forma isolada */}
              <InputSenha value={field.value} onChange={field.onChange} />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex gap-2">
          <Link to="/login">
            <Button
              variant="secondary"
              className="cursor-pointer"
              form="form-rhf-demo"
            >
              Cancelar
            </Button>
          </Link>
          <AlertDialog open={createAccount.isSuccess || createAccount.isError}>
            <AlertDialogTrigger asChild>
              <Button
                type="submit"
                className="cursor-pointer"
                form="form-rhf-demo"
                disabled={createAccount.isPending}
              >
                {createAccount.isPending ? (
                  <>
                    <Spinner /> Cadastrar
                  </>
                ) : (
                  <>Cadastrar</>
                )}
              </Button>
            </AlertDialogTrigger>
            {/* {createAccount.isError ? (
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            ) : (
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            )} */}
          </AlertDialog>
        </div>
      </FieldGroup>
    </form>
  );
}
