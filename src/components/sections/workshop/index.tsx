"use client";

import { LayoutGroup, motion } from "framer-motion";
import * as App from "@/components/app";
import { WorkshopCard as Card } from "./card";

export function Workshops() {
  return (
    <motion.div layout className="flex flex-col space-y-12">
      <App.PageHeader>
        <App.Title>Conheça nossos Workshops</App.Title>
      </App.PageHeader>
      <div className="flex flex-col justify-center items-center gap-16 h-full place-items-center">
        <LayoutGroup>
            <Card
              title="Trampolim"
              image={{ src: "/assets/images/trampolim.png" }}
              className="left-10"
            />
            <Card
              title="Catarse"
              image={{ src: "/assets/images/catarse.png" }}
              className="right-10"
            />
        </LayoutGroup>
      </div>
    </motion.div>
  );
}
