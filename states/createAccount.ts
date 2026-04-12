import { create } from "zustand";

type createAccount = {
  nome: string;
  cpf: string;
  nascimento: string;
  numero: string;
  email: string;
};

type informacaoEmpresa = {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
};

export const formCreateAccount = create<createAccount>((set) => ({
  nome: "",
  email: "",
  cpf: "",
  nascimento: "",
  numero: "",

  form: () =>
    set((val) => ({
      nome: val.nome,
      email: val.email,
      cpf: val.cpf,
      nascimento: val.nascimento,
      numero: val.numero,
    })),
}));

export const informacaoEmpresa = create<informacaoEmpresa>((set) => ({
  cnpj: "",
  razaoSocial: "",
  nomeFantasia: "",

  form: () =>
    set((val) => ({
      cnpj: val.cnpj,
      razaoSocial: val.razaoSocial,
      nomeFantasia: val.nomeFantasia,
    })),
}));
