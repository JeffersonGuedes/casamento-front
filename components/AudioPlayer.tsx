"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer({ playing }: { playing: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (playing && audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {
        // caso o navegador ainda bloqueie, o botão de play manual resolve
      });
    }
  }, [playing]);

  function toggleMute() {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setMuted(audioRef.current.muted);
  }

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" loop />
      {playing && (
        <button
          onClick={toggleMute}
          aria-label={muted ? "Ativar som" : "Silenciar"}
          className="fixed bottom-5 right-5 z-50 bg-olive text-cream w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition"
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      )}
    </>
  );
}