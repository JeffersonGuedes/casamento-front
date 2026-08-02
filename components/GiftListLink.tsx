"use client";

import Link from "next/link";
import { Gift } from "lucide-react";

export default function GiftListLink() {
  return (
    <Link
      href="/presentes"
      aria-label="Ver lista de presentes"
      className="fixed bottom-5 left-5 z-50 flex items-center gap-2 bg-olive text-cream px-4 h-11 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
    >
      <Gift size={18} />
      <span className="font-serif italic text-sm md:text-base whitespace-nowrap">
        Lista de presentes
      </span>
    </Link>
  );
}