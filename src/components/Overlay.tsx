"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
    progress: MotionValue<number>;
}

export default function Overlay({ progress }: OverlayProps) {
    // Section 1: 0% to 20%
    const opacity1 = useTransform(progress, [0, 0.1, 0.15, 0.25], [1, 1, 0, 0]);
    const y1 = useTransform(progress, [0, 0.25], [0, -100]);

    // Section 2: 30% to 50%
    const opacity2 = useTransform(progress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
    const y2 = useTransform(progress, [0.2, 0.5], [100, -100]);

    // Section 3: 60% to 80%
    const opacity3 = useTransform(progress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]);
    const y3 = useTransform(progress, [0.5, 0.9], [100, -100]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center px-8 md:px-24">
            {/* SECTION 1 - Center */}
            {/* SECTION 1 - Refined Editorial Look */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
            >
                <div className="relative p-12">
                    {/* Subtle decorative elements */}
                    {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-[#D4AF37]/40" /> */}

                    {/* <h2 className="text-5xl md:text-7xl font-extralight tracking-tight text-[#1A1A1A]">
                        <span className="block font-serif italic text-[#D4AF37] mb-2">Divya Manjari</span>
                        <span className="block uppercase text-2xl md:text-3xl tracking-[0.2em] font-light opacity-80">
                            The Essence of Nature
                        </span>
                    </h2> */}

                    <h2 className="text-6xl md:text-8xl font-light tracking-tight text-[#1A1A1A] drop-shadow-sm">
                        <span className="block font-serif italic text-[#D4AF37] mb-2 drop-shadow-md">
                            Divya Manjari
                        </span>
                        <span className="block uppercase text-xl md:text-2xl tracking-[0.4em] font-medium opacity-90">
                            The Essence of Nature
                        </span>
                    </h2>

                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px bg-[#D4AF37]/40" />
                </div>
            </motion.div>

            {/* SECTION 2 - Left Aligned */}
            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute inset-0 flex flex-col items-start justify-center"
            >
                <div className="max-w-xl bg-white/30 backdrop-blur-md p-8 rounded-3xl ml-4 md:ml-12 border border-white/40 shadow-xl">
                    <h2 className="text-3xl md:text-5xl font-light text-[#1A1A1A] mb-4">
                        Ancient secrets <br /> for modern care.
                    </h2>
                    <p className="text-lg text-[#333] leading-relaxed">
                        A precise, time-tested blend of sweet almond, fresh coconut, and potent red onion extract, working in harmony to nourish your scalp.
                    </p>
                </div>
            </motion.div>

            {/* SECTION 3 - Right Aligned */}
            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="absolute inset-0 flex flex-col items-end justify-center"
            >
                <div className="max-w-xl bg-white/30 backdrop-blur-md p-8 rounded-3xl mr-4 md:mr-12 border border-white/40 shadow-xl flex flex-col items-end text-right">
                    <h2 className="text-3xl md:text-5xl font-light text-[#1A1A1A] mb-6">
                        Pure. Herbal. Transformative.
                    </h2>
                    <button className="pointer-events-auto bg-[#D4AF37] hover:bg-[#C5A028] transition-colors text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
                        Shop Now
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
