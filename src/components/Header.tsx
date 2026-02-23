"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none">
            <div className="px-6 md:px-8 py-5 md:py-6 flex items-center justify-between pointer-events-auto">
                <div className="font-semibold text-xl md:text-2xl tracking-wide text-[#1A1A1A] relative z-50">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Divya Manjari</Link>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="#ingredients" className="text-sm uppercase tracking-widest text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">
                        Ingredients
                    </Link>
                    <Link href="#benefits" className="text-sm uppercase tracking-widest text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">
                        Benefits
                    </Link>
                    <Link href="#our-story" className="text-sm uppercase tracking-widest text-[#1A1A1A] hover:text-[#D4AF37] transition-colors">
                        Our Story
                    </Link>
                </nav>

                <div className="hidden md:block">
                    <button className="bg-[#1A1A1A] hover:bg-[#333333] transition-colors text-white px-6 py-2.5 rounded-full text-sm font-medium tracking-wide">
                        Shop Now
                    </button>
                </div>

                {/* Mobile Menu Icon */}
                <button
                    className="md:hidden flex flex-col items-center justify-center gap-1.5 p-2 relative z-50"
                    aria-label="Menu"
                    onClick={toggleMenu}
                >
                    <motion.div
                        animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                        className="w-6 h-[2px] bg-[#1A1A1A] rounded-full origin-center transition-all duration-300"
                    ></motion.div>
                    <motion.div
                        animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="w-6 h-[2px] bg-[#1A1A1A] rounded-full transition-all duration-300"
                    ></motion.div>
                    <motion.div
                        animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                        className="w-6 h-[2px] bg-[#1A1A1A] rounded-full origin-center transition-all duration-300"
                    ></motion.div>
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="fixed inset-0 top-0 left-0 w-full bg-[#f8f5ed] flex flex-col items-center justify-center gap-8 z-40 md:hidden overflow-hidden"
                    >
                        <Link
                            href="#ingredients"
                            onClick={toggleMenu}
                            className="text-2xl uppercase tracking-widest text-[#1A1A1A] hover:text-[#D4AF37] transition-colors"
                        >
                            Ingredients
                        </Link>
                        <Link
                            href="#benefits"
                            onClick={toggleMenu}
                            className="text-2xl uppercase tracking-widest text-[#1A1A1A] hover:text-[#D4AF37] transition-colors"
                        >
                            Benefits
                        </Link>
                        <Link
                            href="#our-story"
                            onClick={toggleMenu}
                            className="text-2xl uppercase tracking-widest text-[#1A1A1A] hover:text-[#D4AF37] transition-colors"
                        >
                            Our Story
                        </Link>
                        <button
                            className="mt-8 bg-[#1A1A1A] text-white px-8 py-4 rounded-full text-lg font-medium tracking-wide shadow-lg"
                            onClick={toggleMenu}
                        >
                            Shop Now
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
