export const dynamic = "force-dynamic";
import { getPresentes } from "@/lib/api";
import GiftsGrid from "@/components/GiftsGrid";

export default async function Presentes() {
  const presentes = await getPresentes();

  return (
    <main className="min-h-screen bg-[#f5f1e6] pt-10 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <GiftsGrid presentes={presentes} />
      </div>
    </main>
  );
}