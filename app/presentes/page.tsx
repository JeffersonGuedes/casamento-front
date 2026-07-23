export const dynamic = "force-dynamic";
import { getPresentes } from "@/lib/api";
import GiftCard from "@/components/GiftCard";
import GiftListHeader from "@/components/GiftListHeader";

export default async function Presentes() {
  const presentes = await getPresentes();

  return (
    <main className="min-h-screen bg-[#f5f1e6] pt-24 pb-16 px-4">
      <GiftListHeader />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {presentes.map((p) => (
          <GiftCard key={p.id} presente={p} />
        ))}
      </div>
    </main>
  );
}
