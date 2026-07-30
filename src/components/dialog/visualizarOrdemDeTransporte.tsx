import {
  Truck,
  User,
  FileText,
  MapPin,
  Calendar,
  Box,
  ChevronRight,
  UserCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface CardOtProps {
  responsavel: string;
  ordemDeTransporte: string;
  status: string;
  emissao: string;
  numerocontainer: string;
  container: string;
  notaFiscal: string;
  motorista: string;
  caminhao: string;
  placa: string;
  partida: string;
  destino: string;
}

export function VisualizarOrdemDeTransporte({
  responsavel,
  ordemDeTransporte,
  status,
  emissao,
  numerocontainer,
  container,
  notaFiscal,
  motorista,
  caminhao,
  placa,
  partida,
  destino,
}: CardOtProps) {
  // Dados Fictícios para preenchimento estendido
  const dadosFicticios = {
    cpfMotorista: "123.456.789-00",
    cnhMotorista: "09876543210 (Cat. E)",
    telefoneMotorista: "(13) 99876-5432",
    chaveNFe: "3526 0712 3456 7890 0001 5500 1000 0458 9212 3456 7890",
    valorDeclaradoNFe: 142500.0,
    pesoBrutoKg: 22400,
    lacreContainer: "BR-998877",
    placaCarreta: "XYZ-9E87",
    empresaEmissora: "Logística & Transportes S.A.",
  };

  const getStatusBadgeVariant = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes("entregue") || s.includes("concluído")) {
      return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 dark:bg-emerald-500/20 hover:bg-emerald-500/25 border-emerald-200 dark:border-emerald-800/30";
    }
    if (s.includes("trânsito") || s.includes("rota")) {
      return "bg-blue-500/15 text-blue-700 dark:text-blue-400 dark:bg-blue-500/20 hover:bg-blue-500/25 border-blue-200 dark:border-blue-800/30";
    }
    if (s.includes("coleta") || s.includes("aguardando")) {
      return "bg-amber-500/15 text-amber-700 dark:text-amber-400 dark:bg-amber-500/20 hover:bg-amber-500/25 border-amber-200 dark:border-amber-800/30";
    }
    if (s.includes("ocorrência") || s.includes("atraso")) {
      return "bg-destructive/15 text-destructive dark:bg-destructive/20 hover:bg-destructive/25 border-destructive/30";
    }
    return "bg-secondary text-secondary-foreground";
  };

  const dataFormatada = format(new Date(emissao.split(" ")[0]), "dd, MMM/yy", {
    locale: ptBR,
  });
  const horaFormatada = emissao.split(" ")[1]?.split(".")[0].slice(0, 5) || "";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs font-medium text-primary hover:text-primary hover:bg-primary/10 cursor-pointer"
        >
          Detalhes
          <ChevronRight className="size-4 ml-1" />
        </Button>
      </DialogTrigger>

      {/* Aumentado para max-w-4xl / max-w-5xl e aplicado o custom-scrollbar */}
      <DialogContent className="max-w-4xl md:max-w-5xl max-h-[85vh] p-0 overflow-hidden flex flex-col rounded-2xl">
        {/* HEADER FIXO (Não rola junto) */}
        <DialogHeader className="p-6 pb-4 border-b border-border/40 shrink-0">
          <div className="flex items-center justify-between pr-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <Truck className="size-6" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">
                  Ordem de Transporte: {ordemDeTransporte}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2 mt-0.5 text-xs">
                  <Calendar className="size-3.5" /> Emitido em:{" "}
                  {dataFormatada.slice(0, 3) +
                    " " +
                    dataFormatada.split("")[4].toUpperCase() +
                    dataFormatada.slice(5, 7) +
                    dataFormatada.slice(7)}{" "}
                  - {horaFormatada}
                </DialogDescription>
              </div>
            </div>
            <Badge
              variant="outline"
              className={`font-medium border ${getStatusBadgeVariant(status)}`}
            >
              {status.toUpperCase()}
            </Badge>
          </div>
        </DialogHeader>

        {/* ÁREA DE CONTEÚDO COM SCROLL ISOLADO E PADDING DIREITO */}
        <div className="overflow-y-auto custom-scrollbar p-6 space-y-6 text-xs flex-1">
            {/* SEÇÃO 0: Responsável */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20">
            <h4 className="font-semibold text-sm flex items-center gap-2 mb-3 text-primary">
              <UserCircle className="size-4" /> Responsável
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-card rounded-lg border border-border/40">
                <span className="text-[10px] text-muted-foreground block font-medium">
                  Responsável pela Ordem de Transporte
                </span>
                <p className="font-semibold text-sm mt-0.5">{responsavel}</p>
              </div>
            </div>
          </div>

          {/* SEÇÃO 1: ROTA E LOGÍSTICA */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20">
            <h4 className="font-semibold text-sm flex items-center gap-2 mb-3 text-primary">
              <MapPin className="size-4" /> Trajeto / Logística
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-card rounded-lg border border-border/40">
                <span className="text-[10px] text-muted-foreground block font-medium">
                  Ponto de Partida
                </span>
                <p className="font-semibold text-sm mt-0.5">{partida}</p>
              </div>
              <div className="p-3 bg-card rounded-lg border border-border/40">
                <span className="text-[10px] text-muted-foreground block font-medium">
                  Ponto de Destino
                </span>
                <p className="font-semibold text-sm mt-0.5">{destino}</p>
              </div>
            </div>
          </div>

          {/* SEÇÃO 2: CONTÊINER */}
          <div className="p-4 rounded-xl border border-border/60 bg-card">
            <h4 className="font-semibold text-sm flex items-center gap-2 mb-3 text-primary">
              <Box className="size-4" /> Detalhes do Contêiner
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-2.5 bg-muted/30 rounded-lg">
                <span className="text-muted-foreground block text-[10px]">
                  Número
                </span>
                <p className="font-mono font-bold text-sm text-foreground">
                  {numerocontainer}
                </p>
              </div>
              <div className="p-2.5 bg-muted/30 rounded-lg">
                <span className="text-muted-foreground block text-[10px]">
                  Tipo/Tamanho
                </span>
                <p className="font-semibold text-sm">{container}</p>
              </div>
              <div className="p-2.5 bg-muted/30 rounded-lg">
                <span className="text-muted-foreground block text-[10px]">
                  Nº Lacre
                </span>
                <p className="font-mono font-medium text-sm">
                  {dadosFicticios.lacreContainer}
                </p>
              </div>
              <div className="p-2.5 bg-muted/30 rounded-lg">
                <span className="text-muted-foreground block text-[10px]">
                  Peso Bruto
                </span>
                <p className="font-semibold text-sm">
                  {dadosFicticios.pesoBrutoKg.toLocaleString("pt-BR")} Kg
                </p>
              </div>
            </div>
          </div>

          {/* SEÇÃO 3: MOTORISTA E VEÍCULO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-border/60 bg-card space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2 mb-3 text-primary">
                <User className="size-4" /> Motorista
              </h4>
              <div className="p-2.5 bg-muted/20 rounded-lg space-y-2">
                <div>
                  <span className="text-muted-foreground text-[10px]">
                    Nome Completo:
                  </span>
                  <p className="font-semibold text-sm">{motorista}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-border/30">
                  <div>
                    <span className="text-muted-foreground text-[10px]">
                      CPF:
                    </span>
                    <p className="font-mono font-medium">
                      {dadosFicticios.cpfMotorista}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-[10px]">
                      Contato:
                    </span>
                    <p className="font-medium">
                      {dadosFicticios.telefoneMotorista}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border/60 bg-card space-y-2">
              <h4 className="font-semibold text-sm flex items-center gap-2 mb-3 text-primary">
                <Truck className="size-4" /> Veículo / Frota
              </h4>
              <div className="p-2.5 bg-muted/20 rounded-lg space-y-2">
                <div>
                  <span className="text-muted-foreground text-[10px]">
                    Caminhão / Modelo:
                  </span>
                  <p className="font-semibold text-sm">{caminhao}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-border/30">
                  <div>
                    <span className="text-muted-foreground text-[10px]">
                      Placa Cavalo:
                    </span>
                    <p className="font-mono font-bold text-primary">{placa}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-[10px]">
                      Placa Carreta:
                    </span>
                    <p className="font-mono font-bold">
                      {dadosFicticios.placaCarreta}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* SEÇÃO 4: NOTA FISCAL */}
          <div className="p-4 rounded-xl border border-border/60 bg-card space-y-3">
            <h4 className="font-semibold text-sm flex items-center gap-2 text-primary">
              <FileText className="size-4" /> Informações Fiscais (NFe)
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 bg-muted/30 p-3 rounded-lg">
              <div>
                <span className="text-muted-foreground block text-[10px]">
                  Nº da Nota
                </span>
                <p className="font-mono font-bold text-sm">{notaFiscal}</p>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px]">
                  Valor Declarado
                </span>
                <p className="font-semibold text-sm text-emerald-600 dark:text-emerald-400">
                  R${" "}
                  {dadosFicticios.valorDeclaradoNFe.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <span className="text-muted-foreground block text-[10px]">
                  Empresa Emissora
                </span>
                <p className="font-medium text-sm truncate">
                  {dadosFicticios.empresaEmissora}
                </p>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-muted-foreground block mb-1 font-medium">
                Chave de Acesso NFe:
              </span>
              <p className="font-mono text-xs p-2.5 bg-muted/60 rounded-lg border border-border/50 break-all select-all font-medium">
                {dadosFicticios.chaveNFe}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
