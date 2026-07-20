"use client";

import { useState } from "react";
import { reservarPresente, Presente } from "@/lib/api";

export default function GiftCard({ presente }: { presente: Presente }) {
  const [reservado, setReservado] = useState(presente.reservado);
  const [loading, setLoading] = useState(false);

  async function handleReservar() {
    setLoading(true);
    try {
      await reservarPresente(presente.id);
      setReservado(true);
    } catch (e) {
      alert("Não foi possível reservar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-[#8a9a7a] rounded-lg p-4 bg-white/60 text-center">
      <img src={presente.imagem} alt={presente.nome} className="mx-auto mb-3 h-32 object-contain" />
      <h3 className="font-serif text-lg">{presente.nome}</h3>
      <p className="text-sm text-gray-600">{presente.descricao}</p>
      <p className="mt-2 font-semibold">R$ {presente.preco.toFixed(2)}</p>

      <button
        onClick={handleReservar}
        disabled={reservado || loading}
        className="mt-3 px-4 py-2 rounded bg-[#4a5d3f] text-white disabled:opacity-50"
      >
        {reservado ? "Reservado ✓" : loading ? "Reservando..." : "Presentear"}
      </button>
    </div>
  );
}