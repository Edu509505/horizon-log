// import { useState } from "react";
import { Input } from "../ui/input";

export function InputSenha({
  value,
  onChange,
}: {
  value: string;
  onChange: (valor: string) => void;
}) {
  const password = value || "";

  // Definição das regras de validação
  const rules = [
    { label: "Mínimo 8 caracteres", met: password.length >= 8 },
    { label: "Uma letra maiúscula", met: /[A-Z]/.test(password) },
    { label: "Um número", met: /[0-9]/.test(password) },
    { label: "Um caractere especial", met: /[!@#$%^&*]/.test(password) },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      <Input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Digite sua senha"
      />

      {/* A lista de "bullets" de validação que você queria */}
      <div className="flex flex-col gap-1.5 ml-1">
        {rules.map((rule, index) => (
          <div
            key={index}
            className={`flex items-center text-[10px] sm:text-xs transition-all duration-300 ${
              rule.met ? "text-emerald-500 font-medium" : "text-zinc-500"
            }`}
          >
            <div
              className={`mr-2 h-1.5 w-1.5 rounded-full transition-colors ${
                rule.met
                  ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                  : "bg-zinc-700"
              }`}
            />
            {rule.label}
          </div>
        ))}
      </div>
    </div>
  );
}
