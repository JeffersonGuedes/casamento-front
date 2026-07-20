// src/components/sections/Countdown.tsx
"use client";

import { useEffect, useState } from "react";

// Ajuste a data/hora do casamento aqui se precisar
const WEDDING_DATE = new Date("2026-11-28T16:30:00");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function Countdown() {
  // começa null pra não renderizar números diferentes no servidor e no
  // cliente (evita erro de hidratação); preenche no primeiro useEffect
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hasArrived =
    timeLeft !== null &&
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0 &&
    Date.now() >= WEDDING_DATE.getTime();

  const units: { label: string; value: number }[] = timeLeft
    ? [
        { label: "dias", value: timeLeft.days },
        { label: "horas", value: timeLeft.hours },
        { label: "minutos", value: timeLeft.minutes },
        { label: "segundos", value: timeLeft.seconds },
      ]
    : [];

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 px-6 text-center"
      style={{ backgroundColor: "#14346D", color: "#fff" }}
    >
      {hasArrived ? (
        <h2 className="font-display italic text-4xl md:text-6xl">
          Chegou o grande dia!
        </h2>
      ) : (
        <>
          <h2 className="font-display italic text-4xl md:text-6xl mb-1">
            Até o grande encontro
          </h2>
          <p className="font-display italic text-2xl md:text-3xl mb-16">
            faltam...
          </p>

          <div className="flex gap-8 sm:gap-14 md:gap-20">
            {units.map((unit) => (
              <div key={unit.label} className="flex flex-col items-center">
                <span className="text-4xl sm:text-5xl md:text-6xl tabular-nums mb-2">
                  {timeLeft ? pad(unit.value) : "--"}
                </span>
                <span className="font-display italic text-sm sm:text-base md:text-lg text-white/80">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
