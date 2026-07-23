"use client";

import Link from "next/link";
import { Gift } from "lucide-react";

export default function GiftListHeader() {
  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <Link
        href="/"
        className="flex items-center gap-2 bg-olive text-cream px-4 h-11 rounded-full shadow-lg hover:scale-105 transition"
      >
        <Gift size={18} />
        <span className="font-serif italic text-sm md:text-base whitespace-nowrap">
          Lista de presentes
        </span>
      </Link>
    </header>
  );
}
