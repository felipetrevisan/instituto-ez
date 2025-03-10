"use client";

import { Parallax } from "react-parallax";
import bgServices from "@/assets/images/bg-services.png";

import { Button } from "@/components/ui/button";

export function Services() {
  return (
    <div className="flex flex-col gap-48">
      <div className="relative flex justify-between w-full h-full">
        <Parallax
          bgImage={bgServices.src}
          className="flex justify-center w-2/3 h-[362px] overflow-hidden rounded-lg"
        ></Parallax>
        <div className="flex justify-center w-1/2 z-10 bg-card/90 shadow-lg rounded-lg absolute right-80 top-24">
          <div className="relative flex flex-col justify-start items-start w-full h-full text-primary-foreground p-10 gap-10">
            <div className="flex flex-col">
              <h3 className="text-4xl text-left font-bold font-oswald">Matematizador</h3>
              <h1 className="text-5xl text-left font-bold font-oswald">
                de Eficiência Empresarial
              </h1>
            </div>
            <p className="flex flex-col font-light text-justify text-md font-questrial leading-7 gap-10">
              Apresentamos a revolução no aprimoramento empresarial: Uma ferramenta capaz de
              decifrar a dinâmica interna de sua equipe e setores de maneira matemática,
              proporcionando análises precisas sobre seu funcionamento. Nosso sistema gera um
              relatório detalhado que destaca áreas de excelência, identifica falhas e assegura o
              direcionamento da empresa. Descubra como a neurociência pode impulsionar o sucesso do
              seu negócio. Elevamos sua empresa a um novo patamar. Produto Neurocientífico.
              <Button
                variant="default"
                theme="tertiary"
                size="xl"
                hover="effect"
                rounded="2xl"
                className="w-full font-bold"
              >
                Saiba Mais
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
