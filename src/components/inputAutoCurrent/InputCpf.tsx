import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { formatToCPF } from "brazilian-values";

export function Inputcpf({
  value,
  onChange,
}: {
  value: string; // Mudei para string!
  onChange: (valor: string) => void;
}) {
  const [displayValue, setDisplayValue] = useState(formatToCPF(value || ""));

  useEffect(() => {
    setDisplayValue(formatToCPF(value || ""));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatToCPF(raw);

    setDisplayValue(formatted);
    onChange(raw);
  };

  return (
    <Input
      value={displayValue}
      onChange={handleChange}
      placeholder="000.000.000-00"
      maxLength={14}
    />
  );
}
