"use client";

import { useParams, useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function ProjectPage() {
    const { id } = useParams();
    const router = useRouter();
    const project = projects.find((p) => p.id === id);

    useEffect(() => {
        if (!project) {
            router.push("/");
        }
        window.scrollTo(0, 0);
    }, [project, router]);

    if (!project) return null;

    return (
        <div className="pt-32 pb-24 bg-white min-h-screen">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link
                        href="/#work"
                        className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-[#999999] hover:text-[#111111] transition-colors gap-2"
                    >
                        <ArrowLeft size={16} /> Back to Work
                    </Link>
                </motion.div>

                <header className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#999999]">
                            {project.category}
                        </span>
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-[#111111]">
                            {project.title}
                        </h1>
                        <p className="text-2xl md:text-3xl text-[#666666] max-w-3xl leading-tight font-medium">
                            {project.shortDescription}
                        </p>
                    </motion.div>
                </header>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="aspect-[21/9] w-full bg-[#F9F9F9] border border-[#EEEEEE] rounded-3xl overflow-hidden mb-24 flex items-center justify-center"
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        width={1200}
                        height={600}
                        className="object-cover"
                    />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-24">
                        <section className="space-y-8">
                            <h2 className="text-2xl font-bold tracking-tight text-[#111111]">Overview</h2>
                            <p className="text-xl text-[#666666] leading-relaxed">
                                {project.content.overview}
                            </p>
                        </section>

                        <section className="space-y-8">
                            <h2 className="text-2xl font-bold tracking-tight text-[#111111]">The Problem</h2>
                            <p className="text-xl text-[#666666] leading-relaxed">
                                {project.content.problem}
                            </p>
                        </section>

                        <section className="space-y-8">
                            <h2 className="text-2xl font-bold tracking-tight text-[#111111]">The Solution</h2>
                            <p className="text-xl text-[#666666] leading-relaxed">
                                {project.content.solution}
                            </p>
                        </section>

                        <section className="space-y-8">
                            <h2 className="text-2xl font-bold tracking-tight text-[#111111]">Memories</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#EEEEEE]">
                                        <Image
                                            src={project.image}
                                            alt="Gallery image"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#EEEEEE]">
                                        <Image
                                            src="/images/img7.png"
                                            alt="Gallery image"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4 pt-12">
                                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#EEEEEE]">
                                        <Image
                                            src="/images/img8.png"
                                            alt="Gallery image"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#EEEEEE]">
                                        <Image
                                            src="/images/img9.png"
                                            alt="Gallery image"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className="lg:col-span-4 space-y-12">
                        <div className="p-8 border border-[#EEEEEE] rounded-2xl space-y-8 sticky top-32">
                            <div>
                                <h4 className="text-xs uppercase tracking-widest text-[#999999] font-bold mb-4">Keywords</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.content.technologies.map((tech) => (
                                        <span key={tech} className="px-3 py-1 bg-[#F9F9F9] border border-[#EEEEEE] rounded-full text-xs font-medium text-[#666666]">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs uppercase tracking-widest text-[#999999] font-bold mb-4">Impact</h4>
                                <p className="text-lg font-medium text-[#111111]">
                                    {project.content.impact}
                                </p>
                            </div>

                            <div className="pt-4">
                                <button className="w-full py-4 bg-[#111111] text-white rounded-full font-bold transition-transform active:scale-95">
                                    Launch Explorer
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
