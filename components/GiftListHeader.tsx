"use client";

import Link from "next/link";

const navLinks = [
  { label: "Confirmar Presença", href: "/confirmar-presenca" },
  { label: "Lista de Presentes", href: "/presentes" },
  { label: "Mural de Recados", href: "/mural-recados" },
];

export default function GiftListHeader() {
  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-navy text-cream">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-6 h-16">
        <Link href="/" className="flex flex-col leading-none shrink-0 transition hover:scale-105 active:scale-95">
          <span className="font-serif italic text-xl">G&amp;M</span>
          <span className="text-[9px] tracking-widest uppercase opacity-60">
            por Carol Oliveira
          </span>
        </Link>

        <nav className="flex items-center gap-4 md:gap-8 text-[10px] md:text-xs tracking-widest uppercase overflow-x-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.href === "/presentes"
                  ? "border-b border-cream pb-1 whitespace-nowrap transition hover:scale-105 active:scale-95"
                  : "opacity-70 hover:opacity-100 transition hover:scale-105 active:scale-95 whitespace-nowrap"
              }
            >
              {link.label}
            </Link>
          ))}
          <button className="opacity-70 hover:opacity-100 transition hover:scale-105 active:scale-95 whitespace-nowrap">
            Mais ▾
          </button>
        </nav>
      </div>
    </header>
  );
}