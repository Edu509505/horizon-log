import { useEffect, useState } from "react";
import { Input } from "../ui/input";

const formatarDataSimples = (valor: string) => {
  // Remove tudo que não é número
  const apenasNumeros = valor.replace(/\D/g, "");

  // Aplica a máscara dd/mm/yyyy
  return apenasNumeros
    .replace(/(\d{2})(\d)/, "$1/$2") // Coloca a primeira barra
    .replace(/(\d{2})(\d)/, "$1/$2") // Coloca a segunda barra
    .replace(/(\d{4})(\d+?)$/, "$1"); // Limita em 10 caracteres
};

export function InputData({
  value,
  onChange,
}: {
  value: string;
  onChange: (valor: string) => void;
}) {
  // Iniciamos o estado já formatado caso venha valor do banco
  const [displayValue, setDisplayValue] = useState(
    formatarDataSimples(value || ""),
  );

  // Se o formulário der reset ou mudar por fora, a gente atualiza aqui
  useEffect(() => {
    setDisplayValue(formatarDataSimples(value || ""));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    const formatado = formatarDataSimples(v);

    setDisplayValue(formatado); // O que o usuário vê: 23/03/2026

    // Como você disse que quer salvar exatamente assim no banco:
    onChange(formatado);
  };

  return (
    <Input
      value={displayValue}
      onChange={handleChange}
      placeholder="00/00/0000"
      maxLength={10} // Impede de digitar mais que o necessário
    />
  );
}
