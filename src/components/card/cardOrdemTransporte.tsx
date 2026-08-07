import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ArrowRight,
  Clock,
  FileText,
  MapPin,
  Package,
  Truck,
  User,
  UserCircle,
} from "lucide-react";
import { VisualizarOrdemDeTransporte } from "../dialog/visualizarOrdemDeTransporte";
import { calcularTempo } from "#/function/CalcularTempo";
import { BadgeStatus } from "../badgeStatus";

interface CardOtProps {
  responsavel: string;
  ordemDeTransporte: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  numerocontainer: string;
  container: string;
  notaFiscal: string;
  motorista: string;
  caminhao: string;
  placa: string;
  partida: string;
  destino: string;
}

export function CardOrdemTransporte({
  responsavel,
  ordemDeTransporte,
  status,
  createdAt,
  updatedAt,
  numerocontainer,
  container,
  notaFiscal,
  motorista,
  caminhao,
  placa,
  partida,
  destino,
}: CardOtProps) {

  const dataFormatada = format(
    new Date(createdAt.split(" ")[0]),
    "dd, MMM/yy",
    {
      locale: ptBR,
    },
  );
  const horaFormatada =
    createdAt.split(" ")[1]?.split(".")[0].slice(0, 5) || "";

  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-all duration-200 border-border bg-card text-card-foreground">
      {/* CABEÇALHO */}
      <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
        {/* <div className="flex items-center gap-2.5 "> */}
        <span className="font-bold text-sm tracking-tight text-foreground">
          #{ordemDeTransporte}
        </span>
        <BadgeStatus estado={status as string} />
        
        {/* </div> */}
        <div className="flex items-center text-xs text-muted-foreground font-medium tracking-wider">
          {dataFormatada.slice(0, 3) +
            " " +
            dataFormatada.split("")[4].toUpperCase() +
            dataFormatada.slice(5, 7) +
            dataFormatada.slice(7)}
          {" - "}
          {horaFormatada && ` ${horaFormatada}`}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 pt-1">
        {/* CARGA E DOCUMENTOS */}
        <div className="flex flex-col gap-1.5 text-sm">
          <div className="flex items-center gap-2 text-foreground">
            <UserCircle className="size-4 text-muted-foreground" />
            <span className="font-semibold">Responsável:</span>
            <span className="text-muted-foreground text-xs">{responsavel}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <Package className="size-4 text-muted-foreground" />
            <span className="font-semibold">{numerocontainer}</span>
            <span className="text-muted-foreground text-xs">({container})</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <FileText className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground text-xs">NF:</span>
            <span className="font-medium text-xs">{notaFiscal}</span>
          </div>
        </div>

        {/* MOTORISTA E VEÍCULO (Usando bg-muted e border-border) */}
        <div className="flex flex-col gap-2 text-sm bg-muted/50 p-3 rounded-lg border border-border/60">
          <div className="flex items-center gap-2 text-foreground">
            <User className="size-4 text-muted-foreground" />
            <span className="font-medium">{motorista}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <Truck className="size-4 text-muted-foreground" />
            <span className="font-semibold uppercase tracking-wide">
              {placa}
            </span>
            <span className="text-muted-foreground text-xs">({caminhao})</span>
          </div>
        </div>

        {/* ROTA */}
        <div className="flex items-center justify-between text-sm mt-1 px-1">
          <div className="flex flex-col items-center gap-1 w-2/5 text-center">
            <MapPin className="size-4 text-muted-foreground" />
            <span
              className="font-medium text-foreground line-clamp-1 text-xs"
              title={partida}
            >
              {partida}
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center relative px-2">
            <div className="h-[2px] w-full bg-border" />
            <ArrowRight className="size-4 text-muted-foreground absolute bg-card px-0.5" />
          </div>

          <div className="flex flex-col items-center gap-1 w-2/5 text-center">
            <MapPin className="size-4 text-primary" />
            <span
              className="font-medium text-foreground line-clamp-1 text-xs"
              title={destino}
            >
              {destino}
            </span>
          </div>
        </div>
      </CardContent>

      <Separator />

      {/* RODAPÉ */}
      <CardFooter className="flex items-center justify-between py-2.5 bg-muted/20 rounded-b-lg">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="size-3.5" />
          <span>Atualizado {calcularTempo(updatedAt)}</span>
        </div>
        <VisualizarOrdemDeTransporte
          responsavel={responsavel}
          caminhao={caminhao}
          container={container}
          destino={destino}
          createdAt={createdAt}
          updatedAt={updatedAt}
          motorista={motorista}
          notaFiscal={notaFiscal}
          numerocontainer={numerocontainer}
          ordemDeTransporte={ordemDeTransporte}
          partida={partida}
          placa={placa}
          status={status}
        />
      </CardFooter>
    </Card>
  );
}
