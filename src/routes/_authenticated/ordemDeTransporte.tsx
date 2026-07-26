import { CardOrdemTransporte } from "#/components/card/cardOrdemTransporte";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search, Truck } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/ordemDeTransporte")({
  component: RouteComponent,
});

const ordemDeTransporte = [
  {
    id: 1,
    ordemDeTransporte: "OT-10001",
    status: "trânsito",
    emissao: "2026-07-26 08:15:22.000Z",
    numerocontainer: "MAEU1829304",
    container: "Dry 40'",
    notaFiscal: "102938",
    motorista: "Carlos Eduardo Silva",
    caminhao: "Volvo FH 540",
    placa: "BRA2E19",
    partida: "Santos - SP",
    destino: "Campinas - SP"
  },
  {
    id: 2,
    ordemDeTransporte: "OT-10002",
    status: "entregue",
    emissao: "2026-07-25 14:30:10.000Z",
    numerocontainer: "MSCU9281745",
    container: "Reefer 40'",
    notaFiscal: "102939",
    motorista: "Roberto Alves",
    caminhao: "Scania R450",
    placa: "ABC1D23",
    partida: "Paranaguá - PR",
    destino: "Curitiba - PR"
  },
  {
    id: 3,
    ordemDeTransporte: "OT-10003",
    status: "coleta",
    emissao: "2026-07-26 10:00:00.000Z",
    numerocontainer: "CMAU7362514",
    container: "Dry 20'",
    notaFiscal: "102940",
    motorista: "Fernando Souza",
    caminhao: "Mercedes-Benz Actros",
    placa: "KXZ9F88",
    partida: "Guarujá - SP",
    destino: "Sertãozinho - SP"
  },
  {
    id: 4,
    ordemDeTransporte: "OT-10004",
    status: "ocorrência",
    emissao: "2026-07-24 18:22:45.000Z",
    numerocontainer: "COSU8473625",
    container: "Open Top",
    notaFiscal: "102941",
    motorista: "Luciano Mendes",
    caminhao: "DAF XF 530",
    placa: "MNO4H56",
    partida: "Itajaí - SC",
    destino: "Blumenau - SC"
  },
  {
    id: 5,
    ordemDeTransporte: "OT-10005",
    status: "trânsito",
    emissao: "2026-07-26 06:45:12.000Z",
    numerocontainer: "HAPU9182736",
    container: "Dry 40'",
    notaFiscal: "102942",
    motorista: "Marcos Ribeiro",
    caminhao: "MAN TGX 28.440",
    placa: "GHI7J89",
    partida: "Rio Grande - RS",
    destino: "Caxias do Sul - RS"
  },
  {
    id: 6,
    ordemDeTransporte: "OT-10006",
    status: "entregue",
    emissao: "2026-07-23 11:10:05.000Z",
    numerocontainer: "EGLU1298347",
    container: "Flat Rack",
    notaFiscal: "102943",
    motorista: "Ailton Pereira",
    caminhao: "Iveco Hi-Way",
    placa: "QWE3R45",
    partida: "Suape - PE",
    destino: "Recife - PE"
  },
  {
    id: 7,
    ordemDeTransporte: "OT-10007",
    status: "coleta",
    emissao: "2026-07-26 09:30:18.000Z",
    numerocontainer: "OOCU9834712",
    container: "Reefer 20'",
    notaFiscal: "102944",
    motorista: "Thiago Barbosa",
    caminhao: "Volkswagen Meteor",
    placa: "ZXC9V87",
    partida: "Cubatão - SP",
    destino: "São José dos Campos - SP"
  },
  {
    id: 8,
    ordemDeTransporte: "OT-10008",
    status: "trânsito",
    emissao: "2026-07-25 22:15:30.000Z",
    numerocontainer: "SUDU8273641",
    container: "Dry 40'",
    notaFiscal: "102945",
    motorista: "Marcio Santos",
    caminhao: "Volvo FH 460",
    placa: "TYU5I67",
    partida: "Pecém - CE",
    destino: "Fortaleza - CE"
  },
  {
    id: 9,
    ordemDeTransporte: "OT-10009",
    status: "entregue",
    emissao: "2026-07-22 16:50:00.000Z",
    numerocontainer: "ONEU3847261",
    container: "Dry 20'",
    notaFiscal: "102946",
    motorista: "André Luiz Castro",
    caminhao: "Scania R500",
    placa: "OPL2M34",
    partida: "Santos - SP",
    destino: "Belo Horizonte - MG"
  },
  {
    id: 10,
    ordemDeTransporte: "OT-10010",
    status: "ocorrência",
    emissao: "2026-07-26 01:05:40.000Z",
    numerocontainer: "YMLU8374625",
    container: "Reefer 40'",
    notaFiscal: "102947",
    motorista: "Gilberto Rocha",
    caminhao: "Mercedes-Benz Axor",
    placa: "RTY8U90",
    partida: "Rio de Janeiro - RJ",
    destino: "Volta Redonda - RJ"
  },
  {
    id: 11,
    ordemDeTransporte: "OT-10011",
    status: "trânsito",
    emissao: "2026-07-26 05:12:00.000Z",
    numerocontainer: "EVER4738291",
    container: "Dry 40'",
    notaFiscal: "102948",
    motorista: "Rodrigo Costa",
    caminhao: "Volvo FH 540",
    placa: "JHG4F32",
    partida: "Vitoria - ES",
    destino: "Cachoeiro de Itapemirim - ES"
  },
  {
    id: 12,
    ordemDeTransporte: "OT-10012",
    status: "coleta",
    emissao: "2026-07-26 11:40:00.000Z",
    numerocontainer: "ZIMU9283746",
    container: "Dry 20'",
    notaFiscal: "102949",
    motorista: "Edson Martins",
    caminhao: "Scania G450",
    placa: "MNB6V54",
    partida: "São Francisco do Sul - SC",
    destino: "Joinville - SC"
  },
  {
    id: 13,
    ordemDeTransporte: "OT-10013",
    status: "entregue",
    emissao: "2026-07-21 09:15:00.000Z",
    numerocontainer: "UACU8374920",
    container: "Dry 40'",
    notaFiscal: "102950",
    motorista: "Paulo Henrique",
    caminhao: "DAF XF 480",
    placa: "POI9U87",
    partida: "Santos - SP",
    destino: "Goiânia - GO"
  },
  {
    id: 14,
    ordemDeTransporte: "OT-10014",
    status: "trânsito",
    emissao: "2026-07-25 19:30:00.000Z",
    numerocontainer: "KMTC7281934",
    container: "Reefer 40'",
    notaFiscal: "102951",
    motorista: "Sérgio Ramos",
    caminhao: "Volkswagen Constellation",
    placa: "LKJ5H43",
    partida: "Manaus - AM",
    destino: "Boa Vista - RR"
  },
  {
    id: 15,
    ordemDeTransporte: "OT-10015",
    status: "coleta",
    emissao: "2026-07-26 07:20:11.000Z",
    numerocontainer: "WHLU9382710",
    container: "Dry 20'",
    notaFiscal: "102952",
    motorista: "Lucas Lima",
    caminhao: "Mercedes-Benz Atego",
    placa: "QAZ1WS2",
    partida: "Salvador - BA",
    destino: "Feira de Santana - BA"
  },
  {
    id: 16,
    ordemDeTransporte: "OT-10016",
    status: "entregue",
    emissao: "2026-07-24 13:00:00.000Z",
    numerocontainer: "SITC8273940",
    container: "Dry 40'",
    notaFiscal: "102953",
    motorista: "Renato Teixeira",
    caminhao: "Volvo FM 380",
    placa: "EDC3RF4",
    partida: "Santos - SP",
    destino: "Jundiaí - SP"
  },
  {
    id: 17,
    ordemDeTransporte: "OT-10017",
    status: "trânsito",
    emissao: "2026-07-26 03:50:00.000Z",
    numerocontainer: "TSLU9182374",
    container: "Open Top",
    notaFiscal: "102954",
    motorista: "Fábio Junior",
    caminhao: "Scania R450",
    placa: "TGB5YH6",
    partida: "Paranaguá - PR",
    destino: "Maringá - PR"
  },
  {
    id: 18,
    ordemDeTransporte: "OT-10018",
    status: "ocorrência",
    emissao: "2026-07-25 17:10:00.000Z",
    numerocontainer: "SMLU7364521",
    container: "Flat Rack",
    notaFiscal: "102955",
    motorista: "Wagner Moreira",
    caminhao: "Iveco Stralis",
    placa: "UJM7IK8",
    partida: "Rio Grande - RS",
    destino: "Pelotas - RS"
  },
  {
    id: 19,
    ordemDeTransporte: "OT-10019",
    status: "coleta",
    emissao: "2026-07-26 12:00:00.000Z",
    numerocontainer: "IRSU9283741",
    container: "Dry 20'",
    notaFiscal: "102956",
    motorista: "Daniel Farias",
    caminhao: "MAN TGX 29.480",
    placa: "OLP9IK8",
    partida: "Santos - SP",
    destino: "Sorocaba - SP"
  },
  {
    id: 20,
    ordemDeTransporte: "OT-10020",
    status: "trânsito",
    emissao: "2026-07-26 02:10:00.000Z",
    numerocontainer: "MATS8273645",
    container: "Reefer 40'",
    notaFiscal: "102957",
    motorista: "Claudio Duarte",
    caminhao: "Volvo FH 500",
    placa: "RFV4TGB",
    partida: "Itajaí - SC",
    destino: "Chapecó - SC"
  },
  {
    id: 21,
    ordemDeTransporte: "OT-10021",
    status: "entregue",
    emissao: "2026-07-20 15:40:00.000Z",
    numerocontainer: "TLLU9384726",
    container: "Dry 40'",
    notaFiscal: "102958",
    motorista: "Jorge Luiz",
    caminhao: "Mercedes-Benz Actros",
    placa: "YHN6UJM",
    partida: "Vitoria - ES",
    destino: "Belo Horizonte - MG"
  },
  {
    id: 22,
    ordemDeTransporte: "OT-10022",
    status: "trânsito",
    emissao: "2026-07-25 21:00:00.000Z",
    numerocontainer: "HAMU8273619",
    container: "Dry 20'",
    notaFiscal: "102959",
    motorista: "Vitor Hugo",
    caminhao: "Scania P360",
    placa: "EDC4RFV",
    partida: "Suape - PE",
    destino: "Caruaru - PE"
  },
  {
    id: 23,
    ordemDeTransporte: "OT-10023",
    status: "coleta",
    emissao: "2026-07-26 08:00:00.000Z",
    numerocontainer: "CULU9382716",
    container: "Reefer 20'",
    notaFiscal: "102960",
    motorista: "Leandro Nogueira",
    caminhao: "Volkswagen Meteor",
    placa: "WSX3EDC",
    partida: "Guarujá - SP",
    destino: "Ribeirão Preto - SP"
  },
  {
    id: 24,
    ordemDeTransporte: "OT-10024",
    status: "entregue",
    emissao: "2026-07-23 08:30:00.000Z",
    numerocontainer: "CNIU8273640",
    container: "Dry 40'",
    notaFiscal: "102961",
    motorista: "Bruno Machado",
    caminhao: "DAF XF 530",
    placa: "QAZ2WSX",
    partida: "Santos - SP",
    destino: "Uberlândia - MG"
  },
  {
    id: 25,
    ordemDeTransporte: "OT-10025",
    status: "ocorrência",
    emissao: "2026-07-26 04:15:00.000Z",
    numerocontainer: "CSQU7362519",
    container: "Open Top",
    notaFiscal: "102962",
    motorista: "Alexandre Pires",
    caminhao: "Volvo FH 460",
    placa: "PLM0OKN",
    partida: "Rio de Janeiro - RJ",
    destino: "Macaé - RJ"
  },
  {
    id: 26,
    ordemDeTransporte: "OT-10026",
    status: "trânsito",
    emissao: "2026-07-25 13:20:00.000Z",
    numerocontainer: "IALU8273641",
    container: "Dry 40'",
    notaFiscal: "102963",
    motorista: "Gabriel Jesus",
    caminhao: "Scania R540",
    placa: "OKN9IJB",
    partida: "Paranaguá - PR",
    destino: "Londrina - PR"
  },
  {
    id: 27,
    ordemDeTransporte: "OT-10027",
    status: "coleta",
    emissao: "2026-07-26 10:45:00.000Z",
    numerocontainer: "MOHU8273642",
    container: "Dry 20'",
    notaFiscal: "102964",
    motorista: "Rafael Santos",
    caminhao: "Mercedes-Benz Atego",
    placa: "IJB8UHV",
    partida: "Santos - SP",
    destino: "Bauru - SP"
  },
  {
    id: 28,
    ordemDeTransporte: "OT-10028",
    status: "entregue",
    emissao: "2026-07-19 17:00:00.000Z",
    numerocontainer: "SINU9283741",
    container: "Reefer 40'",
    notaFiscal: "102965",
    motorista: "Diego Nunes",
    caminhao: "MAN TGX 28.440",
    placa: "UHV7YGC",
    partida: "Itajaí - SC",
    destino: "Florianópolis - SC"
  },
  {
    id: 29,
    ordemDeTransporte: "OT-10029",
    status: "trânsito",
    emissao: "2026-07-26 00:30:00.000Z",
    numerocontainer: "SASU8273610",
    container: "Dry 40'",
    notaFiscal: "102966",
    motorista: "Samuel Rosa",
    caminhao: "Iveco Hi-Way",
    placa: "YGC6XFZ",
    partida: "Rio Grande - RS",
    destino: "Porto Alegre - RS"
  },
  {
    id: 30,
    ordemDeTransporte: "OT-10030",
    status: "coleta",
    emissao: "2026-07-26 09:00:00.000Z",
    numerocontainer: "HEID8273640",
    container: "Flat Rack",
    notaFiscal: "102967",
    motorista: "Gustavo Lima",
    caminhao: "Volvo FH 540",
    placa: "XFZ5TSR",
    partida: "Santos - SP",
    destino: "Taubaté - SP"
  },
  {
    id: 31,
    ordemDeTransporte: "OT-10031",
    status: "entregue",
    emissao: "2026-07-24 10:20:00.000Z",
    numerocontainer: "GSLU9283710",
    container: "Dry 20'",
    notaFiscal: "102968",
    motorista: "Vinicius Junior",
    caminhao: "Volkswagen Constellation",
    placa: "TSR4EDC",
    partida: "Pecém - CE",
    destino: "Sobral - CE"
  },
  {
    id: 32,
    ordemDeTransporte: "OT-10032",
    status: "trânsito",
    emissao: "2026-07-25 18:00:00.000Z",
    numerocontainer: "CKLU8273619",
    container: "Reefer 40'",
    notaFiscal: "102969",
    motorista: "Matheus Henrique",
    caminhao: "Scania G440",
    placa: "EDC3RFV",
    partida: "Salvador - BA",
    destino: "Vitória da Conquista - BA"
  },
  {
    id: 33,
    ordemDeTransporte: "OT-10033",
    status: "ocorrência",
    emissao: "2026-07-26 07:10:00.000Z",
    numerocontainer: "NVIU8273640",
    container: "Dry 40'",
    notaFiscal: "102970",
    motorista: "Thiago Silva",
    caminhao: "Mercedes-Benz Actros",
    placa: "RFV2TGB",
    partida: "Santos - SP",
    destino: "Piracicaba - SP"
  },
  {
    id: 34,
    ordemDeTransporte: "OT-10034",
    status: "coleta",
    emissao: "2026-07-26 11:15:00.000Z",
    numerocontainer: "BENU9283740",
    container: "Dry 20'",
    notaFiscal: "102971",
    motorista: "Igor Guimarães",
    caminhao: "DAF XF 480",
    placa: "TGB1YHN",
    partida: "Manaus - AM",
    destino: "Humaitá - AM"
  },
  {
    id: 35,
    ordemDeTransporte: "OT-10035",
    status: "entregue",
    emissao: "2026-07-22 14:00:00.000Z",
    numerocontainer: "LMCU8273610",
    container: "Open Top",
    notaFiscal: "102972",
    motorista: "Caio Castro",
    caminhao: "Volvo FM 370",
    placa: "YHN0UJM",
    partida: "Aratu - BA",
    destino: "Camaçari - BA"
  },
  {
    id: 36,
    ordemDeTransporte: "OT-10036",
    status: "trânsito",
    emissao: "2026-07-25 15:45:00.000Z",
    numerocontainer: "DJLU9283740",
    container: "Dry 40'",
    notaFiscal: "102973",
    motorista: "Murilo Benício",
    caminhao: "Scania R450",
    placa: "UJM9IK8",
    partida: "Paranaguá - PR",
    destino: "Ponta Grossa - PR"
  },
  {
    id: 37,
    ordemDeTransporte: "OT-10037",
    status: "coleta",
    emissao: "2026-07-26 08:30:00.000Z",
    numerocontainer: "SWLU8273619",
    container: "Reefer 20'",
    notaFiscal: "102974",
    motorista: "Otavio Mesquita",
    caminhao: "MAN TGX 29.440",
    placa: "IK87OLP",
    partida: "Santos - SP",
    destino: "Franca - SP"
  },
  {
    id: 38,
    ordemDeTransporte: "OT-10038",
    status: "entregue",
    emissao: "2026-07-18 11:30:00.000Z",
    numerocontainer: "PASU9283710",
    container: "Dry 40'",
    notaFiscal: "102975",
    motorista: "Douglas Sampaio",
    caminhao: "Volkswagen Meteor",
    placa: "OLP6QAZ",
    partida: "Itajaí - SC",
    destino: "Criciúma - SC"
  },
  {
    id: 39,
    ordemDeTransporte: "OT-10039",
    status: "trânsito",
    emissao: "2026-07-26 01:20:00.000Z",
    numerocontainer: "STXU8273640",
    container: "Flat Rack",
    notaFiscal: "102976",
    motorista: "Elias Terceiro",
    caminhao: "Mercedes-Benz Axor",
    placa: "QAZ5WSX",
    partida: "Suape - PE",
    destino: "Petrolina - PE"
  },
  {
    id: 40,
    ordemDeTransporte: "OT-10040",
    status: "ocorrência",
    emissao: "2026-07-25 20:10:00.000Z",
    numerocontainer: "RONG9283740",
    container: "Dry 20'",
    notaFiscal: "102977",
    motorista: "Felipe Titto",
    caminhao: "Iveco Hi-Way",
    placa: "WSX4EDC",
    partida: "Santos - SP",
    destino: "Presidente Prudente - SP"
  },
  {
    id: 41,
    ordemDeTransporte: "OT-10041",
    status: "coleta",
    emissao: "2026-07-26 10:10:00.000Z",
    numerocontainer: "TRHU8273610",
    container: "Dry 40'",
    notaFiscal: "102978",
    motorista: "Guilherme Winter",
    caminhao: "Volvo FH 540",
    placa: "EDC3RFV",
    partida: "Vitoria - ES",
    destino: "Linhares - ES"
  },
  {
    id: 42,
    ordemDeTransporte: "OT-10042",
    status: "entregue",
    emissao: "2026-07-21 16:20:00.000Z",
    numerocontainer: "TGHU9283740",
    container: "Reefer 40'",
    notaFiscal: "102979",
    motorista: "Henrique Fogaça",
    caminhao: "Scania R500",
    placa: "RFV2TGB",
    partida: "Rio Grande - RS",
    destino: "Passo Fundo - RS"
  },
  {
    id: 43,
    ordemDeTransporte: "OT-10043",
    status: "trânsito",
    emissao: "2026-07-26 04:00:00.000Z",
    numerocontainer: "MBLU8273619",
    container: "Dry 20'",
    notaFiscal: "102980",
    motorista: "Julio Rocha",
    caminhao: "DAF XF 530",
    placa: "TGB1YHN",
    partida: "Santos - SP",
    destino: "Marília - SP"
  },
  {
    id: 44,
    ordemDeTransporte: "OT-10044",
    status: "coleta",
    emissao: "2026-07-26 06:15:00.000Z",
    numerocontainer: "BLJU9283740",
    container: "Open Top",
    notaFiscal: "102981",
    motorista: "Kleibson Souza",
    caminhao: "Mercedes-Benz Actros",
    placa: "YHN0UJM",
    partida: "Pecém - CE",
    destino: "Juazeiro do Norte - CE"
  },
  {
    id: 45,
    ordemDeTransporte: "OT-10045",
    status: "entregue",
    emissao: "2026-07-24 18:30:00.000Z",
    numerocontainer: "SNCU8273610",
    container: "Dry 40'",
    notaFiscal: "102982",
    motorista: "Luan Santana",
    caminhao: "Volkswagen Constellation",
    placa: "UJM9IK8",
    partida: "Santos - SP",
    destino: "São José do Rio Preto - SP"
  },
  {
    id: 46,
    ordemDeTransporte: "OT-10046",
    status: "trânsito",
    emissao: "2026-07-25 11:00:00.000Z",
    numerocontainer: "GESU9283740",
    container: "Reefer 20'",
    notaFiscal: "102983",
    motorista: "Michel Teló",
    caminhao: "Volvo FM 380",
    placa: "IK88OLP",
    partida: "Paranaguá - PR",
    destino: "Foz do Iguaçu - PR"
  },
  {
    id: 47,
    ordemDeTransporte: "OT-10047",
    status: "ocorrência",
    emissao: "2026-07-26 02:50:00.000Z",
    numerocontainer: "VMCU8273619",
    container: "Dry 40'",
    notaFiscal: "102984",
    motorista: "Neymar da Silva",
    caminhao: "Scania R450",
    placa: "OLP7QAZ",
    partida: "Rio de Janeiro - RJ",
    destino: "Resende - RJ"
  },
  {
    id: 48,
    ordemDeTransporte: "OT-10048",
    status: "coleta",
    emissao: "2026-07-26 11:50:00.000Z",
    numerocontainer: "LCLU9283740",
    container: "Flat Rack",
    notaFiscal: "102985",
    motorista: "Orlando Drummond",
    caminhao: "MAN TGX 28.440",
    placa: "QAZ6WSX",
    partida: "Itajaí - SC",
    destino: "Jaraguá do Sul - SC"
  },
  {
    id: 49,
    ordemDeTransporte: "OT-10049",
    status: "entregue",
    emissao: "2026-07-23 12:10:00.000Z",
    numerocontainer: "HDAS8273610",
    container: "Dry 20'",
    notaFiscal: "102986",
    motorista: "Pedro Bial",
    caminhao: "Iveco Stralis",
    placa: "WSX5EDC",
    partida: "Santos - SP",
    destino: "Limeira - SP"
  },
  {
    id: 50,
    ordemDeTransporte: "OT-10050",
    status: "trânsito",
    emissao: "2026-07-26 03:15:00.000Z",
    numerocontainer: "KASD9283740",
    container: "Dry 40'",
    notaFiscal: "102987",
    motorista: "Quirino Neto",
    caminhao: "Mercedes-Benz Atego",
    placa: "EDC4RFV",
    partida: "Salvador - BA",
    destino: "Ilhéus - BA"
  },
  {
    id: 51,
    ordemDeTransporte: "OT-10051",
    status: "coleta",
    emissao: "2026-07-26 08:45:00.000Z",
    numerocontainer: "POIS8273619",
    container: "Reefer 40'",
    notaFiscal: "102988",
    motorista: "Ronaldo Nazario",
    caminhao: "Volvo FH 500",
    placa: "RFV3TGB",
    partida: "Santos - SP",
    destino: "Araraquara - SP"
  },
  {
    id: 52,
    ordemDeTransporte: "OT-10052",
    status: "entregue",
    emissao: "2026-07-20 09:00:00.000Z",
    numerocontainer: "LKJS9283740",
    container: "Dry 20'",
    notaFiscal: "102989",
    motorista: "Sidney Magal",
    caminhao: "Scania G450",
    placa: "TGB2YHN",
    partida: "Suape - PE",
    destino: "Olinda - PE"
  },
  {
    id: 53,
    ordemDeTransporte: "OT-10053",
    status: "trânsito",
    emissao: "2026-07-25 16:30:00.000Z",
    numerocontainer: "MNBV8273610",
    container: "Dry 40'",
    notaFiscal: "102990",
    motorista: "Tirullipa Junior",
    caminhao: "DAF XF 480",
    placa: "YHN1UJM",
    partida: "Manaus - AM",
    destino: "Itacoatiara - AM"
  },
  {
    id: 54,
    ordemDeTransporte: "OT-10054",
    status: "ocorrência",
    emissao: "2026-07-26 05:40:00.000Z",
    numerocontainer: "CXZA9283740",
    container: "Open Top",
    notaFiscal: "102991",
    motorista: "Ubirajara Silva",
    caminhao: "Volkswagen Meteor",
    placa: "UJM0IK8",
    partida: "Vitoria - ES",
    destino: "Colatina - ES"
  },
  {
    id: 55,
    ordemDeTransporte: "OT-10055",
    status: "coleta",
    emissao: "2026-07-26 12:30:00.000Z",
    numerocontainer: "QWYE8273619",
    container: "Dry 20'",
    notaFiscal: "102992",
    motorista: "Valdir Braz",
    caminhao: "Mercedes-Benz Actros",
    placa: "IK89OLP",
    partida: "Guarujá - SP",
    destino: "Mogi das Cruzes - SP"
  },
  {
    id: 56,
    ordemDeTransporte: "OT-10056",
    status: "entregue",
    emissao: "2026-07-22 18:00:00.000Z",
    numerocontainer: "IUYT9283740",
    container: "Reefer 20'",
    notaFiscal: "102993",
    motorista: "Wanderlei Silva",
    caminhao: "Volvo FH 460",
    placa: "OLP8QAZ",
    partida: "Rio Grande - RS",
    destino: "Santa Maria - RS"
  },
  {
    id: 57,
    ordemDeTransporte: "OT-10057",
    status: "trânsito",
    emissao: "2026-07-26 02:00:00.000Z",
    numerocontainer: "OIKJ8273610",
    container: "Dry 40'",
    notaFiscal: "102994",
    motorista: "Xand Avião",
    caminhao: "Scania R540",
    placa: "QAZ7WSX",
    partida: "Santos - SP",
    destino: "Indaiatuba - SP"
  },
  {
    id: 58,
    ordemDeTransporte: "OT-10058",
    status: "coleta",
    emissao: "2026-07-26 07:50:00.000Z",
    numerocontainer: "YTRE9283740",
    container: "Flat Rack",
    notaFiscal: "102995",
    motorista: "Yudi Tamashiro",
    caminhao: "MAN TGX 29.480",
    placa: "WSX6EDC",
    partida: "Paranaguá - PR",
    destino: "Cascavel - PR"
  },
  {
    id: 59,
    ordemDeTransporte: "OT-10059",
    status: "entregue",
    emissao: "2026-07-21 10:15:00.000Z",
    numerocontainer: "RTEW8273619",
    container: "Dry 20'",
    notaFiscal: "102996",
    motorista: "Zico Arantes",
    caminhao: "Iveco Hi-Way",
    placa: "EDC5RFV",
    partida: "Itajaí - SC",
    destino: "Brusque - SC"
  },
  {
    id: 60,
    ordemDeTransporte: "OT-10060",
    status: "trânsito",
    emissao: "2026-07-26 04:30:00.000Z",
    numerocontainer: "FDA28374019",
    container: "Reefer 40'",
    notaFiscal: "102997",
    motorista: "João Carlos",
    caminhao: "Volkswagen Meteor",
    placa: "ABC-1234",
    partida: "Santos - SP",
    destino: "Cubatão - SP"
  }
];

