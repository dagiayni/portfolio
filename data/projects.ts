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
        id: "africa-celebrates-2025",
        title: "Africa Celebrates 2025",
        shortDescription: "Orchestrating the operational infrastructure for Africa's largest Pan-African cultural and fashion summit.",
        image: "/images/img2.png",
        category: "Project Management",
        content: {
            overview: "Leading the coordination and delivery of a massive international summit, focusing on multi-continental partnerships and logistical excellence.",
            problem: "Coordinating activities across multiple teams, partners, and international boundaries required a robust management system to prevent fragmentation.",
            solution: "Implemented an integrated project management framework to oversee planning, communication, and execution of concurrent event tracks.",
            architecture: "Hub-and-spoke coordination model with centralized moderation and influencer engagement pipelines.",
            impact: "Successfully managed high-profile representation and ensured a smooth event flow for thousands of participants.",
            technologies: ["Team Leadership", "Logistics", "Operational Flow", "Stakeholder Management"],
        },
    },
    {
        id: "tech-mentorship-system",
        title: "Unity Tech Support Platform",
        shortDescription: "A self-initiated educational infrastructure providing technical guidance and programming fundamentals.",
        image: "/images/img3.png",
        category: "Systems Design",
        content: {
            overview: "Designed and launched a platform at Unity University to support students in mastering programming basics and internet fundamentals.",
            problem: "Computer science students often lacked accessible, structured guidance in basic programming and web development beyond standard lectures.",
            solution: "Created a peer-based technical support system that provides modular learning and troubleshooting for tech students.",
            architecture: "Structured mentorship nodes combined with practical programming modules.",
            impact: "Improved fundamental coding proficiency for cross-disciplinary tech students at Unity University.",
            technologies: ["Education Tech", "Project Design", "C++", "Python", "Technical Support"],
        },
    },
    {
        id: "bertat-generation-project",
        title: "Bertat Generation (Berchi.Inc)",
        shortDescription: "Scaling social impact through managed digital campaigns and large-scale event coordination.",
        image: "/images/img4.png",
        category: "Operational Systems",
        content: {
            overview: "Program coordination for the Bertat Generation Project, focusing on youth engagement and large-scale university events.",
            problem: "Engaging young audiences effectively required a synchronized approach between digital promotion and physical event execution.",
            solution: "Developed an integrated social-to-event pipeline that managed campaigns targeting over 500 participants per university.",
            architecture: "Synchronized digital campaign management coupled with distributed event execution units.",
            impact: "Successfully coordinated events with 500+ participants across multiple university locations.",
            technologies: ["Program Coordination", "Campaign Logic", "Event Scale", "Youth Engagement"],
        },
    },
    {
        id: "abri-minds-digital-ecosystem",
        title: "Abri-Minds Digital Branding",
        shortDescription: "Designing resilient brand systems and social media management frameworks for professional consultancy.",
        image: "/images/img5.png",
        category: "Marketing Architecture",
        content: {
            overview: "Managed the digital presence and brand visibility for Abri-Minds Training and Consultancy.",
            problem: "Need for a consistent, professional digital image that communicated the value of consultancy services to a diverse audience.",
            solution: "Architected a content strategy and social media management system to promote services and monitor student engagement.",
            architecture: "Modular content creation system with performance reporting and feedback loops.",
            impact: "Significantly increased brand visibility and supported customer communication through structured digital channels.",
            technologies: ["Social Media Management", "Content Strategy", "Brand Integrity", "Performance Metrics"],
        },
    },
];
