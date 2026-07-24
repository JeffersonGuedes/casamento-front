export default function GiftsHero() {
  return (
    <section className="relative overflow-hidden bg-navy text-cream">
      {/* Placeholder de foto — quando tiver a imagem do casal, troque este div
          por um <Image src="/casal.jpg" alt="..." fill className="object-cover opacity-40" />
          do next/image, mantendo este section como container relative. */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/90 to-black/50" />

      <div className="relative z-10 max-w-3xl px-6 py-14 md:py-20">
        <h1 className="font-serif italic text-4xl md:text-5xl mb-4">
          Lista de presentes
        </h1>
        <p className="text-sm md:text-base leading-relaxed text-cream/85 max-w-xl">
          Sua presença já é um presente. Mas se ainda assim desejar nos
          presentear, preparamos essa lista com carinho para nos ajudar a
          construir nosso novo lar com ainda mais amor. Os presentes
          disponíveis aqui são sugestões — se encontrar o mesmo item por um
          valor melhor em outro lugar, fique à vontade para comprá-lo onde
          preferir. O que realmente importa pra nós é o carinho e a lembrança
          nesse momento tão especial.
        </p>
      </div>
    </section>
  );
}