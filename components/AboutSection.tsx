"use client";

import Image from "next/image";

export default function AboutSection() {
    return (
        <section id="about" className="py-24 md:py-32 bg-white">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div className="space-y-8 order-2 lg:order-1">
                        <div className="space-y-4">
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#999999]">
                                Who I Am
                            </h2>
                            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#111111]">
                                Systems Engineering <br /> & Implementation.
                            </h3>
                        </div>

                        <div className="space-y-6 text-xl text-[#666666] leading-relaxed font-medium">
                            <p>
                                I build production-ready systems that integrate complex logic with scalable architecture. With a technical foundation in Computer Science, I focus on engineering solutions that handle real-world operational demands.
                            </p>
                            <p>
                                My experience ranges from architecting technical support platforms to orchestrating the operational infrastructure for large-scale international summits. I specialize in designing and implementing the backend logic and frontend interfaces that power resilient digital ecosystems.
                            </p>
                            <p>
                                I engineer full-stack applications using TypeScript, Python, and SQL, with a specific focus on integrating AI functionality into functional system architectures to automate workflows and enhance system intelligence.
                            </p>
                        </div>

                        <div className="pt-6 grid grid-cols-2 gap-8 border-t border-[#EEEEEE]">
                            <div>
                                <h4 className="text-[#111111] font-bold mb-2">Philosophy</h4>
                                <p className="text-sm text-[#999999]">Technical precision. Scalable logic. Operational resilience.</p>
                            </div>
                            <div>
                                <h4 className="text-[#111111] font-bold mb-2">Capabilities</h4>
                                <p className="text-sm text-[#999999]">Full-Stack Engineering, AI System Integration, Backend Architecture, Operational Infrastructure.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                        <div className="relative w-full aspect-[4/5] max-w-[550px]">
                            <Image
                                src="/images/img3.png"
                                alt="Dagim Aynadis"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
