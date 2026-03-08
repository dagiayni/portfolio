"use client";

import { Server, Database, Shield } from "lucide-react";

const systems = [
    {
        title: "AI & Logic Integration",
        description: "Implementing specialized AI components into existing application architectures to automate decision-making and enhance user interaction.",
        icon: Server,
        visual: "intelligence-module",
    },
    {
        title: "Full-Stack Architecture",
        description: "Engineering resilient backend structures and performant frontend systems, ensuring seamless data flow and component modularity.",
        icon: Database,
        visual: "system-architecture",
    },
    {
        title: "Operational Resilience",
        description: "Designing the technical infrastructure and logic required to support large-scale real-world usage and high-traffic event platforms.",
        icon: Shield,
        visual: "resilience-logic",
    }
];

export default function SystemsSection() {
    return (
        <section id="systems" className="py-24 md:py-32 bg-[#FFFFFF] border-t border-[#EEEEEE]">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                <div className="mb-24 flex flex-col items-center text-center">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#999999] mb-4">
                        Systems Thinking
                    </h2>
                    <p className="text-3xl md:text-5xl font-bold tracking-tighter text-[#111111] max-w-2xl">
                        Engineering logic, <br /> implementing scale.
                    </p>
                </div>

                <div className="space-y-32">
                    {systems.map((system, index) => (
                        <div
                            key={system.title}
                            className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                                }`}
                        >
                            <div className="flex-1 space-y-6">
                                <div className="w-12 h-12 bg-[#F9F9F9] border border-[#EEEEEE] rounded-xl flex items-center justify-center text-[#111111]">
                                    <system.icon size={20} />
                                </div>
                                <h3 className="text-3xl font-bold tracking-tight text-[#111111]">{system.title}</h3>
                                <p className="text-xl text-[#666666] leading-relaxed max-w-lg">
                                    {system.description}
                                </p>
                            </div>

                            <div className="flex-1 w-full">
                                <div className="aspect-[16/10] bg-[#F9F9F9] border border-[#EEEEEE] rounded-3xl relative overflow-hidden flex items-center justify-center group">
                                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,_#111111_1px,_transparent_1px)] bg-[length:24px_24px]" />
                                    <div className="relative text-xs font-mono text-[#CCCCCC] uppercase tracking-widest bg-white px-4 py-2 border border-[#EEEEEE] rounded-full">
                                        {system.visual}_module_active
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
