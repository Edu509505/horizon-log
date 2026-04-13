import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { isCNPJ } from "brazilian-values";
import { Button } from "../../ui/button";
import {
  informacaoEmpresa,
  formCreateAccount,
} from "../../../../states/createAccount";
import { Link, useNavigate } from "@tanstack/react-router";
import { Input } from "#/components/ui/input";
import { InputCnpj } from "#/components/inputAutoCurrent/InputCnpj";
import { useMutation } from "@tanstack/react-query";

const createAccountSchema = z.object({
  cnpj: z.string().refine((val) => isCNPJ(val), { error: "CNPJ inválido" }),
  razaoSocial: z.string().min(5, "Nome inválido"),
  nomeFantasia: z.string().min(1, "Deve ter pelo menos um caractere"),
});

export function CadastroMaisInformacoes() {
  const formEmpresa = informacaoEmpresa();

  const formStorePersonalInformation = formCreateAccount();

  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      cnpj: "",
      razaoSocial: "",
      nomeFantasia: "",
    },
  });

  console.log("Estado aqui", formEmpresa);
  const navigate = useNavigate();
  const nextPage = async () => {
    await navigate({
      to: "/create-account/credentials",
      search: { tab: "overview" },
      replace: true, // Replaces current history entry instead of pushing
    });
  };

  const createAccount = useMutation({
    mutationKey: ["createaccount"],
    mutationFn: async () => {
      const userResponse = await fetch(`http://localhost:3000/users`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formStorePersonalInformation),
        credentials: "include",
      });

      if (!userResponse.ok) {
        const errorText = await userResponse.text();
        throw new Error(`Erro ${userResponse.status}: ${errorText}`);
      }

      const userCriado = await userResponse.json();

      const empresaData = {
        ...formStorePersonalInformation,
        idUser: userCriado.id,
      };

      const empresaResponse = await fetch("http://localhost:3000/empresa", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(empresaData),
      });

      if (!empresaResponse.ok) throw new Error("Erro Empresa");

      return empresaResponse.json();
    },
    onSuccess: () => {
      alert("Tudo certo");
    },
  });

  async function onsubmit(data: z.infer<typeof createAccountSchema>) {
    formEmpresa.cnpj = data.cnpj;
    formEmpresa.razaoSocial = data.razaoSocial;
    formEmpresa.nomeFantasia = data.nomeFantasia;

    await createAccount.mutateAsync();

    await nextPage();
  }

  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onsubmit)}>
      <FieldGroup>
        <strong className="text-2xl">Informação Empresarial</strong>
        <div className="flex gap-2 items-end flex-wrap">
          <Controller
            name="cnpj"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contato">CPF</FieldLabel>
                <InputCnpj value={field.value} onChange={field.onChange} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <Controller
          name="razaoSocial"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">
                Razão Social
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="Razão Social"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="nomeFantasia"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">
                Nome Fantasia
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="Nome Fantasia"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className="flex gap-2 flex-wrap">
          <h1>
            <strong>Nome:</strong> {formStorePersonalInformation.nome}
          </h1>{" "}
          <h1>
            <strong>CPF:</strong> {formStorePersonalInformation.cpf}
          </h1>{" "}
          <h1>
            <strong>E-Mail:</strong> {formStorePersonalInformation.email}
          </h1>
        </div>
        <div className="flex gap-2 flex-wrap">
          <h1>
            <strong>Nascimento:</strong>{" "}
            {formStorePersonalInformation.nascimento}
          </h1>
          <h1>
            <strong>Contato:</strong> {formStorePersonalInformation.numero}
          </h1>
        </div>

        <div className="flex gap-2">
          <Link to="/login">
            <Button
              variant="secondary"
              className="cursor-pointer"
              form="form-rhf-demo"
            >
              Voltar
            </Button>
          </Link>
          <Button type="submit" className="cursor-pointer" form="form-rhf-demo">
            Continuar
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
