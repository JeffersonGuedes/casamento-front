import Image from "next/image";
import Link from "next/link"; // Trocamos o useRouter pelo Link
import type { Presente } from "@/lib/api";

export default function GiftCard({ presente }: { presente: Presente }) {
  const reservado = presente.status !== "AVAILABLE";
  const priceNumber = presente.price ? parseFloat(presente.price) : null;

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-black/5 flex flex-col hover:shadow-md transition-shadow">
      <div className="aspect-square relative bg-neutral-50">
        {presente.image ? (
          <Image
            src={presente.image}
            alt={presente.name}
            fill
            unoptimized
            className="object-contain p-4"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
            Sem imagem
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-medium text-neutral-800 mb-1 line-clamp-2">
          {presente.name}
        </h3>
        <p className="text-sm text-neutral-500 mb-3">
          {priceNumber !== null
            ? `R$ ${priceNumber.toFixed(2).replace(".", ",")}`
            : "Valor livre"}
        </p>

        {reservado ? (
          <span className="mt-auto w-full py-2 rounded text-xs font-medium tracking-wide uppercase text-center bg-neutral-200 text-neutral-500 cursor-not-allowed md:hover:scale-105 transition-transform">
            Comprado
          </span>
        ) : (
          /* Substituímos o <button> por <Link> */
          <Link
            href={`/presentes/${presente.id}/pagamento`}
            className="mt-auto w-full py-2 rounded text-xs font-medium tracking-wide uppercase text-center bg-[#14346D] text-[#F4EFDD] hover:bg-sky-700 transition-colors block"
          >
            Comprar
          </Link>
        )}
      </div>
    </div>
  );
}