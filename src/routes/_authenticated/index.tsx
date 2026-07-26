import { Card } from "#/components/card/card";
import { createFileRoute } from "@tanstack/react-router";
import { CircleAlert, CircleCheck, CircleX } from "lucide-react";

export const Route = createFileRoute("/_authenticated/")({ component: App });

export default function App() {
  return (
    <div className="w-full flex flex-col justify-center items-start p-3">
      <div className="w-full flex justify-center flex-wrap gap-3 ">
        <Card
          valor={4}
          titulo="Caminhões na estrada"
          texto="Serviços sendo realizados nesse exato momento"
          status="Andamento"
          icon={CircleCheck}
          badgeVariant="default"
          textColorClass="text-zinc-900 font-medium dark:text-zinc-100"
        />

        <Card
          valor={2}
          titulo="Caminhões em Espera"
          texto="Caminhões aguardando a liberação"
          status="Agendado"
          icon={CircleAlert}
          badgeVariant="secondary"
          textColorClass="text-zinc-900 font-medium dark:text-zinc-100"
        />

        <Card
          valor={1}
          titulo="Viagens Canceladas"
          texto="Viagem cancelada"
          status="Cancelado"
          icon={CircleX}
          badgeVariant="destructive"
          textColorClass="text-zinc-900 font-medium dark:text-zinc-100"
        />
      </div>
    </div>
  );
}
