import certificationsManifest from './certifications.json';

export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: { label: string; url: string };
  privateLabel?: string;
};

export const projects: Project[] = [
  {
    title: 'Sadagaat',
    description:
      'Charity organization platform with bilingual (Arabic / English) content, project and program showcases, volunteer onboarding, and integrated donation flow connected to local Sudanese banks via a payment service provider.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'i18n', 'Payment Integration'],
    link: { label: 'Visit site', url: 'https://www.sadagaat.com' },
  },
  {
    title: 'SAPA, Sudanese American Physicians Association',
    description:
      'Nonprofit healthcare platform with multi-channel giving (monetary plus Islamic giving with a Zakat calculator), donor dashboard, campaign pages, volunteer hub, and program and event management.',
    tags: ['React.js', 'Node.js', 'REST API', 'Stripe', 'Tailwind CSS'],
    link: { label: 'Visit site', url: 'https://sapa-usa.org' },
  },
];

export const social = {
  github: 'https://github.com/smsm95/smsm95',
  linkedin: 'https://www.linkedin.com/in/osama-mirghani/',
  upwork:
    'https://www.upwork.com/freelancers/~01583bc2755a7ce41b?mp_source=share',
  email: 'mailto:osamamirghani95@gmail.com',
  cv: '/resume.pdf',
};

export const navHrefs = ['#home', '#about', '#projects', '#contacts'] as const;
export type NavKey = 'home' | 'about' | 'projects' | 'contacts';
export const navKeys: NavKey[] = ['home', 'about', 'projects', 'contacts'];

export type Certification = {
  slug: string;
  name: string;
  issuer: string | null;
  year: number | null;
  issuedAt: string | null;
  verifyUrl: string;
};

export const certifications: Certification[] = certificationsManifest;
