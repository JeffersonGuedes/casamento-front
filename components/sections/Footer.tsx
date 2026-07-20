export default function Footer() {
  return (
    <footer
      className="w-full py-16 flex items-center justify-center"
      style={{ backgroundColor: "#14346D", color: "#fff" }}
    >
      <div className="w-[180px] h-[100px] flex flex-col items-center justify-center text-center gap-1">
        <p className="font-serif italic text-cream/80 text-xs">Com amor,</p>
        <p className="font-display italic text-cream text-lg leading-tight">
          Lavinia e Jefferson
        </p>
      </div>
    </footer>
  );
}