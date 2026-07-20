// src/components/sections/Location.tsx
import Image from "next/image";

// Troque pelo nome e endereço reais do local
const VENUE_NAME = "Espaço Jardim das Flores";
const VENUE_ADDRESS = "Rua das Palmeiras, 123 - Aldeota, Fortaleza - CE";

const MAPS_QUERY = encodeURIComponent(`${VENUE_NAME}, ${VENUE_ADDRESS}`);
const GOOGLE_MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
const GOOGLE_MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;

export default function Location() {
  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 px-6 text-center"
      style={{ backgroundColor: "#14346D", color: "#fff" }}
    >
      <div className="relative w-full max-w-2xl mx-auto z-10">

        <h2 className="font-display italic text-4xl md:text-5xl mb-6">
          Local da celebração
        </h2>

        <p className="text-lg md:text-xl mb-1">{VENUE_NAME}</p>
        <p className="text-sm md:text-base text-white/80 mb-10">
          {VENUE_ADDRESS}
        </p>

        {/* Mapa embutido */}
        <div className="w-full aspect-video rounded-lg overflow-hidden border border-white/20 mb-8">
          <iframe
            src={GOOGLE_MAPS_EMBED}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title={`Mapa - ${VENUE_NAME}`}
          />
        </div>

        {/* Botão que abre no Google Maps */}
        <a
          href={GOOGLE_MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-white text-white py-3 px-8 rounded-full tracking-wider text-xs hover:bg-white hover:text-[#14346D] transition-colors"
        >
          ABRIR NO GOOGLE MAPS
        </a>
      </div>
    </section>
  );
}
