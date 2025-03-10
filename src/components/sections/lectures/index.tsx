"use client";

import { Parallax } from "react-parallax";
import bgLectures from "@/assets/images/bg-lecture.png";
import bgLectures1 from "@/assets/images/bg-lecture-1.png";

import { Button } from "@/components/ui/button";

export function Lectures() {
  return (
    <div className="flex flex-col gap-48">
      <div className="relative flex justify-between w-full h-full">
        <Parallax
          bgImage={bgLectures.src}
          className="flex justify-center w-2/3 h-[362px] overflow-hidden rounded-lg"
        ></Parallax>
        <div className="flex justify-center w-1/2 z-10 bg-card/90 shadow-lg rounded-lg absolute right-80 top-24">
          <div className="relative flex flex-col justify-start items-start w-full h-full text-primary-foreground p-10 gap-10">
            <div className="flex flex-col">
              <h3 className="text-4xl text-left font-bold font-oswald">Palestra: Neurociência</h3>
              <h1 className="text-5xl text-left font-bold font-oswald">do Pensamento Positivo</h1>
            </div>
            <p className="flex flex-col font-light text-justify text-md font-questrial leading-7 gap-10">
              Explore a saúde mental no ambiente de trabalho e descubra como enfrentar e superar
              desafios como depressão, burnout e ansiedade. Esta palestra oferece uma visão clara e
              prática sobre como identificar e lidar com esses problemas, promovendo um ambiente de
              trabalho mais saudável e produtivo. Prepare-se para adquirir ferramentas valiosas e
              fortalecer o bem-estar coletivo da sua equipe.
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
      <div className="relative flex flex-row-reverse justify-between w-full h-full">
        <Parallax
          bgImage={bgLectures1.src}
          className="flex justify-center w-2/3 h-[362px] overflow-hidden rounded-lg"
        ></Parallax>
        <div className="flex justify-center w-1/2 z-10 bg-card/90 shadow-lg rounded-lg absolute left-80 top-24">
          <div className="flex flex-col justify-start items-start w-full text-primary-foreground p-10 gap-10">
            <div className="flex flex-col">
              <h3 className="text-4xl text-left font-bold font-oswald">Palestra: Saúde Mental</h3>
              <h1 className="text-5xl text-left font-bold font-oswald">
                Depressão, Ansiedade e Burnout
              </h1>
            </div>
            <p className="flex flex-col font-light text-justify text-md font-questrial leading-7 gap-10 h-full">
              Explore a saúde mental no ambiente de trabalho e descubra como enfrentar e superar
              desafios como depressão, burnout e ansiedade. Esta palestra oferece uma visão clara e
              prática sobre como identificar e lidar com esses problemas, promovendo um ambiente de
              trabalho mais saudável e produtivo. Prepare-se para adquirir ferramentas valiosas e
              fortalecer o bem-estar coletivo da sua equipe.
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
