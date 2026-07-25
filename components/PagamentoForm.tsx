"use client";

import { useState } from "react";
import { confirmarPresente, type Presente } from "@/lib/api";

export default function PagamentoForm({ presente }: { presente: Presente }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [comprovante, setComprovante] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setLoading(true);
    try {
      await confirmarPresente(presente.id, {
        buyerName: nome,
        buyerEmail: email,
        message: mensagem,
        comprovante,
      });
      setEnviado(true);
    } catch {
      setErro("Não foi possível confirmar agora. Tente novamente em instantes.");
    } finally {
      setLoading(false);
    }
  }

  if (enviado) {
    return (
      <div className="bg-white rounded-lg border border-black/5 p-8 text-center">
        <h2 className="font-serif italic text-2xl text-navy mb-2">
          Muito obrigado! 💛
        </h2>
        <p className="text-sm text-neutral-600">
          Recebemos sua confirmação para <strong>{presente.name}</strong>.
          Assim que o pagamento for verificado, atualizamos a lista.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-[28px] border border-black/5 p-6 md:p-8 space-y-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-neutral-400 mb-2">
          Dados de pagamento
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-1">
          Finalize sua compra
        </h1>
        <p className="text-sm text-neutral-500">
          Preencha seus dados e envie o comprovante para confirmar o presente de {presente.name}.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            Quem está dando o presente?
          </label>
          <input
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-300 focus:bg-white"
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            Seu e-mail
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-300 focus:bg-white"
            placeholder="voce@email.com"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            Escreva sua mensagem (opcional)
          </label>
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            rows={3}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition resize-none focus:border-slate-300 focus:bg-white"
            placeholder="Deixe um recado para o casal..."
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-neutral-700 mb-1">
          Comprovante de pagamento (se comprou fora do site)
        </label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setComprovante(e.target.files?.[0] ?? null)}
          className="w-full text-xs text-neutral-500 file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-white hover:file:opacity-90"
        />
      </div>

      {erro && <p className="text-xs text-red-600">{erro}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-slate-900 px-5 py-4 text-sm font-semibold tracking-wide text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Enviando..." : "Confirmar presente"}
      </button>
    </form>
  );
}