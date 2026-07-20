// src/app/page.tsx
"use client";

import { useState } from "react";
import Envelope from "@/components/sections/Envelope";
import Hero from "@/components/sections/Hero";
import Welcome from "@/components/sections/Welcome";
import Questionnaire from "@/components/sections/Questionnaire";
import Footer from "@/components/sections/Footer";
import AudioPlayer from "@/components/AudioPlayer";
import Program from "@/components/sections/Program";
import Location from "@/components/sections/Location";
import Countdown from "@/components/sections/Countdown";

export default function Home() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <AudioPlayer playing={opened} />

      {!opened ? (
        <Envelope onOpen={() => setOpened(true)} />
      ) : (
        <main>
          <Hero />
          <Welcome />
          <Program />
          <Location />
          <Questionnaire />
          <Countdown />
          <Footer />
        </main>
      )}
    </>
  );
}