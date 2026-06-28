import type { ResumeData } from '@/types';

// ---------------------------------------------------------------------------
// Resume content. Edit this file to update the /resume page.
// The downloadable PDF lives at /public/resume/Caleb-Frady-Resume.pdf
// (replace the placeholder with your real export).
// ---------------------------------------------------------------------------

export const resume: ResumeData = {
  name: 'Caleb Frady',
  title: 'Digital Communications Specialist & Website Builder',
  location: 'Indiana, USA',
  email: 'cjfrady5@gmail.com',
  summary:
    'Finance graduate and digital communications specialist who builds websites and digital systems with clarity. I combine strategy, story, and execution to help organizations look trustworthy, communicate clearly, and turn attention into action. I build with my name on it.',
  experience: [
    {
      role: 'Social Media Content & Digital Communications Specialist',
      organization: 'Applied Research Institute (ARI)',
      location: 'Indiana',
      start: '2024',
      end: 'Present',
      summary:
        'Lead digital communications, website design, and content strategy across innovation, government, and research-focused initiatives.',
      highlights: [
        'Designed and built website concepts and page systems for innovation and defense audiences (SciTechCONNECT, RAM, ARI).',
        'Ran content strategy and social media for technical, multi-stakeholder programs.',
        'Built formal event landing pages (Bizzabo) for government and defense events.',
        'Translated complex research and acquisition work into clear, credible web experiences.',
        'Used AI-assisted workflows (Claude) to move from concept to build faster.',
      ],
    },
    {
      role: 'Freelance Web Designer & Developer',
      organization: 'Independent',
      location: 'Remote',
      start: '2025',
      end: 'Present',
      summary:
        'Designed and built clean, fast, conversion-minded websites for local and growing organizations as an independent designer-developer.',
      highlights: [
        'Built a repeatable premium design system reused across projects.',
        'Built and shipped sites on Next.js, Vercel, and Wix Studio.',
        'Handled strategy, design, copywriting, development, and SEO end to end.',
        'Planned CMS structures so clients can maintain their own content.',
      ],
    },
  ],
  education: [
    {
      school: 'Purdue University',
      degree: 'B.S. in Finance',
      focus: 'Finance · Entrepreneurship & Innovation',
      location: 'West Lafayette, IN',
      start: '2020',
      end: '2024',
      highlights: [
        'Finance major with a focus on entrepreneurship and innovation.',
        'Built web projects and digital brands alongside coursework.',
        'Bridged business fundamentals with design and communications.',
      ],
    },
  ],
  skills: [
    {
      category: 'Strategy & Communications',
      items: [
        'Content strategy',
        'Digital communications',
        'Marketing & storytelling',
        'Brand positioning',
        'Copywriting',
      ],
    },
    {
      category: 'Design & Web',
      items: [
        'Website design',
        'UI/UX concepts',
        'Responsive design',
        'Information architecture',
        'CMS planning',
      ],
    },
    {
      category: 'Development',
      items: [
        'Next.js',
        'TypeScript',
        'HTML / CSS',
        'JavaScript',
        'AI-assisted development',
      ],
    },
    {
      category: 'Business & Growth',
      items: ['SEO basics', 'Finance', 'Project strategy', 'Client management'],
    },
  ],
  tools: [
    'GitHub',
    'Vercel',
    'Wix Studio',
    'Supabase',
    'Claude',
    'Higher Logic',
    'Bizzabo',
    'Next.js',
    'Tailwind CSS',
  ],
};
