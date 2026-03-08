"use client";

import { motion } from "framer-motion";

const companies = [
    { name: "Africa Celebrates", id: 1 },
    { name: "Berchi.Inc", id: 2 },
    { name: "Abri-Minds", id: 3 },
    { name: "Sowirad Hotel", id: 4 },
    { name: "Next Change Makers", id: 5 },
    { name: "Click Market", id: 6 },
];

export default function LogoCloud() {
    // Duplicate the array to create a seamless loop
    const doubledCompanies = [...companies, ...companies];

    return (
        <section className="py-12 bg-white border-y border-[#EEEEEE] overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 mb-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#CCCCCC] block text-center">
                    Trusted by Organizations
                </span>
            </div>

            <div className="relative flex">
                <motion.div
                    className="flex space-x-12 md:space-x-24 items-center whitespace-nowrap"
                    animate={{
                        x: [0, -1000],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {doubledCompanies.map((company, index) => (
                        <div
                            key={`${company.id}-${index}`}
                            className="text-xl md:text-2xl font-bold tracking-tighter text-[#111111] opacity-30 hover:opacity-100 transition-opacity duration-300 cursor-default"
                        >
                            {company.name}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
