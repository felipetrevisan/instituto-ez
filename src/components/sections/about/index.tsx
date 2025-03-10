"use client";

import Image from "next/image";

export function About() {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="grid grid-areas-[left_right_right] gap-4 w-full h-[600px]">
        <div className="relative bg-indigo-500 grid-in-[left] w-full rounded-2xl overflow-hidden">
          <Image
            src="/assets/images/slogan.png"
            fill
            alt=""
            priority
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative bg-indigo-500 grid-in-[right] w-full rounded-2xl">
          <Image
            src="/assets/images/mind.png"
            fill
            alt=""
            priority
            className="w-full h-full object-cover rounded-2xl overflow-hidden"
          />
          <div className="absolute flex flex-col text-primary-foreground bg-white h-max max-h-full w-[280px] -top-8 left-20 p-8 border-4 border-x-0 border-primary-foreground gap-2 rounded-2xl">
            <h2 className="lg:text-3xl font-bold">Sobre Nós</h2>
            <p className="font-light">
              Há mais de 10 anos, o Instituto Ez, liderado pelo neurocientista e economista Enzo
              Pasqualetti, tem se destacado como pioneiro ao oferecer uma perspectiva inovadora para
              o desenvolvimento do comportamento humano. Acreditamos firmemente na singularidade de
              cada indivíduo, impulsionando nossa busca por soluções que superam as expectativas,
              criando um ambiente propício ao florescimento do potencial humano.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-areas-[left_left_left_right_right_right] gap-4 w-full h-[600px] mb-14">
        <div className="relative bg-indigo-500 grid-in-[left] w-full rounded-2xl">
          <Image
            src="/assets/images/services.png"
            fill
            alt=""
            priority
            className="w-full h-full object-cover rounded-2xl overflow-hidden"
          />
          <div className="absolute flex flex-col text-primary-foreground bg-white h-max max-h-full w-[280px] -bottom-16 right-4 p-8 border-4 border-x-0 border-primary-foreground gap-2 rounded-2xl">
            <h2 className="lg:text-3xl font-bold">Nossos Serviços & Produtos</h2>
            <p className="font-light">
              Explore um universo de possibilidades no Instituto Ez, onde cada ação é projetada para
              desbloquear seu potencial máximo. Desde atendimentos personalizados que moldam
              jornadas individuais como também palestras, workshops e treinamentos.
            </p>
          </div>
        </div>
        <div className="relative bg-indigo-500 grid-in-[right] w-full rounded-2xl">
          <Image
            src="/assets/images/our-mission.png"
            fill
            alt=""
            priority
            className="w-full h-full object-cover rounded-2xl overflow-hidden"
          />
          <div className="absolute flex flex-col text-primary-foreground bg-white h-max max-h-full w-[280px] -top-28 right-40 p-8 border-4 border-x-0 border-primary-foreground gap-2 rounded-2xl">
            <h2 className="lg:text-3xl font-bold">Nossa Missão</h2>
            <p className="font-light">
              Integrando o conhecimento científico da neurociência com a psiquiatria e a psicologia,
              buscamos proporcionar um novo olhar para o cuidado da saúde mental. Através dos nossos
              métodos e estudos, nossa missão é levar esse cuidado para o maior número de pessoas
              possível, proporcionando bem-estar e evolução por onde passamos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
