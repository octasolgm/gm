export const profile = {
  name: "Ghulam Muhammad",
  shortName: "GM Rehman",
  title: "Senior Full Stack Developer",
  tagline: ".NET · Angular · Next.js · NestJS · AI Integration",
  location: "Islamabad, Pakistan",
  email: "soomrogm@gmail.com",
  phone: "+92-331-3543210",
  phoneLink: "923313543210",
  linkedin: "https://www.linkedin.com/in/gmrehman",
  github: "https://github.com/GMRehman",
  summary:
    "Full stack developer with 5+ years building enterprise web apps, desktop clients, and AI-powered platforms. Currently leading frontend development at Jumppl while delivering robust .NET and Node.js backends, with a focus on clean architecture and user-centric design.",
  objective:
    "Seeking a progressive environment where I can apply full stack expertise in Angular, Next.js, .NET, and AI to build scalable products that create measurable impact.",
  cvAvailable: true,
};

export const experiences = [
  {
    id: "jumppl",
    company: "Jumppl",
    role: "Senior Frontend Developer",
    period: "Apr 2021 – Present",
    location: "Islamabad, Pakistan",
    type: "Full-time",
    highlights: [
      "Lead Angular development for Jumppl digital workplace desktop and web applications.",
      "Build and maintain .NET backend APIs supporting team collaboration features.",
      "Integrate AI capabilities into product workflows for enhanced productivity.",
      "Collaborate with cross-functional teams on Nx monorepo architecture.",
    ],
    tech: ["Angular", "TypeScript", "RxJS", ".NET", "AI", "Nx"],
  },
  {
    id: "octasol-fs",
    company: "OctaSol Technologies",
    url: "https://octasol.com/",
    role: "Full Stack Developer",
    period: "Jun 2021 – Feb 2024",
    location: "Islamabad, Pakistan",
    type: "Full-time",
    highlights: [
      "Delivered end-to-end web solutions using ASP.NET Core and modern JavaScript frameworks.",
      "Designed REST APIs and integrated third-party services for client projects.",
      "Managed requirements analysis, testing, and deployment cycles.",
    ],
    tech: ["ASP.NET Core", "Angular", "SQL Server", "REST APIs"],
  },
  {
    id: "octasol-net",
    company: "OctaSol Technologies",
    url: "https://octasol.com/",
    role: ".NET Developer",
    period: "Apr 2020 – Jun 2021",
    location: "Islamabad, Pakistan",
    type: "Full-time",
    highlights: [
      "Developed and maintained enterprise .NET applications for POS, RMS, SDMS, and payroll products.",
      "Implemented business logic, reporting, and database layers with SQL Server.",
      "Participated in code reviews and agile sprint planning.",
    ],
    tech: [".NET", "C#", "SQL Server", "Crystal Reports"],
  },
  {
    id: "octasol-se",
    company: "OctaSol Technologies",
    url: "https://octasol.com/",
    role: "Software Engineer",
    period: "Mar 2017 – Feb 2019",
    location: "Islamabad, Pakistan",
    type: "Full-time",
    highlights: [
      "Built desktop and web modules for OctaSol ERP suite (POS, restaurant management, and payroll systems).",
      "Developed sales, inventory, and accounts features using .NET, WinForms, and SQL Server.",
      "Supported client customization, reporting, and deployment for enterprise business solutions.",
    ],
    tech: ["C#", "WinForms", "ASP.NET", "SQL Server"],
  },
];

export const education = [
  {
    degree: "BS Computer Science",
    institution: "PMAS Arid Agriculture University",
    location: "Rawalpindi, Pakistan",
    period: "2013 – 2017",
    grade: "CGPA 3.43 / 4.0",
    field: "Computer Software Engineering",
  },
  {
    degree: "D.Com (Diploma in Commerce)",
    institution: "Govt. Institute of Business & Commercial Education",
    location: "Karachi, Pakistan",
    period: "2012",
    grade: "",
    field: "Commerce",
  },
  {
    degree: "Matriculation",
    institution: "Sunrise Education Academy",
    location: "Karachi, Pakistan",
    period: "2010",
    grade: "",
    field: "Science",
  },
];

export const skillCategories = [
  {
    category: "Frontend",
    skills: [
      { name: "Angular", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 92 },
      { name: "RxJS", level: 88 },
      { name: "Tailwind CSS", level: 85 },
      { name: "React", level: 80 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "ASP.NET Core", level: 92 },
      { name: "NestJS", level: 88 },
      { name: "Node.js", level: 85 },
      { name: "REST APIs", level: 95 },
      { name: "C#", level: 93 },
    ],
  },
  {
    category: "Database & Cloud",
    skills: [
      { name: "SQL Server", level: 90 },
      { name: "MySQL", level: 88 },
      { name: "PostgreSQL", level: 82 },
      { name: "Prisma ORM", level: 85 },
      { name: "Supabase", level: 78 },
    ],
  },
  {
    category: "AI & Tools",
    skills: [
      { name: "AI Integration", level: 85 },
      { name: "OpenAI / LLM APIs", level: 82 },
      { name: "Git & GitHub", level: 92 },
      { name: "Docker", level: 75 },
      { name: "Nx / Turborepo", level: 88 },
      { name: "Postman", level: 90 },
    ],
  },
];

