"use client";

import { motion } from "framer-motion";
import * as App from "@/components/app";
import { TrainingModeCard as Card } from "./card";

export function TrainingMode() {
  return (
    <motion.div layout className="flex flex-col space-y-12">
      <App.PageHeader>
        <App.Title>Sessões de Transformação</App.Title>
        <App.Subtitle>
          Método exclusivo do Instituto Ez, escolha sua modalidade de atendimento:
        </App.Subtitle>
      </App.PageHeader>
      <div className="flex flex-col justify-center items-center gap-16 h-full place-items-center">
        <Card
          title="Trampolim"
          image={{ src: "/assets/images/trampolim.png" }}
          className="left-10"
        />
        <Card title="Catarse" image={{ src: "/assets/images/catarse.png" }} className="right-10" />
      </div>
    </motion.div>
  );
}
