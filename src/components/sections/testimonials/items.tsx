"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Pagination } from "swiper/modules";
import { Testimonial } from "./testimonial";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./styles.scss";

const testimonials = [
  {
    author: {
      name: "André, Representante Comercial",
    },
    testimonial:
      "Há cerca de 3 anos, desesperançado devido à dependência química, marquei uma reunião com Enzo sugerida por um amigo. Já tinha passado por inúmeras tentativas de cura, mas ao conhecer Enzo, encontrei esperança. Ele, além de um profundo entendimento, mostrou compaixão, sem julgamentos. Com sua abordagem acessando meu cérebro, consegui superar a dependência. Hoje, limpo por 2 anos e 5 meses, sinto que houve uma mudança neurológica. Reconheço minha condição como uma doença, afetando 15% da população global, e mantenho-me consciente, valorizando a palavra decisão. Gratidão eterna a Enzo, profissional e amigo.",
    id: "testimonial-1",
  },
  {
    author: {
      name: "Ana Silva, Professa",
    },
    testimonial:
      "Minha jornada contra a depressão teve uma virada significativa quando descobri o Instituto Ez. O acolhimento e a expertise do Neurocientista Enzo Pasqualetti foram fundamentais. Sua abordagem científica aliada a uma compreensão empática trouxe luz às minhas sombras emocionais. As estratégias personalizadas e o suporte contínuo do Instituto Ez foram cruciais para minha recuperação. Sou profundamente grata por ter encontrado um caminho para a cura com a ajuda deste notável profissional e instituição.",
    id: "testimonial-2",
  },
  {
    author: {
      name: "Leandro, Gerente Comercial",
    },
    testimonial:
      "Trabalhar com o Enzo foi incrivelmente prazeroso. Juntos, planejamos soluções para meus problemas, identificando áreas de melhoria. Por meio de conversas e exercícios, Enzo proporcionou um ambiente acolhedor, permitindo que eu me conhecesse profundamente. A cada encontro, ganhava conhecimento, aprendizado e uma nova perspectiva sobre minha vida, além de um bem-estar duradouro. O que começou como coincidência se transformou em um prêmio inestimável. Agradeço imensamente por tudo!",
    id: "testimonial-3",
  },
  {
    author: {
      name: "Henrique Ramos, Médico",
    },
    testimonial:
      "Realizei algumas sessões com o Enzo Pasqueletti. Acredito que os pontos chaves foram as capacidades de: compreender a situação; direcionar o raciocínio durante as sessões para encontrar a solução. Como foi realizada uma estratégia de atuação, a melhora foi perceptível durante cada sessão e no período subsequente. As experiências tiveram significância e serviram como amadurecimento pessoal.",
    id: "testimonial-4",
  },
  {
    author: {
      name: "Fernando Sugiyama, Empresário",
    },
    testimonial:
      "A busca pelo autoconhecimento e transformação inicia quando enfrentamos nossos medos, deixamos a zona de conforto e encaramos a realidade, assumindo responsabilidades. Essa jornada, que alcancei por méritos próprios, foi facilitada pelo Instituto Ez, especialmente seu fundador, Enzo Pasqualetti. Além de um excelente profissional e defensor de ideais, ele se mostrou um grande amigo, percebendo nuances sem que eu precisasse expressar. Com ética, responsabilidade e técnica, Enzo é capaz de transformar vidas de maneira disruptiva neste crucial campo do desenvolvimento humano. Agradeço por sua ajuda fundamental!",
    id: "testimonial-5",
  },
  {
    author: {
      name: "Adriana Taguti, Cabeleireira",
    },
    testimonial:
      "Cerca de seis anos atrás, enfrentei minha primeira crise de síndrome do pânico no trânsito. Após exames e diagnóstico psiquiátrico, vivi várias crises, evitando situações desencadeantes. Conheci Enzo há alguns anos, começamos a trabalhar juntos semanalmente, reduzindo gradualmente as sensações de pânico. Graças a ele, superei o medo, retomei minha vida social e hoje consigo enfrentar qualquer situação sem crises. Acredito que é possível amenizar e até curar a síndrome. Espero que, assim como Enzo me ajudou, este depoimento possa ser útil a muitos.",
    id: "testimonial-6",
  },
  {
    author: {
      name: "Rafael Nakamoto, Prive Equity",
    },
    testimonial:
      "Enzo é uma pessoa brilhante com um entusiasmo e determinação sem igual. Apenas uma breve conversa é suficiente para se sentir inspirado com os seus valores e sua nobre missão de vida. Como neurocientista, Enzo ampliou de uma forma inestimável o meu auto-conhecimento, me apresentou ferramentas e formas de reflexão para encontrar um equilíbrio que, de maneira surpreendentemente objetiva, mudaram o patamar das minhas relações pessoais e profissionais, e me permitiram clarificar e expandir meus objetivos de vida.",
    id: "testimonial-7",
  },
  {
    author: {
      name: "Carlos Oliveira, Engenheiro",
    },
    testimonial:
      "Minha trajetória para superar a ansiedade ganhou um novo fôlego com a descoberta do Instituto Ez e o Neurocientista Enzo Pasqualetti. Como engenheiro, sempre busquei soluções lógicas, e foi incrível encontrar uma abordagem científica para enfrentar a ansiedade. Enzo, com sua empatia e conhecimento, ofereceu ferramentas práticas e estratégias personalizadas que fizeram toda a diferença. O Instituto Ez tornou-se meu refúgio seguro durante esse processo de autodescoberta e controle emocional. Agradeço sinceramente por esta transformadora experiência.",
    id: "testimonial-8",
  },
  {
    author: {
      name: "Leonardo Silva Brene, Professor Hospitalar",
    },
    testimonial:
      "Houve momentos em minha vida que passei por grandes obstáculos, e mesmo com os conselhos de minha família e dos amigos, eu não conseguia superar e seguir em frente. Então, conhecer o Enzo, me ajudou muito! Em todas as suas consultas, pude me sentir mais capacitado, mais seguro e que tudo é possível de se alcançar, mesmo indo poucas vezes, suas consultas mudaram a minha vida, e serei eternamente grato por conhecê-lo.",
    id: "testimonial-9",
  },
];

export function Items() {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  return (
    <div className="container flex flex-col justify-center">
      <Swiper
        grabCursor
        slidesPerView={2}
        centeredSlides
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 2,
          },
        }}
        spaceBetween={40}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, A11y]}
        className="flex flex-row w-full !overflow-visible"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <Testimonial
              key={`testimonial_${testimonial.id}`}
              {...testimonial}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
}
