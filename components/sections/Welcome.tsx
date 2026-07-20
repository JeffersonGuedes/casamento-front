// src/components/sections/Welcome.tsx
import Image from "next/image";

export default function Welcome() {
  return (
    <section
      className="relative flex flex-col justify-center items-center w-full overflow-hidden py-20 px-6"
      style={{ backgroundColor: "#14346D" }}
    >
      {/* Conteúdo de texto centralizado */}
      <div
        className="relative w-full flex flex-col items-center justify-center z-10 max-w-xl mx-auto text-center"
        style={{ color: "#fff" }}
      >
        <Image
          src="/silhueta.png"
          alt=""
          width={400}
          height={60}
          className="mx-auto mb-6 opacity-80"
        />

        <h2 className="font-display italic text-4xl md:text-5xl mb-2">
          Queridos
        </h2>
        <p className="flex mb-4 font-display italic text-3xl md:text-4xl mb-8 px-4">
          amigos e familiares!
        </p>

        <p className="leading-relaxed text-base md:text-lg mb-8 w-[85%] sm:w-[75%] md:w-[80%] mx-auto">
          Estamos muito felizes em convidá-los para nossa primeira
          celebração em família: nosso casamento! Aguardamos
          ansiosamente a presença de nossos familiares e amigos mais
          próximos neste dia especial.
        </p>

        <Image
          src="/silhueta.png"
          alt=""
          width={400}
          height={60}
          className="mx-auto opacity-80 transform rotate-180"
        />
      </div>

      {/* Grupo flor + envelope, centralizado como bloco único */}
      <div className="relative flex justify-center items-end mt-12">
        {/* Envelope (atrás) */}
        <div className="relative w-[360px] sm:w-[460px] md:w-[520px] lg:w-[560px] z-0">
          <Image
            src="/convite_aberto1.png"
            alt="Calendário do dia especial"
            width={500}
            height={600}
            className="w-full h-auto"
          />
        </div>

        {/* Flor (na frente, puxada pra sobrepor o envelope) */}
        <div className="absolute w-[250px] sm:w-[240px] md:w-[260px] z-10 pointer-events-none -translate-x-[95%]">
          <Image
            src="/flor.png"
            alt="Flor decorativa"
            width={400}
            height={400}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
