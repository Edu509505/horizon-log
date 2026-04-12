import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { formatToPhone } from "brazilian-values";

export function InputNumeroCelular({
  value,
  onChange,
}: {
  value: string;
  onChange: (valor: string) => void;
}) {
  const [displayValue, setDisplayValue] = useState(formatToPhone(value || ""));

  useEffect(() => {
    setDisplayValue(formatToPhone(value || ""));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const formatted = formatToPhone(raw);

    setDisplayValue(formatted);
    onChange(raw);
  };

  return (
    <Input
      value={displayValue}
      onChange={handleChange}
      placeholder="(00) 00000-0000"
      maxLength={15}
    />
  );
}
