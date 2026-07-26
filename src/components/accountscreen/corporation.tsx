import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { formatToCNPJ } from "brazilian-values";
import { Building2, FileText, Hash } from "lucide-react";
import { useAuth } from "states/userAuth";

export interface Empresa {
  id: string;
  nomefantasia: string;
  razaosocial: string;
  cnpj: string;
}

export function Corporation() {
  const auth = useAuth();
  const empresas: Empresa[] = auth.user?.empresas || [];

  return (
    <Card className="border border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-bold">
          <Building2 className="h-5 w-5 text-primary" />
          {empresas.length > 1 ? "Empresas Vinculadas" : "Empresa Vinculada"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {empresas.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {empresas.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between space-y-3 rounded-xl border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <div>
                  <h3 className="font-bold text-foreground text-base">
                    {item.nomefantasia || item.razaosocial}
                  </h3>
                  <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">
                        <strong>Razão Social:</strong> {item.razaosocial}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Hash className="h-3.5 w-3.5 shrink-0" />
                      <span>
                        <strong>CNPJ:</strong> {item.cnpj ? formatToCNPJ(item.cnpj) : item.cnpj}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <Building2 className="h-10 w-10 text-muted-foreground/50 mb-2" />
            <p className="text-sm font-medium text-muted-foreground">
              Nenhuma empresa vinculada a este usuário.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}