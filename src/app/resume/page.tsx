import type { Metadata } from 'next';
import { SiteFrame } from '@/components/public/SiteFrame';
import { ResumeSection } from '@/components/public/ResumeSection';
import { SkillPill } from '@/components/public/SkillPill';
import { Button } from '@/components/public/Button';
import { resume } from '@/data/resume';
import { getPublicProjects } from '@/data';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Caleb Frady — finance graduate, digital communications specialist, and website builder. Experience, education, projects, and skills.',
};

export default async function ResumePage() {
  const projects = await getPublicProjects();

  return (
    <SiteFrame>
      <div className="container-x py-16 sm:py-20">
        {/* Header */}
        <header className="flex flex-col gap-6 border-b border-line pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">Resume</span>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-bone sm:text-5xl">
              {resume.name}
            </h1>
            <p className="mt-3 max-w-xl text-lg text-bone-soft">{resume.title}</p>
            <p className="mt-1 text-sm text-bone-soft/70">
              {resume.location} · {resume.email}
            </p>
          </div>
          {/* TODO: replace the placeholder PDF in /public/resume with your export */}
          <Button href="/resume/Caleb-Frady-Resume.pdf" external size="md">
            Download PDF ↓
          </Button>
        </header>

        {/* Summary */}
        <ResumeSection title="Summary">
          <p className="text-base leading-relaxed text-bone-soft">
            {resume.summary}
          </p>
        </ResumeSection>

        {/* Experience */}
        <ResumeSection title="Experience">
          {resume.experience.map((exp) => (
            <div key={exp.role + exp.organization} className="flex flex-col gap-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-bone">{exp.role}</h3>
                <span className="text-sm text-bone-soft">
                  {exp.start} – {exp.end}
                </span>
              </div>
              <p className="text-sm text-moss-400">
                {exp.organization} · {exp.location}
              </p>
              <p className="text-sm leading-relaxed text-bone-soft">
                {exp.summary}
              </p>
              <ul className="mt-1 flex flex-col gap-2">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 text-sm text-bone-soft">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ResumeSection>

        {/* Education */}
        <ResumeSection title="Education">
          {resume.education.map((edu) => (
            <div key={edu.school} className="flex flex-col gap-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-bone">{edu.school}</h3>
                <span className="text-sm text-bone-soft">
                  {edu.start} – {edu.end}
                </span>
              </div>
              <p className="text-sm text-moss-400">{edu.degree}</p>
              <p className="text-sm text-bone-soft">{edu.focus}</p>
              <ul className="mt-1 flex flex-col gap-2">
                {edu.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 text-sm text-bone-soft">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ResumeSection>

        {/* Projects */}
        <ResumeSection title="Projects">
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.slice(0, 6).map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-line bg-ink-800/40 p-5"
              >
                <p className="text-xs uppercase tracking-wider text-moss">
                  {p.category}
                </p>
                <h4 className="mt-1 font-semibold text-bone">{p.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-bone-soft">
                  {p.short_description}
                </p>
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* Skills */}
        <ResumeSection title="Skills">
          <div className="flex flex-col gap-6">
            {resume.skills.map((group) => (
              <div key={group.category}>
                <h4 className="mb-3 text-sm font-medium text-bone">
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <SkillPill key={item}>{item}</SkillPill>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* Tools */}
        <ResumeSection title="Tools">
          <div className="flex flex-wrap gap-2">
            {resume.tools.map((tool) => (
              <SkillPill key={tool} accent>
                {tool}
              </SkillPill>
            ))}
          </div>
        </ResumeSection>
      </div>
    </SiteFrame>
  );
}
