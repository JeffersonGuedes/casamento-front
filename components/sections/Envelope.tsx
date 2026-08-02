"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  function handleClick() {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch((err) => {
        console.log("Erro ao tocar música:", err);
      });
    }

    setOpening(true);
    setTimeout(onOpen, 900);
  }

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden ">
      <audio ref={audioRef} src="/music.mp3" loop  />

      <Image
        src="/paisagem.png"
        alt="Fundo"
        fill
        priority
        className="object-cover object-center -z-10"
      />

      {/* Envelope como botão, tamanho responsivo */}
      <button
        onClick={handleClick}
        aria-label="Abrir convite"
        className={`cursor-pointer relative w-[30%] sm:w-[50%] md:w-[55%] lg:w-[45%] xl:max-w-[1080px] transition-all duration-[900ms] ease-out ${
          opening
            ? "scale-105 opacity-0"
            : "scale-100 opacity-100 hover:scale-105 active:scale-95"
        }`}
      >
        <Image
          src="/envelope.png"
          alt="Convite de Lavinia e Jefferson"
          width={1080}
          height={280}
          className="w-full h-auto drop-shadow-2xl scale-[1.04]"
          priority
        />
      </button>
    </section>
  );
}