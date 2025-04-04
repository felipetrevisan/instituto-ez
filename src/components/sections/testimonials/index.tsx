"use client";

import { useState } from "react";
import { A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import * as App from "@/components/app";
import { useTestimonials } from "@/hooks/use-testimonials";
import { TestimonialCard } from "./card";
import { Skeleton } from "./skeleton";

import "swiper/css";
import "swiper/css/pagination";
import "./styles.scss";

export function Testimonials() {
  const { data, isLoading } = useTestimonials();
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  return (
    <div className="flex flex-col w-full h-full space-y-14">
      <App.PageHeader>
        <App.Title variant="default">Depoimentos</App.Title>
      </App.PageHeader>
      <div className="flex flex-col justify-center">
        {isLoading && <Skeleton />}
        {!isLoading && (
          <Swiper
            grabCursor
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
              1280: {
                slidesPerView: 2,
              }
            }}
            slidesPerView={1}
            spaceBetween={40}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, A11y]}
            className="flex flex-col md:flex-row w-full overflow-hidden md:overflow-visible"
          >
            {data?.map((testimonial, _index) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard
                  key={`testimonial_${testimonial.id}`}
                  item={testimonial}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
