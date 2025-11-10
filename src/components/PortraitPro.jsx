// src/components/PortraitPro.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Avatar from "./Avatar";

/**
 * PortraitPro — advanced, animated portrait wrapper
 *
 * Props:
 * - src: string (image path), default "/debjit.jpeg"
 * - size: number | css string (e.g., 360 | "clamp(240px, 30vw, 480px)")
 * - variant: "neon" | "polaroid" | "blob"  (currently implements "neon" + "polaroid" frame styles)
 * - tilt: boolean (3D hover tilt), default true on desktop
 * - shine: boolean (cursor-driven light sweep), default true on desktop
 * - orbiters: number (0–6), default 3 (desktop) / 0 (mobile)
 * - kenBurns: boolean (slow zoom/drift on Avatar), default true
 * - grayscaleOnIdle: boolean (fade to grayscale out of focus), default true
 * - alignToSelector: optional CSS selector to vertically align with a sibling element (desktop)
 * - alignOffsetPx: fine-tune extra marginTop
 * - intensity: "low" | "med" | "high" (scales tilt/sweep/orbit), default "med"
 * - alt: string alt text
 */

function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < breakpoint);
        check();
        window.addEventListener("resize", check);
        window.addEventListener("orientationchange", check);
        return () => {
            window.removeEventListener("resize", check);
            window.removeEventListener("orientationchange", check);
        };
    }, [breakpoint]);
    return isMobile;
}

function clamp(n, lo, hi) {
    return Math.max(lo, Math.min(hi, n));
}

