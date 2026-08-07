import { Badge } from "./ui/badge";

interface Status {
  estado: string;
}

export function BadgeStatus({ estado }: Status) {
  const getStatusBadgeVariant = (estado: string) => {
    const s = estado.toLowerCase();
    if (s.includes("entregue") || s.includes("concluído")) {
      return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 dark:bg-emerald-500/20 hover:bg-emerald-500/25 border-emerald-200 dark:border-emerald-800/30";
    }
    if (s.includes("trânsito") || s.includes("rota")) {
      return "bg-blue-500/15 text-blue-700 dark:text-blue-400 dark:bg-blue-500/20 hover:bg-blue-500/25 border-blue-200 dark:border-blue-800/30";
    }
    if (s.includes("coleta") || s.includes("aguardando") || s.includes("pendente")) {
      return "bg-amber-500/15 text-amber-700 dark:text-amber-400 dark:bg-amber-500/20 hover:bg-amber-500/25 border-amber-200 dark:border-amber-800/30";
    }
    if (s.includes("ocorrência") || s.includes("atraso") || s.includes("cancelado")) {
      return "bg-destructive/15 text-destructive dark:bg-destructive/20 hover:bg-destructive/25 border-destructive/30";
    }
    return "bg-secondary text-secondary-foreground";
  };

  return (
    <Badge
      variant="outline"
      className={`font-medium text-xs border ${getStatusBadgeVariant(estado)}`}
    >{estado.toUpperCase()}</Badge>
  );
}
