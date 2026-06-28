interface ResumeSectionProps {
  title: string;
  children: React.ReactNode;
}

/** A titled block for the web resume, with a hairline separator label. */
export function ResumeSection({ title, children }: ResumeSectionProps) {
  return (
    <section className="grid gap-6 border-t border-line py-10 md:grid-cols-[200px_1fr]">
      <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-moss">
        {title}
      </h2>
      <div className="flex flex-col gap-8">{children}</div>
    </section>
  );
}

export default ResumeSection;
