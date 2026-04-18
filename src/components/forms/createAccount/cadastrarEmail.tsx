import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "#/components/ui/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "#/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth, usePreRegister } from "states/userAuth";

const createAccountSchema = z.object({
  email: z.email({ error: "Insira um E-mail válido" }),
});

export function PreCadastro() {
  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      email: "",
    },
  });

  const [isOpen, setIsOpen] = useState<boolean | undefined>(false);

  const createAccount = useMutation({
    mutationKey: ["preregitro"],
    mutationFn: async (data: z.infer<typeof createAccountSchema>) => {
      const response = await fetch(`http://localhost:3333/pre_registration`, {
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

  const enviarOTP = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`http://localhost:3333/verify`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          pre_registration_id: id,
          type: "email_verification",
        }),
      });
      if (!response.ok) throw new Error("Erro ao reenviar");
      return response.json();
    },
  });

  const setPreRegister = usePreRegister((state) => state.setPreRegister);

  async function onsubmit(data: z.infer<typeof createAccountSchema>) {
    try {
      const responseData = await createAccount.mutateAsync(data);

      setPreRegister(responseData);

      toast.success(`Código enviado para ${data.email}`);

      await enviarOTP.mutateAsync(responseData.id);

      setIsOpen(true);
    } catch (error) {
      setIsOpen(true);
    }
  }

  const navigate = useNavigate();
  const nextPage = async () => {
    await navigate({
      to: "/create-account/confirmed-email",
      search: { tab: "overview" },
      replace: true,
    });
  };

  return (
    <form
      className="flex flex-col h-full justify-center"
      id="form-rhf-demo"
      onSubmit={form.handleSubmit(onsubmit)}
    >
      <FieldGroup>
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
          <AlertDialog open={isOpen}>
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
            {createAccount.isError ? (
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Não foi possivel completar essa ação
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    A acção não pode ser concluída, tente novamente mais tarde
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsOpen(false)}>
                    Rerornar
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            ) : (
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Pré Cadastro realizado</AlertDialogTitle>
                  <AlertDialogDescription>
                    Seu pré cadastro foi realizado e inserido com sucesso
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction
                    onClick={() => (setIsOpen(false), nextPage())}
                  >
                    Continuar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            )}
          </AlertDialog>
        </div>
      </FieldGroup>
    </form>
  );
}