export default function PortraitPro({
    src = "/debjit.jpeg",
    size = "clamp(240px, 30vw, 480px)",
    alt = "Portrait",
    variant = "neon",
    tilt = true,
    shine = true,
    orbiters = undefined, // computed per-device if undefined
    kenBurns = true,
    grayscaleOnIdle = true,
    alignToSelector = null,
    alignOffsetPx = 0,
    intensity = "med",
}) {
    const prefersReduced = useReducedMotion();
    const isMobile = useIsMobile();
    const ref = useRef(null);
    const [mt, setMt] = useState(0);

    // --- Intensity presets ---
    const config = useMemo(() => {
        const base = {
            tiltMax: 10,
            shineOpacity: 0.18,
            orbitRadius: 16,
            orbitSpeed: 18, // seconds
            haloRotateDur: 10,
            kbScaleMax: 1.06,
        };
        if (intensity === "low") return { ...base, tiltMax: 6, shineOpacity: 0.12, orbitRadius: 12, orbitSpeed: 22, kbScaleMax: 1.04, haloRotateDur: 14 };
        if (intensity === "high") return { ...base, tiltMax: 14, shineOpacity: 0.24, orbitRadius: 20, orbitSpeed: 14, kbScaleMax: 1.08, haloRotateDur: 8 };
        return base;
    }, [intensity]);

    // --- Parallax drift on scroll (subtle) ---
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [8, -16]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);

    // --- Align with a target element on desktop ---
    useEffect(() => {
        const mql = window.matchMedia("(min-width: 768px)");
        function align() {
            if (!mql.matches || !alignToSelector) {
                setMt(0);
                return;
            }
            const host = ref.current;
            if (!host) return;
            let section = host.closest("section");
            if (!section) section = document.getElementById("about") || document.body;

            const target = document.querySelector(alignToSelector);
            if (!target) {
                setMt(0);
                return;
            }
            const sectionRect = section.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            const distance = targetRect.top - sectionRect.top;
            setMt(Math.max(0, Math.round(distance + alignOffsetPx)));
        }
        align();
        window.addEventListener("resize", align);
        window.addEventListener("orientationchange", align);
        const id = setTimeout(align, 120); // settle after fonts/imgs
        return () => {
            window.removeEventListener("resize", align);
            window.removeEventListener("orientationchange", align);
            clearTimeout(id);
        };
    }, [alignToSelector, alignOffsetPx]);

    // --- Mouse-driven tilt + shine (desktop only) ---
    const cardRef = useRef(null);
    const [mx, setMx] = useState(50); // mouse % x
    const [my, setMy] = useState(50); // mouse % y
    const [rot, setRot] = useState({ rx: 0, ry: 0 });

    useEffect(() => {
        if (prefersReduced || isMobile || !tilt) return;
        let frame;
        const onMove = (e) => {
            const el = cardRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const px = clamp((e.clientX - rect.left) / rect.width, 0, 1);
            const py = clamp((e.clientY - rect.top) / rect.height, 0, 1);

            // requestAnimationFrame to throttle
            if (!frame) {
                frame = requestAnimationFrame(() => {
                    setMx(px * 100);
                    setMy(py * 100);
                    const ry = (px - 0.5) * 2 * config.tiltMax; // left-right
                    const rx = -(py - 0.5) * 2 * config.tiltMax; // up-down
                    setRot({ rx, ry });
                    frame = null;
                });
            }
        };
        const onLeave = () => setRot({ rx: 0, ry: 0 });
        const node = cardRef.current;
        node?.addEventListener("pointermove", onMove);
        node?.addEventListener("pointerleave", onLeave);
        return () => {
            node?.removeEventListener("pointermove", onMove);
            node?.removeEventListener("pointerleave", onLeave);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [prefersReduced, isMobile, tilt, config.tiltMax]);

    // --- Orbiters count (auto-tuned for device) ---
    const orbCount = useMemo(() => {
        if (prefersReduced) return 0;
        if (typeof orbiters === "number") return Math.max(0, Math.min(6, orbiters));
        return isMobile ? 0 : 3;
    }, [orbiters, prefersReduced, isMobile]);

    // --- Dimension handling ---
    const dim = typeof size === "number" ? `${size}px` : size;

    // --- Frame variants (visual wrapper) ---
    const Frame = ({ children }) => {
        // Neon: glowing gradient ring + soft halo
        if (variant === "neon") {
            return (
                <div className="relative" style={{ width: dim, height: dim }}>
                    {/* rotating gradient ring */}
                    {!prefersReduced && (
                        <motion.div
                            aria-hidden
                            className="absolute -inset-2 rounded-full blur-md opacity-70"
                            style={{
                                background:
                                    "conic-gradient(from 0deg, rgba(99,102,241,0.75), rgba(14,165,233,0.75), rgba(236,72,153,0.75), rgba(99,102,241,0.75))",
                            }}
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: config.haloRotateDur, repeat: Infinity, ease: "linear" }}
                        />
                    )}
                    {/* inner ring backing */}
                    <div
                        aria-hidden
                        className="absolute -inset-1 rounded-full"
                        style={{
                            background:
                                "radial-gradient(50% 50% at 50% 50%, rgba(99,102,241,0.20), rgba(236,72,153,0.16) 45%, transparent 70%)",
                            filter: "blur(6px)",
                        }}
                    />
                    {/* content */}
                    <div className="relative rounded-full overflow-hidden shadow-xl ring-1 ring-white/20">
                        {children}
                    </div>
                </div>
            );
        }

        // Polaroid: card with angled shine (nice fallback)
        if (variant === "polaroid") {
            return (
                <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/15" style={{ width: dim, height: dim }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/6 to-white/0 pointer-events-none" />
                    {children}
                </div>
            );
        }

        // Default to neon if unknown
        return (
            <div className="relative" style={{ width: dim, height: dim }}>
                <div className="relative rounded-full overflow-hidden shadow-xl ring-1 ring-white/20">
                    {children}
                </div>
            </div>
        );
    };

    // --- Shine layer (cursor light) ---
    const Shine = () => {
        if (prefersReduced || isMobile || !shine) return null;
        return (
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full mix-blend-screen"
                style={{
                    background: `radial-gradient(320px at ${mx}% ${my}%, rgba(255,255,255,${config.shineOpacity}), transparent 60%)`,
                }}
            />
        );
    };

    // --- Orbiters (tiny dots that orbit the frame) ---
    const Orbiters = () => {
        if (orbCount === 0) return null;
        const dots = new Array(orbCount).fill(0);
        return (
            <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ transformOrigin: "50% 50%" }}
                animate={{ rotate: 360 }}
                transition={{ duration: config.orbitSpeed, repeat: Infinity, ease: "linear" }}
            >
                {dots.map((_, i) => {
                    const angle = (i / orbCount) * 360;
                    const radius = config.orbitRadius;
                    return (
                        <div
                            key={i}
                            className="absolute h-2 w-2 rounded-full"
                            style={{
                                left: "50%",
                                top: "50%",
                                transform: `rotate(${angle}deg) translate(${radius}px)`,
                                background:
                                    "radial-gradient(circle, rgba(255,255,255,0.9), rgba(99,102,241,0.9))",
                                boxShadow: "0 0 12px rgba(99,102,241,0.5)",
                                filter: "blur(0.2px)",
                            }}
                        />
                    );
                })}
            </motion.div>
        );
    };

    // --- Ken Burns tuning passed down to Avatar ---
    const avatarKb = prefersReduced ? false : kenBurns;
    const avatarGrayscale = grayscaleOnIdle;

    return (
        <div
            ref={ref}
            className="md:sticky md:top-36 will-change-transform"
            style={{ marginTop: mt }}
        >
            <motion.div
                ref={cardRef}
                style={{
                    y: prefersReduced ? 0 : y,
                    scale: prefersReduced ? 1 : scale,
                    rotateX: prefersReduced || isMobile || !tilt ? 0 : rot.rx,
                    rotateY: prefersReduced || isMobile || !tilt ? 0 : rot.ry,
                    transformStyle: "preserve-3d",
                    perspective: 900,
                }}
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ type: "spring", stiffness: 140, damping: 18 }}
                className="relative"
            >
                {/* Soft outer halo */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-8 rounded-[32px] blur-3xl opacity-60"
                    style={{
                        background:
                            "radial-gradient(50% 50% at 50% 50%, rgba(99,102,241,0.30), rgba(14,165,233,0.22) 45%, rgba(236,72,153,0.24) 65%, transparent 75%)",
                    }}
                />

                {/* Frame around the avatar (neon/polaroid) */}
                <Frame>
                    {/* Avatar (handles Ken Burns + optional grayscale) */}
                    <Avatar
                        src={src}
                        size="100%"
                        alt={alt}
                        kenBurns={avatarKb}
                        grayscaleOnIdle={avatarGrayscale}
                    />

                    {/* Shine & orbiters overlays */}
                    <Shine />
                    <Orbiters />
                </Frame>
            </motion.div>
        </div>
    );
}
