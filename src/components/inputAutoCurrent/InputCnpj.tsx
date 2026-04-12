import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { formatToCNPJ } from "brazilian-values";

export function InputCnpj({
  value,
  onChange,
}: {
  value: string;
  onChange: (valor: string) => void;
}) {
  const [displayValue, setDisplayValue] = useState(formatToCNPJ(value || ""));

  useEffect(() => {
    setDisplayValue(formatToCNPJ(value || ""));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatToCNPJ(raw);

    setDisplayValue(formatted);
    onChange(raw);
  };

  return (
    <Input
      value={displayValue}
      onChange={handleChange}
      placeholder="00.000.000/0000-00"
      maxLength={18}
    />
  );
}
