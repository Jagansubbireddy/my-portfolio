// src/components/ProjectCard.jsx
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function ProjectCard({ project }) {
    // Accept both shapes:
    // - current: { title, description, tech[], image, link }
    // - alt:     { title, summary, tags[], image, links:{github/demo/docs} }
    const title = project?.title ?? "Untitled Project";
    const summary = project?.summary ?? project?.description ?? "";
    const tags = project?.tags ?? project?.tech ?? [];
    const image = project?.image ?? null;

    // Normalize links
    const links = project?.links ?? {};
    const repo = project?.link ?? links.github ?? null; // prefer explicit `link` then .links.github
    const demo = links.demo ?? null;
    const docs = links.docs ?? null;

    // 3D tilt
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rx = useSpring(useTransform(y, [-50, 50], [8, -8]), { stiffness: 120, damping: 12 });
    const ry = useSpring(useTransform(x, [-50, 50], [-8, 8]), { stiffness: 120, damping: 12 });

    const handleMouseMove = (e) => {
        const bounds = cardRef.current?.getBoundingClientRect();
        if (!bounds) return;
        const relX = e.clientX - (bounds.left + bounds.width / 2);
        const relY = e.clientY - (bounds.top + bounds.height / 2);
        x.set(relX / 4);
        y.set(relY / 4);
    };

    const resetTilt = () => {
        x.set(0);
        y.set(0);
    };

    // Label "GitHub" if the URL looks like GitHub, otherwise "Repo"
    const repoLabel = repo?.includes("github.com") ? "GitHub" : "Repo";

    return (
        <motion.article
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
            className="group relative rounded-2xl overflow-hidden bg-slate-900/60 ring-1 ring-white/10 backdrop-blur-md"
            tabIndex={0}
        >
            {/* image / fallback */}
            <div className="relative aspect-video w-full overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                    />
                ) : (
                    <div className="h-full w-full bg-gradient-to-br from-indigo-600/30 via-sky-500/20 to-fuchsia-600/30" />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
            </div>

            {/* content */}
            <div className="p-5">
                <h4 className="text-lg font-semibold text-white">{title}</h4>
                {summary && <p className="mt-2 text-sm text-slate-200/90">{summary}</p>}

                {/* tags */}
                {tags?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {tags.map((t) => (
                            <span
                                key={t}
                                className="text-xs bg-white/10 text-white ring-1 ring-white/15 rounded-full px-2 py-1"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                )}

                {/* links */}
                <div className="mt-4 flex gap-3">
                    {demo && (
                        <a
                            href={demo}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-indigo-300 hover:text-indigo-200 underline underline-offset-4"
                        >
                            Live
                        </a>
                    )}
                    {repo && (
                        <a
                            href={repo}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-indigo-300 hover:text-indigo-200 underline underline-offset-4"
                        >
                            {repoLabel}
                        </a>
                    )}
                    {docs && (
                        <a
                            href={docs}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-indigo-300 hover:text-indigo-200 underline underline-offset-4"
                        >
                            Docs
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}
