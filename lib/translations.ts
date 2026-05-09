export type Locale = 'en' | 'ar';

export const LOCALES: Locale[] = ['en', 'ar'];

export type Translation = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    about: string;
    projects: string;
    contacts: string;
    homeAria: string;
    cv: string;
    languageToggleAria: (next: Locale) => string;
    themeToggleAria: (next: 'dark' | 'light') => string;
  };
  hero: {
    name: string;
    nameWords: string[];
    taglineLeft: string;
    taglineRight: string;
    workedWith: string;
    socialLabels: {
      linkedin: string;
      upwork: string;
      email: string;
    };
  };
  about: {
    sectionLabel: string;
    sectionHeading: string;
    paragraph1: string;
    freelanceLead: string;
    freelanceHighlight: string;
    freelanceTail: string;
    paragraph3: string;
    stackLabel: string;
    stackHeading: string;
    domains: {
      Frontend: string;
      Backend: string;
      Cloud: string;
      Practice: string;
    };
  };
  certifications: {
    sectionLabel: string;
    sectionHeading: string;
    intro: string;
    issuedPrefix: string;
    verifyAria: (name: string) => string;
    items: Record<string, { name: string; issuer: string }>;
  };
  projects: {
    sectionLabel: string;
    sectionHeading: string;
    intro: string;
    visitSite: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  contact: {
    sectionLabel: string;
    sectionHeading: string;
    leadBefore: string;
    leadLink: string;
    leadAfter: string;
    socialPart1: string;
    linkedinLabel: string;
    socialAnd: string;
    upworkLabel: string;
    socialEnd: string;
  };
  footer: {
    line: string;
  };
  notFound: {
    label: string;
    heading: string;
    bodyBeforePath: string;
    bodyAfterPath: string;
    takeMeHome: string;
    emailInstead: string;
  };
};

const en: Translation = {
  meta: {
    title: 'Osama Mirghani · Software Engineer',
    description:
      'Full-stack software engineer with 8+ years of experience building secure, scalable web applications. Currently at Emirates NBD.',
  },
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    contacts: 'Contact',
    homeAria: 'Osama Mirghani, home',
    cv: 'Download CV',
    languageToggleAria: (next) =>
      next === 'ar' ? 'Switch to Arabic' : 'Switch to English',
    themeToggleAria: (next) => `Switch to ${next} mode`,
  },
  hero: {
    name: 'Osama Mirghani',
    nameWords: ['Osama', 'Mirghani'],
    taglineLeft: 'Software Engineer',
    taglineRight: 'Full Stack Developer',
    workedWith: 'Worked with',
    socialLabels: {
      linkedin: 'LinkedIn',
      upwork: 'Upwork',
      email: 'Email',
    },
  },
  about: {
    sectionLabel: '01 / About',
    sectionHeading: 'What I *work* on.',
    paragraph1:
      'I build secure, scalable products for finance. At Emirates NBD that means digital business banking, instant lending integrations, and partner APIs that move real money. The work is end-to-end: architecture, frontend, backend, infrastructure.',
    freelanceLead: 'I’m currently ',
    freelanceHighlight: 'open to freelance work',
    freelanceTail:
      ' on the side: full-stack web, FinTech integrations, ERP, and cloud architecture. Comfortable owning a feature end-to-end or joining an existing team.',
    paragraph3:
      'Before banking, I led teams across Dubai and Khartoum, shipping ERP, e-commerce, and donations platforms, including bilingual (Arabic, English) systems that handle local-bank payment integrations.',
    stackLabel: '02 / Stack',
    stackHeading: 'What I reach for.',
    domains: {
      Frontend: 'Frontend',
      Backend: 'Backend',
      Cloud: 'Cloud',
      Practice: 'Practice',
    },
  },
  certifications: {
    sectionLabel: '03 / Credentials',
    sectionHeading: 'Verified, *current*.',
    intro:
      'Five active certifications covering AWS architecture and operations, plus product and delivery on the Scrum side. All public on Credly, all in date.',
    issuedPrefix: 'Issued',
    verifyAria: (name) => `Verify ${name} on Credly`,
    items: {
      'aws-certified-sysops-administrator-associate': {
        name: 'AWS Certified SysOps Administrator – Associate',
        issuer: 'Amazon Web Services',
      },
      'aws-certified-developer-associate': {
        name: 'AWS Certified Developer – Associate',
        issuer: 'Amazon Web Services',
      },
      'aws-certified-solutions-architect-associate': {
        name: 'AWS Certified Solutions Architect – Associate',
        issuer: 'Amazon Web Services',
      },
      'professional-scrum-master-i-psm-i': {
        name: 'Professional Scrum Master I',
        issuer: 'Scrum.org',
      },
      'professional-scrum-product-owner-i-pspo-i': {
        name: 'Professional Scrum Product Owner I',
        issuer: 'Scrum.org',
      },
    },
  },
  projects: {
    sectionLabel: '04 / Selected work',
    sectionHeading: 'Things I’ve *shipped*.',
    intro:
      'A short list. Most of my recent work is internal banking, so what ships publicly is the older social-impact work, still running.',
    visitSite: 'Visit site',
    items: [
      {
        title: 'Sadagaat',
        description:
          'Charity organization platform with bilingual (Arabic / English) content, project and program showcases, volunteer onboarding, and integrated donation flow connected to local Sudanese banks via a payment service provider.',
      },
      {
        title: 'SAPA, Sudanese American Physicians Association',
        description:
          'Nonprofit healthcare platform with multi-channel giving (monetary plus Islamic giving with a Zakat calculator), donor dashboard, campaign pages, volunteer hub, and program and event management.',
      },
    ],
  },
  contact: {
    sectionLabel: '05 / Contact',
    sectionHeading: 'Open to freelance projects. Always up for a conversation.',
    leadBefore: 'The fastest way to reach me is ',
    leadLink: 'by email',
    leadAfter: '. I reply within a working day.',
    socialPart1: 'Or find me on ',
    linkedinLabel: 'LinkedIn',
    socialAnd: ' and ',
    upworkLabel: 'Upwork',
    socialEnd: '.',
  },
  footer: {
    line: '© {year} Osama Mirghani · Dubai, UAE',
  },
  notFound: {
    label: '404 / Page not found',
    heading: 'Looks like that route got *lost in transit*.',
    bodyBeforePath: 'The page at ',
    bodyAfterPath:
      ' doesn’t exist — or used to, and got refactored out. No harm done. Head home, or drop me a note and I’ll point you the right way.',
    takeMeHome: 'Take me home',
    emailInstead: 'Email me instead',
  },
};

