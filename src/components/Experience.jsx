// src/components/Experience.jsx
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

/* ---------- Micro components ---------- */

function Chip({ children }) {
    return (
        <motion.span
            whileHover={{ scale: 1.06 }}
            className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700
                 dark:bg-indigo-900/40 dark:text-indigo-200 border border-indigo-200/60 dark:border-indigo-800/60"
        >
            {children}
        </motion.span>
    );
}

/* One role card (alternates left/right on md+) */
function RoleCard({ role, side = "left", prefersReduced }) {
    const { title, company, period, current, bullets, tech = [], links = [] } = role;

    const fromDir = side === "left" ? -28 : 28;

    return (
        <motion.li
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: fromDir }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            className={
                "relative md:grid md:grid-cols-1 " +
                (side === "left" ? "md:col-start-1 md:pr-12" : "md:col-start-2 md:pl-12")
            }
        >
            {/* Center node on the rail (desktop) */}
            <span
                className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full
                   bg-gradient-to-tr from-indigo-500 via-sky-400 to-fuchsia-500 shadow
                   ring-2 ring-white dark:ring-slate-900"
            />
            {/* Pulsing halo if current (desktop) */}
            {current && !prefersReduced && (
                <motion.span
                    aria-hidden
                    className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full"
                    animate={{
                        boxShadow: [
                            "0 0 0 0 rgba(99,102,241,0.45)",
                            "0 0 0 14px rgba(99,102,241,0)",
                        ],
                    }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
            )}

            {/* Card with animated gradient border + glassy body */}
            <motion.div
                whileHover={{ y: -2 }}
                className="relative group"
            >
                {/* gradient border glow */}
                <motion.div
                    aria-hidden
                    className="absolute -inset-[1px] rounded-2xl
                     bg-gradient-to-tr from-indigo-500/45 via-sky-400/35 to-fuchsia-500/45
                     opacity-70 blur-md transition-opacity group-hover:opacity-100"
                    animate={prefersReduced ? {} : { rotate: [0, 1, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />

                {/* inner card */}
                <div className="relative rounded-2xl border border-white/30 dark:border-white/10
                        bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl shadow-xl p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="text-lg font-semibold">
                            {title}{" "}
                            <span className="text-slate-500 dark:text-slate-300">· {company}</span>
                        </h4>
                        <div className="flex items-center gap-2">
                            {current && (
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full
                                 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                                    Now
                                </span>
                            )}
                            <span className="text-sm text-slate-500 dark:text-slate-400">{period}</span>
                        </div>
                    </div>

                    <ul className="mt-3 list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-200">
                        {bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                        ))}
                    </ul>

                    {!!tech.length && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {tech.map((t) => (
                                <Chip key={t}>{t}</Chip>
                            ))}
                        </div>
                    )}

                    {!!links.length && (
                        <div className="mt-4 flex flex-wrap gap-3">
                            {links.map(({ label, href }) => (
                                <a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm text-indigo-600 dark:text-indigo-300 hover:underline underline-offset-4 inline-flex items-center gap-1"
                                >
                                    {label} <FaExternalLinkAlt className="inline-block opacity-80" />
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.li>
    );
}

/* ---------- Main section ---------- */

export default function Experience() {
    const prefersReduced = useReducedMotion();
    const sectionRef = useRef(null);

    // Scroll progress bar across the section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 0.8", "end 0.2"], // start filling when section is near viewport
    });
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const roles = [
        {
            title: "Senior Software Engineer (AI/CV)",
            company: "Kloudspot · Bangalore, India",
            period: "Mar 2025 — Present",
            current: true,
            bullets: [
                "Built a sync-camera manager: hot-add/remove/modify cameras without restarting containers—zero downtime across the fleet.",
                "Designed and integrated an action-recognition pipeline with DeepStream for reliable, real-time events.",
                "Enabled per-camera tracker configs while batching streams together via DeepStream sub-batch for stability and utilization.",
                "Benchmarked end-to-end use cases with memory-leak detection and component-level profiling to harden reliability.",
            ],
            tech: [
                "DeepStream",
                "TensorRT",
                "GStreamer",
                "Action Recognition",
                "Tracking",
                "Python",
                "Docker",
                "Kubernetes",
            ],
            links: [],
        },
        {
            title: "Software Engineer (AI/CV)",
            company: "Kloudspot · Bangalore, India",
            period: "Dec 2022 — Feb 2025",
            bullets: [
                "Streamlined analytics & delivery with end-to-end DeepStream pipelines for large camera fleets.",
                "Built crowd monitoring, vehicle tracking, and parking workflows; tuned per-camera trackers for stability across diverse scenes.",
                "Shipped classification with TensorRT and multiple YOLO families; integrated SAM & Grounding DINO for dynamic region masking.",
                "Designed an MCT service with global ID continuity across cameras; applied CLIP for semantic retrieval.",
            ],
            tech: ["DeepStream", "TensorRT", "YOLO", "SAM", "Grounding DINO", "CLIP", "Python", "Docker"],
            links: [],
        },
        {
            title: "Freelance CV Engineer",
            company: "INDORAMA · TATA STEEL · NKDA (Kolkata, India)",
            period: "Sep 2022 — Dec 2022",
            bullets: [
                "Implemented conveyor-belt monitoring & predictive maintenance to reduce unplanned downtime.",
                "Built PPE-compliance detection with real-time alerting to improve on-site safety adherence.",
                "Deployed plastic-bag detection to support sustainability initiatives at point of use.",
            ],
            tech: ["Computer Vision", "Detection", "Edge Deployment", "Python"],
            links: [],
        },
        {
            title: "Software Engineer (CV) · Client: BYJU’S",
            company: "AllGoVision · Bangalore, India",
            period: "Mar 2022 — Sep 2022",
            bullets: [
                "Developed engagement models using head-pose & gaze to analyze student attention in real time.",
                "Optimized PyTorch models via ONNX→TensorRT for faster inference with minimal accuracy loss.",
            ],
            tech: ["PyTorch", "ONNX", "TensorRT", "Real-time CV"],
            links: [],
        },
    ];

    const [showAll] = useState(true); // keep full timeline visible; toggleable if you want

    const visible = showAll ? roles : roles.slice(0, 2);

    return (
        <section id="experience" ref={sectionRef} className="py-24 px-4">
            <div className="mx-auto max-w-6xl">
                <header className="mb-10">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <h3 className="text-3xl font-bold">Experience</h3>
                            <p className="mt-2 text-slate-600 dark:text-slate-300">
                                Real-time systems, production reliability, and clear outcomes.
                            </p>
                        </div>
                    </div>

                    {/* sticky-ish scroll progress (fills as you traverse the section) */}
                    <div className="mt-5 h-1 rounded-full bg-slate-200/60 dark:bg-white/10 overflow-hidden">
                        <motion.div
                            style={{ scaleX, transformOrigin: "0% 50%" }}
                            className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-fuchsia-500"
                        />
                    </div>
                </header>

                {/* Center rail with soft glow (desktop) */}
                <div className="relative md:grid md:grid-cols-2">
                    <div
                        aria-hidden
                        className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-[2px]
                       bg-gradient-to-b from-indigo-400/80 via-sky-400/50 to-fuchsia-500/60"
                    />
                    {/* glow layer */}
                    <div
                        aria-hidden
                        className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-16 blur-3xl
                       bg-gradient-to-b from-indigo-400/20 via-sky-400/12 to-fuchsia-500/20 pointer-events-none"
                    />

                    <ol className="space-y-10 md:space-y-14 md:col-span-2">
                        {visible.map((r, i) => (
                            <RoleCard
                                key={r.title + r.period}
                                role={r}
                                side={i % 2 === 0 ? "left" : "right"}
                                prefersReduced={prefersReduced}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
