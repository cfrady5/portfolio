import type { Metadata } from 'next';
import { SiteFrame } from '@/components/public/SiteFrame';
import { SectionHeading } from '@/components/public/SectionHeading';
import { ProjectGallery } from '@/components/public/ProjectGallery';
import { ContactCTA } from '@/components/public/ContactCTA';
import { getPublicProjects } from '@/data';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'A gallery of websites, apps, brands, and concepts built with clarity — proof of work by Caleb Frady.',
};

export default async function WorkPage() {
  const projects = await getPublicProjects();

  return (
    <SiteFrame>
      <section className="container-x py-16 sm:py-20">
        <SectionHeading
          eyebrow="Proof of work"
          title="Selected work"
          description="Websites, apps, brands, and concepts — many built with Claude. Filter by category, then dive into a case study."
        />

        <div className="mt-12">
          <ProjectGallery projects={projects} />
        </div>
      </section>

      <ContactCTA />
    </SiteFrame>
  );
}
