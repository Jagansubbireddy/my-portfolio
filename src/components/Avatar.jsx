// src/components/Avatar.jsx
import { motion } from "framer-motion";

/**
 * Avatar component
 * - `size`: number (px) or CSS string (e.g., "clamp(260px, 32vw, 460px)")
 * - `kenBurns`: enable slow zoom/pan loop
 * - `kenBurnsScale`: peak scale during Ken Burns (default 1.06)
 * - `kenBurnsDuration`: seconds for a full zoom cycle (default 12)
 * - `grayscaleOnIdle`: show grayscale until hover (default false)
 * - `hoverLift`: scale on hover (default 1.03)
 */
export default function Avatar({
    src = "/jagan.jpeg",
    size = "clamp(220px, 28vw, 380px)",
    alt = "Debjit",
    kenBurns = true,
    kenBurnsScale = 1.06,
    kenBurnsDuration = 12,
    grayscaleOnIdle = false,
    hoverLift = 1.03,
}) {
    const dim = typeof size === "number" ? `${size}px` : size;
    const ring = "from-indigo-500 via-sky-500 to-fuchsia-500";

    // Gentle Ken Burns: zoom a bit and drift, endlessly
    const kbAnimate = kenBurns
        ? { scale: [1, kenBurnsScale, 1], x: [0, 2, 0], y: [0, -2, 0] }
        : undefined;
    const kbTransition = kenBurns
        ? { duration: kenBurnsDuration, repeat: Infinity, ease: "easeInOut" }
        : undefined;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 15, delay: 0.2 }}
            className="relative mx-auto"
            style={{ width: dim, height: dim }}
        >
            {/* soft animated glow ring */}
            <motion.div
                aria-hidden
                className={`absolute -inset-1 rounded-full bg-gradient-to-tr ${ring} blur opacity-60`}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            {/* the photo */}
            <motion.img
                src={src}
                alt={alt}
                decoding="async"
                loading="eager"
                draggable="false"
                className={
                    "relative z-10 rounded-full object-cover w-full h-full shadow-xl ring-1 ring-white/20 " +
                    (grayscaleOnIdle ? "filter grayscale hover:grayscale-0 transition duration-500 " : "")
                }
                animate={kbAnimate}
                transition={kbTransition}
                whileHover={{ scale: hoverLift }}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.12}
            />

            {/* floating shadow */}
            <motion.div
                aria-hidden
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-2 w-2/3 rounded-full bg-black/30 blur-2xl"
                animate={{ opacity: [0.2, 0.35, 0.2], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            />
        </motion.div>
    );
}
