import * as App from "@/components/app";
import { Items } from "./items";

export function Testimonials() {
  return (
    <div className="flex flex-col w-full h-full space-y-14">
      <App.PageHeader>
        <App.Title variant="default">Depoimentos</App.Title>
      </App.PageHeader>
      <Items />
    </div>
  );
}
