"use client";

import { Parallax } from "react-parallax";
import bgAdvancedMentory from "@/assets/images/bg-advanced-mentory.png";
import { Button } from "@/components/ui/button";

export function AdvancedMentory() {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1535 -50 1534 51">
        <path
          d="M-225-22-552-50-1535 2-1413 1-958 2-482 2-1 2Z"
          className="fill-muted"
          fillOpacity="1"
        />
      </svg>
      <div className="flex flex-col items-center w-full h-full bg-muted p-40 gap-10">
        <Parallax
          blur={{ min: -15, max: 15 }}
          bgImage={bgAdvancedMentory.src}
          strength={-200}
          className="flex justify-center xl:w-3/4 w-[124%] xl:h-[400px] h-[300px] overflow-hidden rounded-lg"
        ></Parallax>
        <div className="relative flex justify-center w-3/5 h-full -mt-40 mb-4 z-10 bg-white/90 backdrop-blur-lg rounded-lg overflow-hidden">
          <div className="relative flex flex-col justify-start items-center w-full text-primary-foreground p-10 gap-10 overflow-hidden">
            <div className="absolute left-0 top-0 h-16 w-16">
              <div className="absolute transform -rotate-45 bg-red-800 text-center text-white font-semibold py-1 left-[-35px] top-[32px] w-[170px] uppercase animate-pulse">
                Em Breve
              </div>
            </div>
            <div className="flex flex-col items-start justify-start">
              <h3 className="text-4xl text-left font-bold font-oswald">
                Programa de Mentoria Avançada
              </h3>
            </div>
            <p className="font-light text-justify text-md font-questrial leading-7">
              Receba a orientação necessária para transformar sua mente e emoções, fortalecendo seus
              passos e facilitando a conquista de suas metas e objetivos. Nossa abordagem única
              oferece uma direção clara para sua vida pessoal e profissional, enquanto você explora
              novas dimensões do autoconhecimento. Com exercícios neurocognitivos projetados para
              desbloquear seu verdadeiro potencial, você será guiado a um nível mais alto de
              realização e sucesso. Prepare-se para uma jornada que transforma e ilumina seu futuro.
            </p>
          </div>
        </div>
        <Button
          variant="default"
          theme="tertiary"
          rounded="xl"
          size="2xl"
          className="flex w-3/5 uppercase font-bold"
          disabled
        >
          Em breve mais informações
        </Button>
      </div>
    </>
  );
}
