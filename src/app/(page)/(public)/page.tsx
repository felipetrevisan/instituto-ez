import { Banner as BannerComponent } from "@/components/sections/banner";
import { About as AboutComponent } from "@/components/sections/about";
import { Testimonials as TestimonialsComponent } from "@/components/sections/testimonials";
import { Immersion as ImmersionComponent } from "@/components/sections/immersion";
import { Lectures as LecturesComponent } from "@/components/sections/lectures";
import { Workshops as WorkshopsComponent } from "@/components/sections/workshops";
import { AdvancedMentory as AdvancedMentoryComponent } from "@/components/sections/advancedMentory";
import { Services as ServicesComponent } from "@/components/sections/services";
import { Mathematizer as MathematizerComponent } from "@/components/sections/mathematizer";
import { Training as TrainingComponent } from "@/components/sections/training";

export default async function Page() {
  return (
    <div className="w-full flex items-center flex-col justify-center gap-20">
      <section className="section relative flex w-screen lg:w-full items-center justify-center">
        <BannerComponent />
      </section>
      <section className="section relative flex w-full justify-center bg-white">
        <AboutComponent />
      </section>
      <section className="section relative flex w-full justify-center bg-white">
        <ServicesComponent />
      </section>
      <section className="section relative flex w-full justify-center bg-white">
        <TestimonialsComponent />
      </section>
      <section className="section relative flex flex-col w-screen h-full justify-center">
        <ImmersionComponent />
      </section>
      <section className="section relative flex flex-col w-screen h-full justify-center">
        <LecturesComponent />
      </section>
      <section className="section relative flex h-full justify-center bg-white">
        <WorkshopsComponent />
      </section>
      <section className="section relative flex flex-col w-screen h-full justify-center">
        <AdvancedMentoryComponent />
      </section>
      <section className="section relative flex flex-col w-screen h-full justify-center">
        <MathematizerComponent />
      </section>
      <section className="section relative flex h-full justify-center bg-white">
        <TrainingComponent />
      </section>
    </div>
  );
}
