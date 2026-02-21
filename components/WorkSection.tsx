"use client";

import Image from "next/image";
import Link from "next/link";
import { Project, projects } from "@/data/projects";

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <div className="group block">
            <Link href={`/work/${project.id}`}>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F9F9F9] border border-[#EEEEEE] rounded-2xl transition-all duration-500">
                    <div className="absolute inset-0">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                    </div>
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/[0.02] transition-colors duration-500" />
                </div>

                <div className="mt-6 flex flex-col space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight text-[#111111] transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-lg text-[#666666] line-clamp-2 max-w-md">
                        {project.shortDescription}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                        {project.content.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="text-[10px] font-bold uppercase tracking-widest text-[#999999]">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default function WorkSection() {
    return (
        <section id="work" className="py-24 md:py-32 bg-white">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                <div className="mb-16 md:mb-24 flex flex-col space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#999999]">
                        Selected Work
                    </h2>
                    <p className="text-3xl md:text-5xl font-bold tracking-tighter text-[#111111] max-w-2xl">
                        Building the foundations for digital resilience and scale.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
