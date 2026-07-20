// src/components/sections/Hero.tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-16 px-4 overflow-hidden">
      <Image
        src="/paisagem.png"
        alt="Fundo"
        fill
        priority
        className="object-cover object-center -z-10"
      />

      {/* Texto superior */}
      <div className="text-center mb-8 z-10" style={{ color: "#14346D" }}>
        <p className="tracking-[0.3em] text-sm md:text-base mb-2">
          28 | 11 | 2026
        </p>
        <h1 className="font-display italic text-4xl sm:text-5xl md:text-6xl leading-none">
          Lavinia <span className="not-italic">&</span> Jefferson
        </h1>
        <p className="font-serif italic text-lg md:text-xl mt-1">
          nós vamos nos casar
        </p>
      </div>

      {/* Foto do casal, já com moldura, centralizada */}
      <div className="relative w-[300px] h-[360px] sm:w-[280px] sm:h-[350px] md:w-[400px] md:h-[480px] mx-auto">
        <Image
          src="/foto-casal.png"
          alt="Lavinia e Jefferson"
          fill
          className="object-contain"
        />
      </div>
    </section>
  );
}