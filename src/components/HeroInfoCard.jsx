// src/components/HeroInfoCard.jsx
console.log("🔥 HeroInfoCard LOADED v1");

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/** Typewriter that replays on an interval, respecting reduced-motion */
function Typewriter({ text, speed = 28, loopEveryMs = 5000 }) {
    const [out, setOut] = useState("");
    const [tick, setTick] = useState(0);

    // Re-type on tick
    useEffect(() => {
        const reduce =
            typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduce) {
            setOut(text);
            return;
        }

        let i = 0;
        setOut("");
        const stepMs = Math.max(12, Math.floor(1000 / speed));
        const typer = setInterval(() => {
            i += 1;
            setOut(text.slice(0, i));
            if (i >= text.length) clearInterval(typer);
        }, stepMs);

        return () => clearInterval(typer);
    }, [text, speed, tick]);

    // Loop trigger every loopEveryMs
    useEffect(() => {
        const reduce =
            typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduce) return;
        const id = setInterval(() => setTick((t) => t + 1), loopEveryMs);
        return () => clearInterval(id);
    }, [loopEveryMs]);

    return <>{out}</>;
}

/** Subtle shimmer overlay */
function ShimmerOverlay() {
    return (
        <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
                background:
                    "radial-gradient(120px 120px at var(--mx, 20%) var(--my, 30%), rgba(255,255,255,0.12), transparent 60%)",
            }}
        />
    );
}

export default function HeroInfoCard({
    name = "Debjit",
    headline = "Building real-time AI for the physical world",
    // Tagline WITHOUT DeepStream/LLMs/GenAI
    tagline = "AI & Computer Vision Engineer focused on real-time vision & scalable systems.",
}) {
    const floatAnim = {
        y: [0, -2, 0],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="relative"
        >
            {/* Animated gradient ring / border */}
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-indigo-500 via-sky-500 to-fuchsia-500 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                {/* glow */}
                <div className="absolute inset-0 -z-10 blur-xl opacity-70 bg-gradient-to-r from-indigo-500 via-sky-500 to-fuchsia-500" />
                {/* Glass body */}
                <motion.div
                    animate={floatAnim}
                    className="relative rounded-2xl bg-slate-900/70 backdrop-blur-md ring-1 ring-white/10 text-white p-7 md:p-8"
                >
                    <ShimmerOverlay />

                    {/* Heading (keeps your original size) */}
                    <h1 className="text-5xl font-extrabold mb-3 drop-shadow-lg">
                        Hi, I’m{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-sky-300 to-fuchsia-300">
                            {name}
                        </span>{" "}
                        <span className="wave">👋</span>
                    </h1>

                    {/* Subtitle with looping typewriter */}
                    <p className="text-2xl font-semibold mb-2 drop-shadow">
                        <Typewriter text={headline} speed={28} loopEveryMs={5000} />
                    </p>

                    {/* Tagline (cleaned) */}
                    <p className="text-lg mb-6 opacity-90">{tagline}</p>

                    {/* Single CTA only */}
                    <motion.a
                        href="#projects"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold
                       bg-indigo-600 hover:bg-indigo-700 ring-1 ring-white/10 shadow-lg"
                    >
                        View My Projects
                    </motion.a>
                </motion.div>
            </div>
        </motion.div>
    );
}
