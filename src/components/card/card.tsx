import type { ElementType } from "react";
import { Badge } from "../ui/badge";

interface CardProps {
  valor: number;
  titulo: string;
  texto: string;
  rodape?: string;
  status: string;
  icon: ElementType;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  textColorClass?: string;
}

export function Card({
  valor,
  texto,
  titulo,
  rodape,
  status,
  icon: Icon,
  badgeVariant = "default",
  textColorClass = "text-muted-foreground",
}: CardProps) {
  return (
    <div className="flex-1 min-w-[280px] bg-muted rounded-2xl border-2 shadow-lg">
      <div className="flex flex-col h-full m-5 gap-3">
        <div className="flex justify-between items-start w-full">
          <h1 className="font-semibold text-sm tracking-tight text-foreground">
            {titulo}
          </h1>
          <Badge variant={badgeVariant}>{status}</Badge>
        </div>

        <div className="w-full flex justify-between items-center gap-4 my-2">
          <div className="text-6xl flex gap-3  justify-center items-center tracking-tighter text-foreground">
            <Icon className="h-8 w-8 text-muted-foreground/70" />
            {valor}
          </div>
          <div className="flex flex-col gap-1 w-full text-accent">
            <p className={`${textColorClass} leading-relaxed`}>{texto}</p>
            {rodape && <p className="text-zinc-500 font-medium">{rodape}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
