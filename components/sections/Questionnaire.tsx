"use client";

import { useState } from "react";

// Endpoint de confirmação de presença.
// Aceita { name: string, is_attending: boolean, name_companions?: string } no corpo.
const RSVP_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}api/rsvp/confirm/`;

type Status = "idle" | "loading" | "success" | "error";

async function confirmPresence(
  name: string,
  isAttending: boolean,
  nameCompanions?: string
) {
  const body: {
    name: string;
    is_attending: boolean;
    name_companions?: string;
  } = { name, is_attending: isAttending };

  if (nameCompanions && nameCompanions.trim().length > 0) {
    body.name_companions = nameCompanions.trim();
  }

  const res = await fetch(RSVP_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Falha ao confirmar presença (status ${res.status})`);
  }

  return res.json().catch(() => ({}));
}

export default function Questionnaire() {
  const [form, setForm] = useState({
    nome: "",
    nomeAcompanhante: "",
    presenca: "",
  });

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const vaiDeCasal = form.presenca === "Vou de casal!";

  const isValid =
    form.nome.trim().length > 1 &&
    form.presenca !== "" &&
    (!vaiDeCasal || form.nomeAcompanhante.trim().length > 1);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    const isAttending = form.presenca !== "Infelizmente não poderei";

    try {
      await confirmPresence(
        form.nome.trim(),
        isAttending,
        vaiDeCasal ? form.nomeAcompanhante : undefined
      );
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Não foi possível enviar sua confirmação."
      );
    }
  }

  const presencaOptions = [
    "Sim!",
    "Vou de casal!",
    "Infelizmente não poderei",
  ];

  if (status === "success") {
    return (
      <section className="relative bg-[#F4EFDD] min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-md mx-auto text-center">
          <h2 className="italic font-serif text-4xl text-[#14346D] mb-6">
            Obrigado!
          </h2>
          <p className="text-[#14346D]/80 leading-relaxed">
            Sua confirmação foi recebida com carinho.
            {form.presenca !== "Infelizmente não poderei"
              ? " Mal podemos esperar para celebrar com você!"
              : " Sentiremos sua falta, mas agradecemos por nos avisar."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-[#F4EFDD] min-h-screen flex flex-col items-center justify-center">
      <div className="w-full flex flex-col max-w-md px-6 py-16">
        <h2 className="flex items-center justify-center mt-1 sm:mt-2 mb-6 text-center italic font-serif text-3xl sm:text-4xl text-[#14346D]">
          Questionário
        </h2>
        <p className="flex items-center justify-center text-center text-sm text-[#14346D]/80 mb-10 sm:mb-12 leading-relaxed">
          Para nos organizarmos e garantir conforto a todos os convidados,
          pedimos que preencham o nosso questionário.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 text-base text-[#14346D]"
        >
          {/* Nome */}
          <label className="flex flex-col gap-2">
            <span>Seu nome e sobrenome</span>
            <input
              type="text"
              required
              className="border-b border-[#14346D]/40 bg-transparent py-1.5 focus:outline-none focus:border-[#14346D] transition-colors"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </label>

          <div className="border-t border-[#14346D]/40" />

          {/* Presença */}
          <fieldset className="flex flex-col gap-4">
            <legend className="mb-1">
              Você planeja comparecer ao casamento?
            </legend>
            {presencaOptions.map((op) => (
              <label
                key={op}
                className="flex items-center gap-3 cursor-pointer select-none"
              >
                <span className="relative flex items-center justify-center w-5 h-5 shrink-0">
                  <input
                    type="radio"
                    name="presenca"
                    value={op}
                    checked={form.presenca === op}
                    onChange={(e) =>
                      setForm({ ...form, presenca: e.target.value })
                    }
                    required
                    className="peer appearance-none w-5 h-5 rounded-full border border-[#14346D]/60 checked:border-[#14346D] transition-colors cursor-pointer"
                  />
                  <span className="pointer-events-none absolute w-2.5 h-2.5 rounded-full bg-[#14346D] scale-0 peer-checked:scale-100 transition-transform" />
                </span>
                {op}
              </label>
            ))}
          </fieldset>

          {/* Acompanhante — só aparece se "Vou de casal!" */}
          {vaiDeCasal && (
            <label className="flex flex-col gap-2 animate-[fadeIn_0.3s_ease-out]">
              <span>Nome e sobrenome do acompanhante</span>
              <input
                type="text"
                required
                className="border-b border-[#14346D]/40 bg-transparent py-1.5 focus:outline-none focus:border-[#14346D] transition-colors"
                value={form.nomeAcompanhante}
                onChange={(e) =>
                  setForm({ ...form, nomeAcompanhante: e.target.value })
                }
              />
            </label>
          )}

          {status === "error" && (
            <p className="text-sm text-center text-red-800/70" role="alert">
              {errorMessage} Tente novamente em instantes.
            </p>
          )}

          <button
            type="submit"
            disabled={!isValid || status === "loading"}
            className="bg-[#14346D] text-[#F4EFDD] py-3 rounded-full tracking-wider text-xs mt-4 hover:bg-sky-700 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:bg-[#14346D] transition h-10"
          >
            {status === "loading" ? "ENVIANDO..." : "ENVIAR"}
          </button>
        </form>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
