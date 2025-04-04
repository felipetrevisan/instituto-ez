import { notFound } from "next/navigation";
import { getPageBySlug } from "@/server/get-page";
import { Content } from "./_content";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const [slug] = (await params).slug;

  const response = await getPageBySlug(slug);

  if (!response) {
    notFound();
  }

  console.log(response);

  return (
    <div className="w-full flex items-center flex-col justify-center space-y-14 mb-40">
      <section className="section relative flex flex-col gap-20 w-screen items-center justify-center">
        {response.sections.map((section, index) => (
          <Content {...section} key={`${response.id}-${response.slug}-${index}`} />
        ))}
      </section>
    </div>
  );
}
