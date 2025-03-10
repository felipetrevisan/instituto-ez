"use client";

import { motion } from "framer-motion";
import { Parallax } from "react-parallax";
import bgWelcome from "@/assets/images/bg-welcome.png";

export function Home() {
  return (
    <motion.div layout className="w-full h-[350px] flex flex-col">
      {/* <Suspense fallback={<p>Loading video...</p>}>
        <div className="relative before:absolute before:z-10 before:w-full before:h-full before:bg-overlay rounded-2xl overflow-hidden">
          <Video src="/assets/videos/background.mp4" />
          Bem-vindos ao Instituto do Comportamento Humano e Inovação Ez
        </div>
      </Suspense> */}
      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={bgWelcome.src}
        strength={-200}
        className="w-full h-full overflow-hidden rounded-lg"
      >
        <div className="flex h-[350px]">
          <div className="flex flex-col justify-center items-center font-bold font-oswald w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
            <h3 className="text-5xl italic">Bem-vindos ao</h3>
            <h1 className="text-6xl w-3/5 text-center">
              Instituto do Comportamento Humano e Inovação Ez
            </h1>
          </div>
        </div>
      </Parallax>
    </motion.div>
  );
}
