"use client";

import * as App from "@/components/app";
import { useMathematizer } from "@/hooks/use-mathematizer";
import { MathematizerCard as Card } from "./card";
import { Skeleton } from "./skeleton";

export function Mathematizer() {
  const { data, isLoading } = useMathematizer();

  return (
    <div className="flex flex-col gap-10">
      <App.PageHeader>
        <App.Title>Conheça nossos Serviços e Produtos</App.Title>
        <App.Subtitle>Exclusivos para Empresas</App.Subtitle>
      </App.PageHeader>
      <div className="flex flex-col gap-12 lg:gap-28">
        {isLoading && (
          <>
            <Skeleton className="lg:absolute lg:left-0" />
            <Skeleton className="lg:absolute lg:right-0" />
          </>
        )}
        {data?.map((item, index) => <Card key={item.id} item={item} index={index} />)}
      </div>
    </div>
  );
}
