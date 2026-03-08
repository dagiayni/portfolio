export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    image: string;
    category: string;
    content: {
        overview: string;
        problem: string;
        solution: string;
        architecture: string;
        impact: string;
        technologies: string[];
    };
}

export const projects: Project[] = [
    {
        id: "sowirad-hotel",
        title: "Sowirad Hotel Management",
        shortDescription: "Operational platform managing reservations, room availability, guest records, and administrative workflows for hotel operations.",
        image: "/images/img7.png",
        category: "WEB APP",
        content: {
            overview: "Built to support real hotel operations with structured backend logic, database coordination, and integrated communication handling.",
            problem: "Inefficient manual tracking of reservations and room availability leading to operational friction and guest record fragmentation.",
            solution: "Designed and implemented a full-stack management system with centralized data handling for structured administrative workflows.",
            architecture: "Backend-heavy architecture with structured database coordination and real-time availability logic.",
            impact: "Streamlined reservation lifecycle and established a reliable record-keeping system for hotel operations.",
            technologies: ["PHP", "C#", "MySQL", "Next.js", "Tailwind", "TypeScript"],
        },
    },
    {
        id: "click-market",
        title: "Click Market Platform",
        shortDescription: "Multi-platform commerce system connecting mobile application and administrative portal for centralized operational control.",
        image: "/images/img8.png",
        category: "MOBILE & WEB SYSTEM",
        content: {
            overview: "Supports product management, user accounts, and centralized operational control through connected backend services and structured data handling.",
            problem: "Lack of a unified commerce system for multi-platform coordination between mobile users and administrative operators.",
            solution: "Engineered a cross-platform commerce ecosystem connecting a Flutter mobile app with a Next.js admin portal through a centralized backend.",
            architecture: "Distributed system architecture with connected backend services and synchronized data handling across mobile and web interfaces.",
            impact: "Established centralized operational control and enabled seamless product management for commerce operations.",
            technologies: ["Flutter", "Next.js", "Tailwind", "TypeScript", "PHP", "MySQL", "SMTP"],
        },
    },
    {
        id: "digital-menu",
        title: "Digital Menu Management",
        shortDescription: "Dynamic menu platform allowing real-time updates, administrative control, and structured content delivery.",
        image: "/images/img9.png",
        category: "WEB APP",
        content: {
            overview: "Built with backend management tools enabling organizations to maintain and publish menu data efficiently.",
            problem: "High latency and lack of administrative control in publishing and updating menu content across digital channels.",
            solution: "Architected a dynamic platform for real-time menu updates and structured content delivery.",
            architecture: "Modular content management system with integrated administrative tools and efficient publication logic.",
            impact: "Enabled organizations to maintain and publish menu data with high frequency and precision.",
            technologies: ["PHP", "MySQL", "Next.js", "Tailwind", "TypeScript"],
        },
    },
    {
        id: "event-registration",
        title: "Event Registration Platform",
        shortDescription: "Registration system handling participant data collection, administrative visibility, and automated email coordination.",
        image: "/images/img2.png",
        category: "WEB APP",
        content: {
            overview: "Designed to support structured event workflows and user lifecycle management.",
            problem: "Managing large-scale participant data collection and lifecycle communication without a structured technical framework.",
            solution: "Implemented an automated registration system with integrated email coordination and administrative visibility.",
            architecture: "Lifecycle-oriented workflow system with automated SMTP integration and structured data capture.",
            impact: "Improved visibility into participant data and automated critical touchpoints in the event registration process.",
            technologies: ["PHP", "MySQL", "Next.js", "Tailwind", "TypeScript", "SMTP"],
        },
    }
];
