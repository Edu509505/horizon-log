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
import { formCreateAccount } from "../../../../states/createAccount";
import { Link, useNavigate } from "@tanstack/react-router";

const createAccountSchema = z.object({
  nome: z.string().min(5, "Digite seu nome"),
  email: z.email(),
  cpf: z.string().refine((val) => isCPF(val), { error: "CPF inválido" }),
  numero: z
    .string()
    .refine((val) => isPhone(val), { error: "Insira um número válido" }),
  nascimento: z
    .string()
    .refine((val) => isDate(val), { error: "Insira uma data válida" })
    .refine((val) => 2026 - parseInt(val.split("/")[2]) > 22, {
      error: "A idade mínima é de 22 anos",
    }),
});

export function Cadastro() {
  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      nome: "",
      email: "",
      cpf: "",
      nascimento: "",
      numero: "",
    },
  });

  const formStore = formCreateAccount();

  const navigate = useNavigate();
  const nextPage = async () => {
    await navigate({
      to: "/create-account/credentials",
      search: { tab: "overview" },
      replace: true,
    });
  };
  async function onsubmit(data: z.infer<typeof createAccountSchema>) {
    formStore.nome = data.nome;
    formStore.email = data.email;
    formStore.cpf = data.cpf;
    formStore.nascimento = data.nascimento;
    formStore.numero = data.numero;
    console.log("O ESTADO TÁ AQUI", formStore);
    await nextPage();
  }

  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onsubmit)}>
      <FieldGroup>
        <Controller
          name="nome"
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
          <Button type="submit" className="cursor-pointer" form="form-rhf-demo">
            Continuar
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
