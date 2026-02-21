"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { programmingProjects } from "@/data/programmingProjects";
import { cn } from "@/lib/utils";

export default function ProgrammingShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (v) => {
            const step = 1 / programmingProjects.length;
            const index = Math.min(
                Math.floor(v / step),
                programmingProjects.length - 1
            );
            if (index !== activeIndex) {
                setActiveIndex(index);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, activeIndex]);

    return (
        <section ref={containerRef} className="relative bg-white border-t border-[#EEEEEE]">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16">

                    {/* Sticky Preview Panel */}
                    {/* On mobile: sticky below navbar, taking ~40vh height */}
                    {/* On desktop: sticky filling 100vh height */}
                    <div className="flex flex-col lg:col-span-7 sticky top-[60px] lg:top-0 h-[45vh] lg:h-screen justify-center items-center z-20 bg-white lg:bg-transparent order-1">
                        <div className="w-full h-full lg:max-h-[85vh] relative flex items-center justify-center p-2 lg:p-4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={programmingProjects[activeIndex].id}
                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 1.02 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="w-full h-full grid grid-cols-2 gap-3 lg:gap-4"
                                >
                                    {/* Vertical Image (Left) */}
                                    <div className="relative rounded-2xl overflow-hidden border border-[#EEEEEE] shadow-sm row-span-2 h-full">
                                        <Image
                                            src={programmingProjects[activeIndex].images.vertical}
                                            alt="Vertical view"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>

                                    {/* Horizontal Image 1 (Top Right) */}
                                    <div className="relative rounded-2xl overflow-hidden border border-[#EEEEEE] shadow-sm h-full">
                                        <Image
                                            src={programmingProjects[activeIndex].images.horizontal1}
                                            alt="Horizontal view 1"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>

                                    {/* Horizontal Image 2 (Bottom Right) */}
                                    <div className="relative rounded-2xl overflow-hidden border border-[#EEEEEE] shadow-sm h-full">
                                        <Image
                                            src={programmingProjects[activeIndex].images.horizontal2}
                                            alt="Horizontal view 2"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Active System Identifier Label */}
                            <div className="absolute bottom-4 right-6 hidden lg:flex items-center gap-2 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full border border-[#EEEEEE]">
                                <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                                <span className="text-[9px] uppercase tracking-[0.2em] text-black font-bold">
                                    SYS_BUILD_{programmingProjects[activeIndex].id}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Narrative List */}
                    <div className="lg:col-span-5 flex flex-col order-2 relative z-10 pt-[5vh] lg:pt-0">
                        {/* Introductory text that scrolls away on mobile */}
                        <div className="py-12 md:py-32 lg:min-h-[40vh] flex flex-col justify-center">
                            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#CCCCCC] mb-4">
                                Systems & Architecture
                            </h2>
                            <p className="text-3xl lg:text-5xl font-bold tracking-tighter text-[#111111] leading-[0.9]">
                                Immersive <br className="hidden lg:block" /> Engineering <br className="hidden lg:block" /> Showcase.
                            </p>
                        </div>

                        {programmingProjects.map((project, index) => (
                            <ProjectEntry
                                key={project.id}
                                project={project}
                                isActive={activeIndex === index}
                            />
                        ))}

                        {/* Bottom spacer for centering last project */}
                        <div className="h-[40vh] lg:h-[50vh]" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProjectEntry({ project, isActive }: { project: any; isActive: boolean }) {
    return (
        <div className="min-h-[50vh] lg:min-h-[70vh] flex flex-col justify-center py-20 border-l border-[#EEEEEE] pl-6 lg:pl-16 relative">
            {/* Active Highlighting for both mobile and desktop */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-[#111111] z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}
            </AnimatePresence>

            <div className="space-y-4">
                <span className={cn(
                    "text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold transition-colors duration-500",
                    isActive ? "text-[#111111]" : "text-[#CCCCCC]"
                )}>
                    {project.type}
                </span>

                <h3 className={cn(
                    "text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter transition-colors duration-500 leading-none",
                    isActive ? "text-[#111111]" : "text-[#EEEEEE]"
                )}>
                    {project.title}
                </h3>

                <p className={cn(
                    "text-sm md:text-lg lg:text-xl font-medium max-w-sm transition-colors duration-500 leading-relaxed",
                    isActive ? "text-[#666666]" : "text-transparent lg:text-[#EEEEEE]"
                )}>
                    {project.description}
                </p>

                {/* Tech Tags only visible when active */}
                <div className={cn(
                    "flex flex-wrap gap-2 pt-4 transition-all duration-500",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}>
                    {project.technologies.map((tech: string) => (
                        <span key={tech} className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-[#F9F9F9] border border-[#EEEEEE] rounded-full text-[#999999]">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