const ar: Translation = {
  meta: {
    title: 'اسامة ميرغني · مهندس برمجيات',
    description:
      'مهندس برمجيات Full-Stack بخبرة تزيد عن 8 سنوات في بناء تطبيقات ويب آمنة وقابلة للتوسع. حاليًا في بنك الإمارات دبي الوطني.',
  },
  nav: {
    home: 'الرئيسية',
    about: 'نبذة',
    projects: 'المشاريع',
    contacts: 'التواصل',
    homeAria: 'اسامة ميرغني، الصفحة الرئيسية',
    cv: 'تحميل السيرة الذاتية',
    languageToggleAria: (next) =>
      next === 'ar' ? 'التبديل إلى العربية' : 'التبديل إلى الإنجليزية',
    themeToggleAria: (next) =>
      `التبديل إلى الوضع ${next === 'dark' ? 'الداكن' : 'الفاتح'}`,
  },
  hero: {
    name: 'اسامة ميرغني',
    nameWords: ['اسامة', 'ميرغني'],
    taglineLeft: 'مهندس برمجيات',
    taglineRight: 'مطوّر Full Stack',
    workedWith: 'عملت مع',
    socialLabels: {
      linkedin: 'لينكدإن',
      upwork: 'أب وورك',
      email: 'البريد الإلكتروني',
    },
  },
  about: {
    sectionLabel: '٠١ / نبذة',
    sectionHeading: 'ما أعمل عليه.',
    paragraph1:
      'أبني منتجات آمنة وقابلة للتوسع في قطاع المال. في بنك الإمارات دبي الوطني، أعمل على الخدمات المصرفية الرقمية للأعمال، وتكاملات الإقراض الفوري، وواجهات برمجية للشركاء تنقل أموالاً حقيقية. العمل شامل: من الهندسة المعمارية إلى الواجهة الأمامية والخلفية والبنية التحتية.',
    freelanceLead: 'أنا حالياً ',
    freelanceHighlight: 'متاح للعمل الحر',
    freelanceTail:
      ' إلى جانب وظيفتي: تطوير ويب شامل، تكاملات تقنية مالية، أنظمة ERP، وهندسة سحابية. مرتاح لتولّي ميزة من البداية للنهاية أو الانضمام إلى فريق قائم.',
    paragraph3:
      'قبل العمل المصرفي، قدت فرقاً في دبي والخرطوم على منصات ERP والتجارة الإلكترونية ومنصات التبرعات، بما في ذلك أنظمة ثنائية اللغة (عربي، إنجليزي) تتعامل مع تكاملات الدفع المحلية.',
    stackLabel: '٠٢ / الأدوات',
    stackHeading: 'ما أستخدمه.',
    domains: {
      Frontend: 'الواجهة الأمامية',
      Backend: 'الخادم',
      Cloud: 'السحابة',
      Practice: 'الممارسات',
    },
  },
  certifications: {
    sectionLabel: '٠٣ / الشهادات',
    sectionHeading: 'موثّقة، *سارية*.',
    intro:
      'خمس شهادات نشطة تغطّي بنية وتشغيل خدمات AWS، إلى جانب إدارة المنتج والتسليم عبر إطار سكروم. جميعها متاحة للتحقق على Credly، وكلها سارية.',
    issuedPrefix: 'صدرت',
    verifyAria: (name) => `تحقّق من ${name} على Credly`,
    items: {
      'aws-certified-sysops-administrator-associate': {
        name: 'مسؤول عمليات نظم AWS المعتمد – المستوى التأسيسي',
        issuer: 'أمازون ويب سيرفيسز',
      },
      'aws-certified-developer-associate': {
        name: 'مطوّر AWS المعتمد – المستوى التأسيسي',
        issuer: 'أمازون ويب سيرفيسز',
      },
      'aws-certified-solutions-architect-associate': {
        name: 'مهندس حلول AWS المعتمد – المستوى التأسيسي',
        issuer: 'أمازون ويب سيرفيسز',
      },
      'professional-scrum-master-i-psm-i': {
        name: 'سكروم ماستر محترف، المستوى الأول',
        issuer: 'Scrum.org',
      },
      'professional-scrum-product-owner-i-pspo-i': {
        name: 'مالك منتج سكروم محترف، المستوى الأول',
        issuer: 'Scrum.org',
      },
    },
  },
  projects: {
    sectionLabel: '٠٤ / أعمال مختارة',
    sectionHeading: 'مشاريع أنجزتها.',
    intro:
      'قائمة قصيرة. معظم أعمالي الأخيرة داخلية في قطاع البنوك، لذا ما يُنشر علنياً هو عمل اجتماعي أقدم، لا يزال مستمراً.',
    visitSite: 'زيارة الموقع',
    items: [
      {
        title: 'صدقات (Sadagaat)',
        description:
          'منصة لمنظمة خيرية بمحتوى ثنائي اللغة (عربي / إنجليزي)، عرض المشاريع والبرامج، استقبال المتطوعين، وتدفق تبرعات متكامل مع البنوك السودانية المحلية عبر مزوّد خدمة دفع.',
      },
      {
        title: 'SAPA، الجمعية السودانية الأمريكية للأطباء',
        description:
          'منصة صحية لمنظمة غير ربحية، تدعم تبرعات متعددة القنوات (التبرعات النقدية إلى جانب التبرعات الإسلامية مع حاسبة الزكاة)، لوحة تحكم للمتبرعين، صفحات للحملات، مركز للمتطوعين، وإدارة للبرامج والفعاليات.',
      },
    ],
  },
  contact: {
    sectionLabel: '٠٥ / التواصل',
    sectionHeading: 'متاح لمشاريع العمل الحر. مستعد دائماً للحديث.',
    leadBefore: 'أسرع طريقة للوصول إليّ هي ',
    leadLink: 'عبر البريد الإلكتروني',
    leadAfter: '. أرد خلال يوم عمل واحد.',
    socialPart1: 'أو يمكنك إيجادي على ',
    linkedinLabel: 'لينكدإن',
    socialAnd: ' و ',
    upworkLabel: 'أب وورك',
    socialEnd: '.',
  },
  footer: {
    line: '© {year} اسامة ميرغني · دبي، الإمارات',
  },
  notFound: {
    label: '٤٠٤ / الصفحة غير موجودة',
    heading: 'يبدو أن هذا الرابط ضاع في الطريق.',
    bodyBeforePath: 'الصفحة ',
    bodyAfterPath:
      ' غير موجودة — أو كانت موجودة ثم أُعيد تنظيمها. لا بأس. عُد إلى الرئيسية، أو راسلني وسأرشدك إلى المكان الصحيح.',
    takeMeHome: 'العودة إلى الرئيسية',
    emailInstead: 'راسلني عبر البريد',
  },
};

export const translations: Record<Locale, Translation> = { en, ar };