export const projects = [
  {
    id: "bcp",
    title: "BCP – Bank Compliance Platform",
    category: "Personal",
    featured: true,
    description:
      "AI-powered regulatory compliance platform for banks. Uploads regulatory and internal documents, runs AI gap analysis, and generates Compliant / Partial / Non-Compliant reports with corrective action tracking and deadline alerts.",
    tech: ["Next.js", "NestJS", "Landing AI", "Supabase", "React Native", "Monorepo"],
    github: "https://github.com/octasolgm/BCP",
    highlights: ["AI document comparison", "Compliance dashboard", "Mobile app"],
  },
  {
    id: "thoughtweaver",
    title: "ThoughtWeaver",
    category: "Personal",
    featured: true,
    description:
      "AI-powered ideation platform with multi-assistant brainstorming, structured creative workflows, admin portal, and team collaboration. Full Turborepo monorepo with Next.js, NestJS, and Supabase.",
    tech: ["Next.js 14", "NestJS", "Supabase", "Vercel AI SDK", "Turborepo", "Playwright"],
    github: "https://github.com/octasolgm/thoughtweaver",
    highlights: ["Multi-AI perspectives", "Admin portal", "Full type-safe monorepo"],
  },
  {
    id: "coding-agent",
    title: "Coding Agent Platform",
    category: "Personal",
    featured: true,
    description:
      "AI coding agent platform for intelligent development assistance — agent templates, orchestration, and automated coding workflows built for the ThoughtWeaver ecosystem.",
    tech: ["Next.js", "NestJS", "AI Agents", "TypeScript", "LLM APIs"],
    github: "https://github.com/thoughtweaverdev/coding-agent-platform",
    highlights: ["Agent templates", "AI orchestration", "Dev automation"],
  },
  {
    id: "handypro-fe",
    title: "HandyPro – Frontend",
    category: "Personal",
    featured: true,
    description:
      "Angular 20 service-provider platform with public website, provider dashboards, admin panel, Google Maps, booking calendar, and role-based authentication.",
    tech: ["Angular 20", "Tailwind CSS", "Google Maps", "FullCalendar", "RxJS"],
    github: "https://github.com/octasolgm/HandyManFrontend",
    highlights: ["Provider dashboards", "Booking & maps", "Admin panel"],
  },
  {
    id: "handypro-be",
    title: "HandyPro – Backend",
    category: "Personal",
    featured: false,
    description:
      "Backend API for the HandyPro service marketplace — user management, service listings, bookings, and admin operations.",
    tech: [".NET", "ASP.NET Core", "REST API", "SQL Server"],
    github: "https://github.com/octasolgm/HandyManBackend",
    highlights: ["REST APIs", "Auth & roles", "Service booking"],
  },
  {
    id: "jumppl-desktop",
    title: "Jumppl Desktop Client",
    category: "Professional",
    featured: true,
    description:
      "Electron-based desktop application for Jumppl digital workplace — team chat, tasks, files, time tracking, and real-time collaboration used by remote teams.",
    tech: ["Angular", "Electron", "TypeScript", "RxJS", ".NET APIs"],
    github: null,
    highlights: ["Cross-platform desktop", "Real-time collaboration", "Offline-capable UI"],
  },
  {
    id: "jumppl-ai",
    title: "Jumppl AI Orchestration Service",
    category: "Professional",
    featured: true,
    description:
      "AI orchestration backend for Jumppl — intent classification, function calling across 50+ APIs, conversation state management, and cost-optimized LLM integration for project management queries.",
    tech: [".NET", "OpenAI", "Function Calling", "C#", "AI Agents"],
    github: null,
    highlights: ["Intent classification", "API function registry", "Conversation context"],
  },
  {
    id: "jumppl-workspace",
    title: "Jumppl Nx Monorepo",
    category: "Professional",
    featured: false,
    description:
      "Nx-powered monorepo housing Jumppl libraries, shared modules, and multi-app build system for scalable team collaboration products.",
    tech: ["Nx", "Angular", "TypeScript", "Monorepo"],
    github: null,
    highlights: ["Shared libraries", "Multi-app builds", "Nx devtools"],
  },
  {
    id: "jumppl-website",
    title: "Jumppl Marketing Website",
    category: "Professional",
    featured: false,
    description:
      "Public-facing Jumppl website and landing pages showcasing the digital workplace product, features, and onboarding flows.",
    tech: [".NET", "ASP.NET", "HTML/CSS", "JavaScript"],
    github: null,
    highlights: ["Product marketing", "Landing pages", "CMS integration"],
  },
  {
    id: "tour-mgmt",
    title: "Tour Package Management (Elaf Travel)",
    category: "Personal",
    featured: false,
    description:
      "Full-stack tour and travel package management — .NET 8 Web API backend with booking, package management, and admin frontend.",
    tech: [".NET 8", "ASP.NET Core", "SQL Server", "Angular"],
    github: "https://github.com/GMRehman/TourPackageMgm-BackEnd",
    highlights: ["Tour booking", "Travel services API", "Admin management"],
  },
  {
    id: "school-mgmt",
    title: "School Management System",
    category: "Early Career",
    featured: false,
    description:
      "Desktop ERP for schools — student/staff registration, fees, attendance, exams, timetable, SMS alerts, smart cards, library, and reporting modules.",
    tech: ["C#", "WinForms", "SQL Server", "Crystal Reports", "SMS Gateway"],
    github: null,
    highlights: ["Fees & attendance", "SMS notifications", "Exam & library modules"],
  },
  {
    id: "wifi-attendance",
    title: "Wi-Fi Auto Attendance System",
    category: "Early Career",
    featured: false,
    description:
      "Automatic attendance marking via Wi-Fi MAC address detection — marks employee attendance on office entry/exit without manual app interaction.",
    tech: ["C#", ".NET", "Wi-Fi APIs", "SQL Server"],
    github: "https://fiverr.com/gmrehman/wifi-auto-attendance-system",
    highlights: ["MAC-based detection", "Paperless attendance", "Auto mark in/out"],
  },
  {
    id: "hrms",
    title: "HRMS & Inventory Suite",
    category: "Early Career",
    featured: false,
    description:
      "Enterprise desktop suite: HRMS (payroll, loans, attendance, performance), Inventory Management (stock alerts, sales reports), and Team Management with QA test case execution.",
    tech: ["C#", "WinForms", "SQL Server", "Crystal Reports"],
    github: null,
    highlights: ["Payroll & HR", "Inventory alerts", "QA test management"],
  },
  {
    id: "diet-plan",
    title: "Disease-Based Diet Plan",
    category: "Early Career",
    featured: false,
    description:
      "Web application for creating, viewing, and sharing disease-specific diet plans with suggested meal plans based on medical conditions.",
    tech: ["ASP.NET MVC5", "C#", "Bootstrap", "jQuery", "SQL Server"],
    github: null,
    highlights: ["Disease-based plans", "Share diet plans", "User profiles"],
  },
  {
    id: "lisp-compiler",
    title: "Common Lisp Compiler (iOS FYP)",
    category: "Early Career",
    featured: false,
    description:
      "Final year project — iOS app for learning and practicing Common Lisp with save/load files, parenthesis matching, and auto-indent in the classroom.",
    tech: ["Objective-C", "C", "Lisp", "iOS"],
    github: null,
    highlights: ["Mobile compiler", "Syntax highlighting", "Auto-indent"],
  },
  {
    id: "math-solver",
    title: "Math Equation Solver",
    category: "Early Career",
    featured: false,
    description:
      "Step-by-step equation solver supporting linear, rational, polynomial, quadratic, and exponential equations with visual solution walkthrough.",
    tech: ["Visual C++", "C++", "Algorithms"],
    github: null,
    highlights: ["Step-by-step solving", "Multiple equation types", "Visual output"],
  },
  {
    id: "software-licensing",
    title: "Software Licensing & Anti-Piracy",
    category: "Early Career",
    featured: false,
    description:
      "Desktop software protection system — license expiry control, machine binding, backup/restore, and preventing unauthorized copies of commercial software.",
    tech: ["C#", "WinForms", "Hardware ID", "SQL Server"],
    github: null,
    highlights: ["License enforcement", "Machine binding", "Backup & restore"],
  },
  {
    id: "thoughtweaver-figma",
    title: "ThoughtWeaver UI/UX (Figma)",
    category: "Personal",
    featured: false,
    description:
      "Complete Figma design system and UI mockups for the ThoughtWeaver platform — ideation flows, multi-AI chat interface, and admin dashboard designs.",
    tech: ["Figma", "UI/UX", "Design System", "Prototyping"],
    github: "https://github.com/octasolgm/thoughtweaver-figma",
    highlights: ["Design system", "User flows", "Interactive prototypes"],
  },
];

export const responsibilities = [
  "Analyzing client requirements and translating them into technical specifications",
  "Full stack development — frontend, backend APIs, and database design",
  "Writing, testing, and maintaining production-grade code",
  "AI integration and automation for business process optimization",
  "Cross-functional collaboration with PMs, designers, and QA teams",
  "Code reviews, defect correction, and continuous improvement",
];
