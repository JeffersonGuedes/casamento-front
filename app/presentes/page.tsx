export const dynamic = "force-dynamic";
import { getPresentes } from "@/lib/api";
import GiftsGrid from "@/components/GiftsGrid";

export default async function Presentes() {
  let presentes = [];

  try {
    presentes = await getPresentes();
  } catch {
    return (
      <main className="min-h-screen bg-[#f5f1e6] pt-10 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="rounded-3xl bg-white border border-black/5 p-8 shadow-sm">
            <h1 className="text-2xl font-semibold text-slate-900 mb-3">
              Lista de presentes indisponível
            </h1>
            <p className="text-sm text-slate-600">
              Estamos com instabilidade ao carregar os presentes agora. Tente novamente em instantes.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f1e6] pt-10 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <GiftsGrid presentes={presentes} />
      </div>
    </main>
  );
}