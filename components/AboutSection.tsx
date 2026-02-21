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
                                Bridging Management <br /> & Development.
                            </h3>
                        </div>

                        <div className="space-y-6 text-xl text-[#666666] leading-relaxed font-medium">
                            <p>
                                I am a systems-oriented professional with a strong foundation in Computer Science and a practical mastery of project orchestration and team leadership.
                            </p>
                            <p>
                                My experience spans from coordinating large-scale international cultural summits like Africa Celebrates 2025 to architecting technical support platforms for aspiring developers. I thrive when managing the "impossible" logistics of complex events and digital ecosystems.
                            </p>
                            <p>
                                Skilled in SQL, Python, C#, and full-stack development (MERN), I bring a technical lens to marketing and operational challenges, ensuring every system I build is both efficient and scalable.
                            </p>
                        </div>

                        <div className="pt-6 grid grid-cols-2 gap-8 border-t border-[#EEEEEE]">
                            <div>
                                <h4 className="text-[#111111] font-bold mb-2">Philosophy</h4>
                                <p className="text-sm text-[#999999]">Integrity in coordination. Scalability in execution. Clarity in communication.</p>
                            </div>
                            <div>
                                <h4 className="text-[#111111] font-bold mb-2">Capabilities</h4>
                                <p className="text-sm text-[#999999]">Operational Infrastructure, Team Leadership, Full-Stack Systems, Strategic Marketing.</p>
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
