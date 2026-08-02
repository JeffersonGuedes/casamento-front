"use client";

import { LayoutGrid, Home, Sparkles } from "lucide-react";

const filters = [
  { label: "Todos", icon: LayoutGrid },
  { label: "Casa", icon: Home },
  { label: "Criativos", icon: Sparkles },
];

export default function GiftsFilterBar({
  active,
  onChange,
}: {
  active: string;
  onChange: (label: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-6">
      <div className="flex flex-wrap gap-2">
        {filters.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => onChange(label)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition hover:scale-105 active:scale-95 ${
              active === label
                ? "bg-navy text-cream border-navy"
                : "border-navy/30 text-navy hover:bg-navy/5"
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      <select
        defaultValue="relevancia"
        className="text-xs border border-navy/30 rounded-full px-3 py-1.5 text-navy bg-transparent"
      >
        <option value="relevancia">Relevância</option>
        <option value="menor-preco">Menor preço</option>
        <option value="maior-preco">Maior preço</option>
      </select>
    </div>
  );
}