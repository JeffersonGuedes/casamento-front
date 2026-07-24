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
      className="bg-white rounded-lg border border-black/5 p-6 md:p-8 space-y-6"
    >
      <div>
        <h1 className="font-serif italic text-2xl text-navy mb-1">
          Presentear
        </h1>
        <p className="text-sm text-neutral-500">{presente.name}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-neutral-600 mb-1">
            Quem está dando o presente?
          </label>
          <input
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border border-black/10 rounded px-3 py-2 text-sm"
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-600 mb-1">
            Seu e-mail
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-black/10 rounded px-3 py-2 text-sm"
            placeholder="voce@email.com"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-600 mb-1">
            Escreva sua mensagem (opcional)
          </label>
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            rows={3}
            className="w-full border border-black/10 rounded px-3 py-2 text-sm resize-none"
            placeholder="Deixe um recado para o casal..."
          />
        </div>
      </div>

      {/* PIX — placeholder até vocês terem chave/QR real */}
      <div className="border border-dashed border-navy/30 rounded-lg p-4">
        <h3 className="text-sm font-medium text-navy mb-2">Pagar com PIX</h3>
        <div className="w-32 h-32 bg-neutral-100 rounded flex items-center justify-center text-[10px] text-neutral-400 mb-2">
          QR Code em breve
        </div>
        <p className="text-xs text-neutral-500">
          Chave PIX: <span className="italic">a definir</span>
        </p>
      </div>

      {/* Link externo — genérico até vocês decidirem se é por presente ou geral */}
      <div className="border border-dashed border-navy/30 rounded-lg p-4">
        <h3 className="text-sm font-medium text-navy mb-2">
          Ou comprar por outra plataforma
        </h3>
        <a href="#" className="text-xs text-navy underline underline-offset-2">
          Ver onde comprar (link em breve)
        </a>
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-600 mb-1">
          Comprovante de pagamento (se comprou fora do site)
        </label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setComprovante(e.target.files?.[0] ?? null)}
          className="w-full text-xs"
        />
      </div>

      {erro && <p className="text-xs text-red-600">{erro}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-full bg-navy text-cream text-sm font-medium tracking-wide uppercase hover:opacity-90 transition disabled:opacity-60"
      >
        {loading ? "Enviando..." : "Confirmar presente"}
      </button>
    </form>
  );
}