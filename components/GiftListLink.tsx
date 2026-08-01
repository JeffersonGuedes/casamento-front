"use client";

import Link from "next/link";
import { Gift } from "lucide-react";

export default function GiftListLink() {
  return (
    <Link
      href="/presentes"
      aria-label="Ver lista de presentes"
      {/* O bottom-8 coloca o botão a 32px do fundo, o left-5 a 20px da esquerda */}
      className="fixed bottom-8 left-5 z-50 flex items-center gap-2 bg-olive text-cream px-4 h-11 rounded-full shadow-lg active:scale-95 md:hover:scale-105 transition-transform"
    >
      Lista de presentes
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
      Lista de presentes
    </Link>
  );
}