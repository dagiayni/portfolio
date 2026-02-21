"use client";

import { motion } from "framer-motion";

export default function CharacterIllustration({ type = "hero" }: { type?: "hero" | "about" }) {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
                className="relative w-4/5 h-4/5 rounded-[40px] bg-gradient-to-br from-[#F5F5F5] to-[#FFFFFF] border border-[#EEEEEE] shadow-sm overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Abstract "System" nodes inside the character area */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1/2 h-1/2 border border-[#EEEEEE] rounded-full animate-pulse flex items-center justify-center">
                        <div className="w-1/2 h-1/2 border border-[#EEEEEE] rounded-full animate-pulse" />
                    </div>
                </div>

                {/* Abstract human figure representation */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-[#111111] rounded-t-full opacity-5" />
                <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-1/3 h-1/3 border-2 border-[#111111] rounded-full opacity-10" />

                {/* Floating "Node" indicators */}
                <motion.div
                    className="absolute top-[20%] right-[20%] w-4 h-4 bg-[#111111] rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-[30%] left-[15%] w-3 h-3 border border-[#111111] rounded-full"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#CCCCCC] mt-48">
                    System_Builder_v1
                </span>
            </div>
        </div>
    );
}
