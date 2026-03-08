export interface ProgrammingProject {
    id: string;
    title: string;
    type: string;
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
        id: "sowirad-hotel",
        title: "Sowirad Hotel Management",
        type: "WEB APP",
        description: "Operational platform managing reservations, room availability, guest records, and administrative workflows. Built to support real hotel operations with structured backend logic, database coordination, and integrated communication handling.",
        images: {
            horizontal1: "/images/sowirad2.png",
            horizontal2: "/images/sowirad3.png",
            vertical: "/images/sowirad1.png",
        },
        technologies: ["PHP", "C#", "MySQL", "Next.js", "Tailwind", "TypeScript"],
    },
    {
        id: "click-market",
        title: "Click Market Platform",
        type: "MOBILE & WEB SYSTEM",
        description: "Multi-platform commerce system including mobile application and administrative portal. Supports product management, user accounts, and centralized operational control through connected backend services and structured data handling.",
        images: {
            horizontal1: "/images/ECM2.png",
            horizontal2: "/images/ECM3.png",
            vertical: "/images/ECM1.png",
        },
        technologies: ["Flutter", "Next.js", "Tailwind", "TypeScript", "PHP", "MySQL", "SMTP"],
    },
    {
        id: "digital-menu",
        title: "Digital Menu Management",
        type: "WEB APP",
        description: "Dynamic menu platform allowing real-time updates, administrative control, and structured content delivery. Built with backend management tools enabling organizations to maintain and publish menu data efficiently.",
        images: {
            horizontal1: "/images/DM2.png",
            horizontal2: "/images/DM3.png",
            vertical: "/images/DM1.png",
        },
        technologies: ["PHP", "MySQL", "Next.js", "Tailwind", "TypeScript"],
    },
    {
        id: "event-registration",
        title: "Event Registration Platform",
        type: "WEB APP",
        description: "Registration system handling participant data collection, administrative visibility, and automated email coordination. Designed to support structured event workflows and user lifecycle management.",
        images: {
            horizontal1: "/images/ER2.png",
            horizontal2: "/images/ER3.png",
            vertical: "/images/ER1.png",
        },
        technologies: ["PHP", "MySQL", "Next.js", "Tailwind", "TypeScript", "SMTP"],
    },
    {
        id: "ncm-website",
        title: "Next Change Makers",
        type: "WEBSITE",
        description: "Public-facing organizational website built to communicate programs, structure, and activities. Designed and deployed for production use with focus on clarity, accessibility, and performance.",
        images: {
            horizontal1: "/images/NCM2.png",
            horizontal2: "/images/NCM3.png",
            vertical: "/images/NCM1.png",
        },
        technologies: ["Next.js", "HTML", "CSS", "TypeScript"],
    }
];
