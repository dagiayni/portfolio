"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 border-t border-[#EEEEEE] bg-white text-[#666666]">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-sm font-medium">
                    © {currentYear} Dagim Aynadis. All rights reserved.
                </div>

                <div className="flex space-x-8 text-sm font-medium">
                    <a href="/#work" className="hover:text-[#111111] transition-colors">Work</a>
                    <a href="/#systems" className="hover:text-[#111111] transition-colors">Systems</a>
                    <a href="/about" className="hover:text-[#111111] transition-colors">About</a>
                    <a href="/#contact" className="hover:text-[#111111] transition-colors">Contact</a>
                </div>

                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#CCCCCC]">
                    Designed for Excellence
                </div>
            </div>
        </footer>
    );
}
