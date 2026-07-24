"use client";

import { useState } from "react";
import GiftsFilterBar from "@/components/GiftsFilterBar";
import GiftCard from "@/components/GiftCard";
import type { Presente } from "@/lib/api";

export default function GiftsGrid({ presentes }: { presentes: Presente[] }) {
  const [active, setActive] = useState("Todos");

  const filtrados =
    active === "Todos"
      ? presentes
      : presentes.filter(
          (p) => p.category?.toUpperCase() === active.toUpperCase()
        );

  return (
    <>
      <GiftsFilterBar active={active} onChange={setActive} />

      {filtrados.length === 0 ? (
        <p className="text-sm text-neutral-500 py-10 text-center">
          Nenhum presente nessa categoria ainda.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {filtrados.map((p) => (
            <GiftCard key={p.id} presente={p} />
          ))}
        </div>
      )}
    </>
  );
}