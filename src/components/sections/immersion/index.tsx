"use client";

import { Parallax } from "react-parallax";
import bgImmersion from "@/assets/images/bg-immersion.png";
import { Button } from "@/components/ui/button";

export function Immersion() {
  return (
    <>
      <div className="flex flex-col items-center w-full h-full bg-muted p-40 gap-10">
        <Parallax
          blur={{ min: -15, max: 15 }}
          bgImage={bgImmersion.src}
          strength={-200}
          className="flex justify-center xl:w-3/4 w-[124%] xl:h-[400px] h-[300px] overflow-hidden rounded-lg"
        ></Parallax>
        <div className="flex justify-center xl:w-3/5 w-full h-full -m-40 mb-4 z-10 bg-white/90 backdrop-blur-lg rounded-lg">
          <div className="flex flex-col justify-start items-center w-full text-primary-foreground p-10 gap-10">
            <div className="flex flex-col items-start justify-start">
              <h3 className="text-4xl text-left font-bold font-oswald">Imersão:</h3>
              <h1 className="text-6xl text-left font-bold font-oswald">Despertar da Consciência</h1>
            </div>
            <p className="font-light text-justify text-md font-questrial leading-7">
              <em className="font-semibold">
                Imersão em Neurociência, Espiritualidade, Consciência e Fé.
              </em>{" "}
              Embarque conosco nesta jornada única onde mente e espírito se conectam, proporcionando
              uma experiência profunda e enriquecedora. Este evento é inter-religioso o que
              significa que todas as religiões, crenças e tradições espirituais são bem vindas.
              Portanto, seja você um buscador espiritual, entusiasta da neurociência ou alguém em
              busca de significado, esta é uma oportunidade para nutrir sua compreensão
              neurociêntifica destes assuntos, e irá nutrir expandir sua consciência para outro
              nível. Venha vivenciar uma transformação profunda que ecoará em todos os aspectos de
              sua vida. Sua jornada começa aqui. Junte-se a nós!
            </p>
          </div>
        </div>
        <Button variant="default" theme="tertiary" rounded="xl" size="2xl" className="flex w-3/5 uppercase font-bold">Conheça Mais!</Button>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80">
        <path
          className="fill-muted"
          fillOpacity="1"
          d="M 225 22 L 552 50 L 1535 -2 L 1413 -1 L 958 -2 L 482 -2 L 1 -2 Z"
        ></path>
      </svg>
    </>
  );
}
