"use client";

import { motion } from "framer-motion";
import * as App from "@/components/app";
import { useServices } from "@/hooks/use-services";
import { ServiceCard as Card } from "./card";
import { Skeleton } from "./skeleton";

export function Services() {
  const { data, isLoading } = useServices();

  return (
    <motion.div layout className="flex flex-col space-y-12 gap-10">
      <App.PageHeader>
        <App.Title>Sessões de Transformação</App.Title>
        <App.Subtitle>
          Método exclusivo do Instituto Ez, escolha sua modalidade de atendimento:
        </App.Subtitle>
      </App.PageHeader>
      <div className="flex flex-col justify-center items-center gap-16 h-full place-items-center">
        {isLoading && <Skeleton />}
        {data?.map((item, index) => <Card key={item.id} item={item} index={index} />)}
      </div>
    </motion.div>
  );
}
