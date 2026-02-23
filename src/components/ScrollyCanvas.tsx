"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";

const TOTAL_FRAMES = 192; // frame_000 to frame_191
const FRAME_PREFIX = "/sequence/frame_";
const FRAME_SUFFIX = "_delay-0.042s.webp";

export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

    useEffect(() => {
        // Preload images
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            let loadedCount = 0;

            for (let i = 0; i < TOTAL_FRAMES; i++) {
                const img = new Image();
                // padStart ensures 000 format
                const frameStr = i.toString().padStart(3, "0");
                img.src = `${FRAME_PREFIX}${frameStr}${FRAME_SUFFIX}`;

                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === TOTAL_FRAMES) {
                        setImagesLoaded(true);
                    }
                };
                loadedImages.push(img);
            }
            setImages(loadedImages);
        };

        loadImages();
    }, []);

    useEffect(() => {
        // Initial draw once first image is loaded (or fallback)
        if (imagesLoaded && images[0]) {
            drawFrame(0);
        }
    }, [imagesLoaded, images]);

    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (imagesLoaded) {
            drawFrame(Math.round(latest));
        }
    });

    const drawFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images[index];
        if (!img) return;

        // Handle responsive object-fit: cover logic
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let renderWidth = canvas.width;
        let renderHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        // Cover logic
        if (canvasRatio > imgRatio) {
            // Canvas is wider than image
            renderHeight = canvas.width / imgRatio;
            offsetY = (canvas.height - renderHeight) / 2;
        } else {
            // Canvas is taller than image
            renderWidth = canvas.height * imgRatio;
            offsetX = (canvas.width - renderWidth) / 2;
        }

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw image maintaining cover aspect ratio
        ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    };

    useEffect(() => {
        // Resize canvas to match window size properly
        const resizeCanvas = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Redraw current frame
                if (imagesLoaded) {
                    drawFrame(Math.round(frameIndex.get()));
                }
            }
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas(); // initial setup

        return () => window.removeEventListener("resize", resizeCanvas);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imagesLoaded, frameIndex]);

    return (
        <div ref={containerRef} className="relative h-[500vh] w-full bg-[#FDFBF7]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Loading state */}
                {!imagesLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#FDFBF7] z-50">
                        <span className="text-sm font-medium uppercase tracking-widest text-[#1A1A1A] animate-pulse">
                            Loading Experience...
                        </span>
                    </div>
                )}

                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <Overlay progress={scrollYProgress} />
            </div>
        </div>
    );
}
