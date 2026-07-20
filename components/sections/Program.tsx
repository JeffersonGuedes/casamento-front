"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";

type ProgramItem = {
  image: string;
  title: string;
  time: string;
  description: string[];
};

// Troque as imagens e os textos pelos seus.
// Pode adicionar quantos itens quiser, o layout se ajusta sozinho.
const items: ProgramItem[] = [
  {
    image: "/programa-recepcao.png",
    title: "Recepção",
    time: "15:30",
    description: ["Chegada e boas-vindas aos convidados"],
  },
  {
    image: "/programa-cerimonia.png",
    title: "Cerimônia",
    time: "16:30",
    description: ["Duas almas se tornam uma", "para sempre"],
  },
  {
    image: "/programa-banquete.png",
    title: "Banquete",
    time: "17:30",
    description: ["Hora de boa comida, alegria", "e diversão"],
  },
  {
    image: "/programa-bolo.png",
    title: "Bolo",
    time: "22:00",
    description: ["Doce símbolo da nossa", "nova vida"],
  },
  {
    image: "/programa-encerramento.png",
    title: "Encerramento",
    time: "23:00",
    description: ["Até uma noite tão linda", "precisa chegar ao fim"],
  },
];

export default function Program() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    function updateProgress() {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // 0 quando o topo da seção entra na tela, 1 quando o fim sai da tela
      const total = viewportHeight + rect.height;
      const current = viewportHeight - rect.top;
      const pct = Math.min(Math.max(current / total, 0), 1);

      setProgress(pct);
      ticking = false;
    }

    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="relative bg-[#F8F1DF] min-h-screen flex flex-col items-center justify-center py-20 px-6 overflow-hidden">
      <h2 className="text-center italic font-serif text-4xl md:text-5xl text-[#5B6350] mb-16 md:mb-20">
        Programa do dia
      </h2>

      {/* Grid com linhas explícitas: cada imagem e seu texto ficam na mesma
          linha do grid (mesma altura), então nunca desalinham entre si. */}
      <div
        ref={containerRef}
        className="relative w-full max-w-4xl mx-auto grid grid-cols-[0_auto_1fr] md:grid-cols-[1fr_auto_1.4fr] gap-x-6 md:gap-x-12 gap-y-16 md:gap-y-20"
      >
        {items.map((item, i) => (
          <Fragment key={i}>
            {/* Imagem — some no mobile (largura de coluna zerada) */}
            <div
              className="hidden md:flex items-center justify-center"
              style={{ gridRow: i + 1, gridColumn: 1 }}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={160}
                height={160}
                className="w-28 md:w-40 h-auto"
              />
            </div>

            {/* Texto */}
            <div
              className="text-center md:text-left self-center"
              style={{ gridRow: i + 1, gridColumn: 3 }}
            >
              <div className="md:hidden mb-4 flex justify-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={120}
                  height={120}
                  className="w-20 h-auto"
                />
              </div>
              <h3 className="italic font-serif text-3xl md:text-4xl text-[#5B6350] mb-2">
                {item.title}
              </h3>
              <p className="text-xl md:text-2xl text-[#5B6350] mb-2">
                {item.time}
              </p>
              {item.description.map((line, j) => (
                <p key={j} className="text-sm md:text-base text-[#5B6350]/80">
                  {line}
                </p>
              ))}
            </div>
          </Fragment>
        ))}

        {/* Linha central contínua, atravessando todas as linhas do grid */}
        <div
          className="relative w-px bg-[#5B6350]/40 mx-auto"
          style={{ gridRow: `1 / ${items.length + 1}`, gridColumn: 2 }}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-[top] duration-100 ease-out"
            style={{ top: `${progress * 100}%` }}
          >
            <HeartIcon />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeartIcon() {
  return (
    <svg
      width="26"
      height="24"
      viewBox="0 0 28 26"
      fill="#5B6350"
      className="drop-shadow-sm"
    >
      <path d="M14 25 C14 25 1 16 1 7.5 C1 3 4.3 0 8 0 C10.6 0 12.8 1.6 14 4 C15.2 1.6 17.4 0 20 0 C23.7 0 27 3 27 7.5 C27 16 14 25 14 25 Z" />
    </svg>
  );
}
