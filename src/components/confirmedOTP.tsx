import { RefreshCwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

interface inputOTPFormProps {
  user_id: string;
  type: string;
}

const schemaOtp = z.object({
  inputOtp: z.string().length(6, "O código deve conter 6 digitos"),
});

export function InputOTPForm({ user_id, type }: inputOTPFormProps) {
  const form = useForm<z.infer<typeof schemaOtp>>({
    resolver: zodResolver(schemaOtp),
    defaultValues: {
      inputOtp: "",
    },
  });

  const reenviarOTP = useMutation({
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3333/verify`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ user_id, type }),
      });
      if (!response.ok) throw new Error("Erro ao reenviar");
      return response.json();
    },
    onSuccess: () => toast.success("Novo código enviado para seu e-mail!"),
  });

  const enviarConfirmacao = useMutation({
    mutationFn: async (inputOtp: string) => {
      const response = await fetch(`http://localhost:3333/verify/check`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ user_id: user_id, code: inputOtp }),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Código inválido ou expirado");
      return response.json();
    },
  });

  async function onsubmit(data: z.infer<typeof schemaOtp>) {
    try {
      await enviarConfirmacao.mutateAsync(data.inputOtp);
      toast.success(`E-Mail Confirmado com sucesso!`);
      nextPage();
    } catch (error: any) {
      toast.error(error.message || "Algo deu errado");
    }
  }

  const navigate = useNavigate();
  const nextPage = async () => {
    await navigate({
      to: "/create-account/credentials",
      search: { tab: "overview" },
      replace: true,
    });
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Verifique seu acesso</CardTitle>
        <CardDescription>
          Insira o código enviado para seu e-mail
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Agora o FORM envolve o conteúdo e o footer para o submit funcionar */}
        <form
          id="otp-form"
          onSubmit={form.handleSubmit(onsubmit)}
          className="space-y-6"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Código de verificação</span>
            <Button
              type="button" // IMPORTANTE: type button para não dar submit sem querer
              variant="outline"
              size="sm"
              onClick={() => reenviarOTP.mutate()}
              disabled={reenviarOTP.isPending}
            >
              <RefreshCwIcon
                className={`mr-2 h-4 w-4 ${reenviarOTP.isPending ? "animate-spin" : ""}`}
              />
              Reenviar
            </Button>
          </div>

          <Controller
            name="inputOtp"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col items-center gap-2">
                <InputOTP
                  maxLength={6}
                  value={field.value} // Usa o valor do RHF
                  onChange={field.onChange} // Passa a mudança direto pro RHF
                  disabled={enviarConfirmacao.isPending}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                {fieldState.error && (
                  <p className="text-sm text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <Button
            type="submit"
            className="w-full mt-6"
            disabled={enviarConfirmacao.isPending}
          >
            {enviarConfirmacao.isPending ? "Verificando..." : "Verificar Conta"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
