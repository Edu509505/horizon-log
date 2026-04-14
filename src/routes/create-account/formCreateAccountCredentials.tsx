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
import { Button } from "../../components/ui/button";
// import { formCreateAccount } from "../../../../states/createAccount";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Input } from "#/components/ui/input";
import { InputCnpj } from "#/components/inputAutoCurrent/InputCnpj";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "states/userAuth";
import { toast } from "sonner";

const createEmpresaSchema = z.object({
  user_id: z.string(),
  cnpj: z.string().refine((val) => isCNPJ(val), { error: "CNPJ inválido" }),
  razaosocial: z.string().min(5, "Nome inválido"),
  nomefantasia: z.string().min(1, "Deve ter pelo menos um caractere"),
});

export const Route = createFileRoute(
  "/create-account/formCreateAccountCredentials",
)({
  component: CadastroMaisInformacoes,
  beforeLoad: async ({ location }) => {
    const storage = localStorage.getItem("horizon-auth");

    try {
      const authData = storage ? JSON.parse(storage) : null;
      const token = authData?.state?.token;

      // 3. Se não tiver token ou for undefined/null, tchau!
      if (!token || token === "undefined") {
        throw redirect({
          to: "/login",
          search: { redirect: location.href },
        });
      }
    } catch (e) {
      throw redirect({ to: "/login" });
    }
  },
});

export function CadastroMaisInformacoes() {
  const user = useAuth();

  const form = useForm<z.infer<typeof createEmpresaSchema>>({
    resolver: zodResolver(createEmpresaSchema),
    defaultValues: {
      user_id: user.user.id,
      cnpj: "",
      razaosocial: "",
      nomefantasia: "",
    },
  });

  const navigate = useNavigate();
  const nextPage = async () => {
    await navigate({
      to: "/",
      search: { tab: "overview" },
      replace: true,
    });
  };

  // const [isOpen, setIsOpen] = useState<boolean | undefined>(false);

  const token = useAuth();

  const createAccount = useMutation({
    mutationKey: ["createaccount"],
    mutationFn: async (data: z.infer<typeof createEmpresaSchema>) => {
      const response = await fetch(`http://localhost:3333/empresa`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token.token}`,
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

  async function onsubmit(data: z.infer<typeof createEmpresaSchema>) {
    try {
      await createAccount.mutateAsync(data);

      toast.success(`Corporação criada com Sucesso!!!`);

      await nextPage();
    } catch (error: any) {
      const message = error.response?.data?.message || "Falha ao criar empresa";
      toast.error(message);
    }
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
                <FieldLabel htmlFor="contato">Cnpj</FieldLabel>
                <InputCnpj value={field.value} onChange={field.onChange} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <Controller
          name="razaosocial"
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
          name="nomefantasia"
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

        <div className="flex gap-2">
          <Button type="submit" className="cursor-pointer" form="form-rhf-demo">
            Continuar
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
