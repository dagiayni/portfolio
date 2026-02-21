export interface ProgrammingProject {
    id: string;
    title: string;
    type: "Web App" | "Landing Page" | "Mobile App";
    description: string;
    images: {
        horizontal1: string;
        horizontal2: string;
        vertical: string;
    };
    technologies: string[];
}

export const programmingProjects: ProgrammingProject[] = [
    {
        id: "hotel-management-system",
        title: "Eco-Stay Management",
        type: "Web App",
        description: "Operational platform managing reservations, availability, and customer lifecycle for high-end hospitality.",
        images: {
            horizontal1: "/images/img7.png",
            horizontal2: "/images/img8.png",
            vertical: "/images/img6.png",
        },
        technologies: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"],
    },
    {
        id: "financial-dashboard",
        title: "Quantum Ledger",
        type: "Web App",
        description: "Real-time financial tracking and analytics engine for enterprise-level transaction monitoring.",
        images: {
            horizontal1: "/images/img8.png",
            horizontal2: "/images/img9.png",
            vertical: "/images/img6.png",
        },
        technologies: ["React", "D3.js", "Node.js", "Redis"],
    },
    {
        id: "logistics-vanguard",
        title: "Vanguard Logistics",
        type: "Web App",
        description: "Supply chain orchestration system facilitating cross-border operational synchronization.",
        images: {
            horizontal1: "/images/img9.png",
            horizontal2: "/images/img7.png",
            vertical: "/images/img6.png",
        },
        technologies: ["TypeScript", "Python", "Docker", "AWS"],
    },
    {
        id: "media-agency-landing",
        title: "Kendil Media",
        type: "Landing Page",
        description: "Bilingual immersive experience for a modern media agency, focusing on visual excellence.",
        images: {
            horizontal1: "/images/img2.png",
            horizontal2: "/images/img3.png",
            vertical: "/images/img6.png",
        },
        technologies: ["Next.js", "Framer Motion", "Tailwind"],
    },
    {
        id: "resilience-summit-page",
        title: "Resilience Summit",
        type: "Landing Page",
        description: "Dynamic event hub for international cultural summits, managing visibility and engagement.",
        images: {
            horizontal1: "/images/img3.png",
            horizontal2: "/images/img2.png",
            vertical: "/images/img6.png",
        },
        technologies: ["Next.js", "Tailwind", "CSS Grid"],
    },
    {
        id: "infrastructure-showcase",
        title: "Nexus Infrastructure",
        type: "Landing Page",
        description: "Detailed system architecture presentation for cloud orchestration platforms.",
        images: {
            horizontal1: "/images/img4.png",
            horizontal2: "/images/img5.png",
            vertical: "/images/img6.png",
        },
        technologies: ["Three.js", "Next.js", "Tailwind"],
    },
    {
        id: "ops-blueprint",
        title: "Operations Blueprint",
        type: "Landing Page",
        description: "Clean, architectural showcase for operational consultancy and digital transformation.",
        images: {
            horizontal1: "/images/img5.png",
            horizontal2: "/images/img4.png",
            vertical: "/images/img6.png",
        },
        technologies: ["HTML", "Vanilla CSS", "JavaScript"],
    },
    {
        id: "field-nexus-mobile",
        title: "Field Nexus",
        type: "Mobile App",
        description: "Secure connectivity and data collection tool for remote field operations.",
        images: {
            horizontal1: "/images/img6.png",
            horizontal2: "/images/img7.png",
            vertical: "/images/img1.png",
        },
        technologies: ["React Native", "Firebase", "SQLite"],
    }
];
