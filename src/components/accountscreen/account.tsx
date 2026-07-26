import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { formatToCPF, formatToPhone } from "brazilian-values";
import { Calendar, CreditCard, Mail, Phone, User as UserIcon } from "lucide-react";
import { useAuth } from "states/userAuth";

// Helper para gerar iniciais limpas (ex: "Carlos Eduardo" -> "CE")
function getInitials(name?: string): string {
  if (!name) return "US";
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export function Account() {
  const { user } = useAuth();

  const formattedCpf = user?.cpf ? formatToCPF(user.cpf) : "Não informado";
  const formattedPhone = user?.numero ? formatToPhone(user.numero) : "Não informado";

  return (
    <Card className="border border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
          <Avatar className="h-20 w-20 border-2 border-primary/20 shadow-md">
            {user?.avatar ? (
              <AvatarImage src={user.avatar} alt={user.name} />
            ) : (
              <AvatarFallback className="bg-primary/10 text-xl font-bold text-primary">
                {getInitials(user?.name)}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-foreground">{user?.name || "Usuário"}</h2>
            <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground sm:justify-start mt-0.5">
              <Mail className="h-4 w-4" />
              <span>{user?.email}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <CardTitle className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Informações Pessoais
        </CardTitle>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
            <CreditCard className="h-5 w-5 text-muted-foreground shrink-0" />
            <div className="space-y-0.5 overflow-hidden">
              <p className="text-xs font-medium text-muted-foreground">CPF</p>
              <p className="text-sm font-semibold truncate">{formattedCpf}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
            <Calendar className="h-5 w-5 text-muted-foreground shrink-0" />
            <div className="space-y-0.5 overflow-hidden">
              <p className="text-xs font-medium text-muted-foreground">Data de Nascimento</p>
              <p className="text-sm font-semibold truncate">{user?.nascimento || "Não informada"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
            <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
            <div className="space-y-0.5 overflow-hidden">
              <p className="text-xs font-medium text-muted-foreground">Telefone</p>
              <p className="text-sm font-semibold truncate">{formattedPhone}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}