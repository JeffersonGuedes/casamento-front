export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PagamentoForm from "@/components/PagamentoForm";
import { getPresente } from "@/lib/api";

type PageProps = {
  params: Promise<{ id: string }>;
};

function formatPrice(value: string | null) {
  if (!value) return "Valor livre";

  const numberValue = Number.parseFloat(value);
  if (Number.isNaN(numberValue)) return value;

  return `R$ ${numberValue.toFixed(2).replace(".", ",")}`;
}

export default async function PagamentoPage({ params }: PageProps) {
  const { id } = await params;
  const presenteId = Number(id);

  if (Number.isNaN(presenteId)) {
    notFound();
  }

  const presente = await getPresente(presenteId).catch(() => null);

  if (!presente) {
    return (
      <main className="min-h-screen bg-[#f5f1e6] py-8 md:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[28px] border border-black/5 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
              Pagamento indisponível
            </h1>
            <p className="text-sm text-slate-600">
              Não foi possível carregar os dados deste presente agora. Tente novamente em instantes.
            </p>
            <Link
              href="/presentes"
              className="mt-6 inline-flex w-full sm:w-auto justify-center rounded-full bg-slate-900 px-4 py-3 sm:py-2 text-sm font-semibold text-white transition hover:scale-105 active:scale-95"
            >
              Voltar para a lista
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const qrPayload =
    process.env.NEXT_PUBLIC_PIX_QR_TEXT ||
    presente.pix_payload ||
    process.env.NEXT_PUBLIC_PIX_KEY ||
    `${presente.name} - presente ${presente.id}`;
  
  const qrCodeUrl = presente.pix_qr_code
    ? presente.pix_qr_code
    : `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=16&data=${encodeURIComponent(qrPayload)}`;
  
  const productLink = presente.link || presente.product_url || "/presentes";
  const isExternalProductLink = productLink.startsWith("http");
  const priceLabel = formatPrice(presente.price);

  return (
    <main className="min-h-screen bg-[#f5f1e6] py-6 sm:py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho Ajustado para Mobile */}
        <div className="mb-6 md:mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-slate-500 mb-1 sm:mb-2">
              Lista de presentes
            </p>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900">
              Pagamento do presente
            </h1>
          </div>
          <Link
            href="/presentes"
            className="w-full sm:w-auto text-center rounded-full border border-slate-200 bg-white px-4 py-3 sm:py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:scale-105 active:scale-95"
          >
            Voltar para a lista
          </Link>
        </div>

        {/* Inversão no mobile (Resumo e QR em cima) e Grid no Desktop */}
        <div className="flex flex-col-reverse gap-8 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          
          {/* Formulário: Fica embaixo no celular, na esquerda no PC */}
          <div className="w-full">
            <PagamentoForm presente={presente} />
          </div>

          {/* Resumo da Compra: Fica em cima no celular, na direita no PC */}
          <aside className="w-full space-y-5 sm:space-y-6 rounded-[24px] sm:rounded-[28px] border border-black/5 bg-white p-5 md:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-neutral-400 mb-2">
                Resumo da compra
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
                {presente.name}
              </h2>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-neutral-500">
                {presente.description || "Presente selecionado na lista."}
              </p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 self-center sm:self-auto">
                  {/* Atualizado de image_base64 para image */}
                  {presente.image ? (
                    <Image
                      src={presente.image}
                      alt={presente.name}
                      fill
                      unoptimized // Se for URL externa, mantenha. Se for a URL do Django, pode tirar isso depois!
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-400">
                      Sem imagem
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1 text-center sm:text-left">
                  <p className="text-xs sm:text-sm font-medium text-slate-500">Item escolhido</p>
                  <h3 className="mt-1 line-clamp-2 text-sm sm:text-base font-semibold text-slate-900">
                    {presente.name}
                  </h3>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-600">{priceLabel}</p>
                  {isExternalProductLink ? (
                    <a
                      href={productLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex rounded-full bg-slate-900 px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-white transition hover:opacity-90 hover:scale-105 active:scale-95"
                    >
                      Ver o produto
                    </a>
                  ) : (
                    <Link
                      href={productLink}
                      className="mt-3 inline-flex rounded-full bg-slate-900 px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-white transition hover:opacity-90 hover:scale-105 active:scale-95"
                    >
                      Ver o produto
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-emerald-100 bg-emerald-50 p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
                <div>
                  <p className="text-sm font-semibold text-emerald-900">PIX seguro</p>
                  <p className="mt-1 text-xs text-emerald-700">
                    Aponte a câmera para o QR Code e finalize o pagamento.
                  </p>
                </div>
                <div className="inline-block rounded-full bg-white px-3 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-100 self-center sm:self-auto">
                  QR Code
                </div>
              </div>

              <div className="mt-5 flex justify-center">
                <div className="rounded-3xl bg-white p-3 sm:p-4 shadow-sm ring-1 ring-emerald-100">
                  <Image
                    src={qrCodeUrl}
                    alt={`QR Code PIX para ${presente.name}`}
                    width={280}
                    height={280}
                    unoptimized
                    className="h-48 w-48 sm:h-56 sm:w-56 rounded-2xl object-contain"
                  />
                </div>
              </div>

              {/* Ajuste importante: break-all para não quebrar a tela no celular */}
              <p className="mt-5 break-all rounded-2xl bg-white px-3 py-3 text-[10px] sm:text-xs text-slate-600 ring-1 ring-emerald-100 text-center">
                {qrPayload}
              </p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl bg-slate-900 p-4 sm:p-5 text-white">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-white/60">
                Total da compra
              </p>
              <div className="mt-1 sm:mt-2 flex flex-col sm:flex-row sm:items-end justify-between gap-1 sm:gap-4">
                <span className="text-xs sm:text-sm text-white/70">Presente reservado</span>
                <span className="text-xl sm:text-2xl font-semibold">{priceLabel}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}