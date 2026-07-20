export default function Hero() {
  return (
    <section className="bg-[url('/bg-floresta.jpg')] bg-cover bg-center py-20 flex flex-col items-center text-cream text-center">
      <p className="tracking-[0.3em] text-sm mb-2">29 | 11 | 2026</p>
      <h1 className="font-display italic text-4xl md:text-5xl mb-1">
        Lavinia & Jefferson
      </h1>
      <p className="tracking-[0.3em] text-xs mb-10">NÓS VAMOS NOS CASAR</p>

      <div className="relative w-[220px] h-[280px]">
        <div className="absolute inset-0 rounded-[50%] border-8 border-cream shadow-2xl overflow-hidden">
          <img
            src="/casal.jpg"
            alt="Lavinia e Jefferson"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}