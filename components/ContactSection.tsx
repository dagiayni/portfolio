"use client";

import { ArrowUpRight, Mail, Linkedin, Send, Phone } from "lucide-react";
import Image from "next/image";

const links = [
    {
        name: "Email",
        href: "mailto:dagimaynadispro@gmail.com",
        label: "dagimaynadispro@gmail.com",
        icon: Mail
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com",
        label: "Dagim Aynadis",
        icon: Linkedin
    },
    {
        name: "Telegram",
        href: "https://t.me/dagimayni",
        label: "@dagimayni",
        icon: Send
    },
    {
        name: "Phone",
        href: "tel:+251989681490",
        label: "+251 989 681 490",
        icon: Phone
    }
];

export default function ContactSection() {
    return (
        <section id="contact" className="py-6 lg:py-0 bg-[#FFFFFF] border-t border-[#EEEEEE] overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:grid lg:grid-cols-2 justify-between items-center gap-6 lg:gap-16">
                    <div className="space-y-4 lg:space-y-6 w-full">
                        <div className="space-y-2">
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#999999]">
                                Reach Out
                            </h2>
                            <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[#111111] leading-[0.9]">
                                Let’s architect <br className="hidden md:block" /> your next system.
                            </p>
                        </div>

                        <div className="relative w-full aspect-square max-w-[300px] lg:max-w-[400px] mx-auto lg:mx-0">
                            <Image
                                src="/images/img4.png"
                                alt="Contact Portrait"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    <div className="w-full space-y-4">
                        <div className="space-y-0.5">
                            {links.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="group flex justify-between items-center border-b border-[#EEEEEE] py-4 transition-colors hover:border-[#111111] overflow-hidden"
                                >
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="shrink-0 w-10 h-10 rounded-xl bg-[#F9F9F9] border border-[#EEEEEE] flex items-center justify-center text-[#999999] group-hover:text-[#111111] transition-colors">
                                            <link.icon size={18} />
                                        </div>
                                        <div className="space-y-0.5 min-w-0">
                                            <span className="text-[9px] uppercase tracking-widest font-bold text-[#999999]">
                                                {link.name}
                                            </span>
                                            <p className="text-base md:text-lg font-bold text-[#111111] truncate">
                                                {link.label}
                                            </p>
                                        </div>
                                    </div>
                                    <ArrowUpRight className="shrink-0 text-[#CCCCCC] group-hover:text-[#111111] transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
