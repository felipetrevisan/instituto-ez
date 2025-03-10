import { Home as HomeComponent } from "@/components/sections/home";
import { About as AboutComponent } from "@/components/sections/about";
import { TrainingMode as TrainingModeComponent } from "@/components/sections/training-mode";
import { Testimonials as TestimonialsComponent } from "@/components/sections/testimonials";
import { Immersion as ImmersionComponent } from "@/components/sections/immersion";
import { Lectures as LecturesComponent } from "@/components/sections/lectures";
import { Workshops as WorkshopsComponent } from "@/components/sections/workshop";
import { AdvancedMentory as AdvancedMentoryComponent } from "@/components/sections/advancedMentory";
import { Services as ServicesComponent } from "@/components/sections/services";

export default async function Page() {
  return (
    <div className="w-full flex items-center flex-col justify-center space-y-14 mb-40">
      <section className="section relative flex w-full items-center justify-center">
        <HomeComponent />
      </section>
      <section className="section relative flex w-full justify-center bg-white">
        <AboutComponent />
      </section>
      <section className="section relative flex w-full justify-center bg-white">
        <TrainingModeComponent />
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
      <section className="section relative flex h-full justify-center bg-white mt-80">
        <WorkshopsComponent />
      </section>
      <section className="section relative flex flex-col w-screen h-full justify-center">
        <AdvancedMentoryComponent />
      </section>
      <section className="section relative flex flex-col w-screen h-full justify-center">
        <ServicesComponent />
      </section>
    </div>
  );
}
