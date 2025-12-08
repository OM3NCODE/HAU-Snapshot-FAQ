
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface BreathingItem {
    imageA: string;
    imageB: string;
    className?: string;
    delay?: number;
}

export default function BreathingItem({ imageA, imageB, className, delay = 0 }: BreathingItem) {
    const [currentImage, setCurrentImage] = useState(imageA);
    const [imageIndex, setImageIndex] = useState(0);
    const images = [imageA, imageB];

    useEffect(() => {
        const delayMs = delay * 1000;
        
        // Start the cycle after delay
        const startTimer = setTimeout(() => {
            const interval = setInterval(() => {
                setImageIndex((prev) => (prev + 1) % images.length);
            }, 4500); // Change image every 4.5 seconds (3s breathing + 1.5s transition)

            return () => clearInterval(interval);
        }, delayMs);

        return () => clearTimeout(startTimer);
    }, []);

    useEffect(() => {
        setCurrentImage(images[imageIndex]);
    }, [imageIndex, images]);

    return (
        <div className={`relative w-full h-full ${className}`}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentImage}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: 1,
                        scale: [1, 1.2, 1] // Breathing zoom effect
                    }}
                    transition={{
                        opacity: { duration: 0.6 },
                        scale: { duration: 3, ease: "easeInOut" }
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative w-full h-full"
                >
                    <Image
                        src={currentImage}
                        alt="Prize Item"
                        fill
                        sizes="(max-width: 768px) 150px, 220px"
                        className="object-contain drop-shadow-2xl"
                        unoptimized
                        priority
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}



