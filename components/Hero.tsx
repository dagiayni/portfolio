"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="min-h-screen lg:h-screen flex flex-col justify-start lg:justify-center items-center pt-16 lg:pt-16 overflow-hidden bg-white">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-8 items-center h-full pb-12 lg:py-0">

                {/* Mobile Image (First on mobile) */}
                <div className="flex lg:hidden justify-center w-full">
                    <div className="relative w-full max-w-[360px] aspect-square">
                        <Image
                            src="/images/img1.png"
                            alt="Dagim Aynadis"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col space-y-4 md:space-y-6 text-center lg:text-left justify-center w-full">
                    <div>
                        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#999999]">
                            Dagim Aynadis
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-[1] lg:leading-[0.9] text-[#111111]">
                        I architect <br className="hidden lg:block" /> systems & teams.
                    </h1>

                    <p className="text-base md:text-xl text-[#666666] max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">
                        Bridging technical execution with strategic project management. Designing the operational infrastructure that powers large-scale events and digital platforms.
                    </p>

                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center lg:justify-start pt-4 lg:pt-2">
                        <Link
                            href="/#work"
                            className="px-8 py-4 bg-[#111111] text-white rounded-full font-bold text-center transition-transform hover:scale-105 active:scale-95 duration-200"
                        >
                            Selected Work
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 border border-[#EEEEEE] text-[#111111] rounded-full font-bold text-center hover:bg-[#F9F9F9] transition-all duration-200"
                        >
                            Contact Me
                        </Link>
                    </div>
                </div>

                {/* Desktop Image */}
                <div className="hidden lg:flex justify-end w-full h-full items-center">
                    <div className="relative w-full h-full max-w-[550px] max-h-[700px] aspect-[4/5]">
                        <Image
                            src="/images/img1.png"
                            alt="Dagim Aynadis"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