function RouteComponent() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = ordemDeTransporte.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.ordemDeTransporte.toLowerCase().includes(term) ||
      item.motorista.toLowerCase().includes(term) ||
      item.numerocontainer.toLowerCase().includes(term) ||
      item.placa.toLowerCase().includes(term) ||
      item.notaFiscal.toLowerCase().includes(term)
    );
  });

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6 max-w-7xl">
      {/* Header & Ações */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Truck className="h-7 w-7 text-primary" />
            Ordens de Transporte
          </h1>
          <p className="text-sm text-muted-foreground">
            Gerencie o fluxo e status dos fretes operacionais.
          </p>
        </div>

        <Button className="w-full sm:w-auto shadow-sm transition-all hover:shadow-md cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Nova Ordem
        </Button>
      </div>

      {/* Barra de Pesquisa e Filtros */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por OT, motorista, container, placa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>
        <div className="text-xs text-muted-foreground self-end sm:self-center font-medium">
          Exibindo {filteredOrders.length} de {ordemDeTransporte.length} registros
        </div>
      </div>

      {/* Lista de Cards */}
      {/* {grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4} */}
      {filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrders.map((item) => (
            <CardOrdemTransporte
              key={item.id}
              ordemDeTransporte={item.ordemDeTransporte}
              status={item.status}
              emissao={item.emissao}
              numerocontainer={item.numerocontainer}
              notaFiscal={item.notaFiscal}
              container={item.container}
              motorista={item.motorista}
              placa={item.placa}
              caminhao={item.caminhao}
              partida={item.partida}
              destino={item.destino}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed">
          <p className="text-muted-foreground font-medium">
            Nenhuma ordem de transporte encontrada para a busca "{searchTerm}".
          </p>
        </div>
      )}
    </div>
  );
}