// src/components/Projects.jsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import PROJECTS from "../data/projects"; // <- default export (matches your projects.js)

export default function Projects() {
    const [active, setActive] = useState("All");

    // Build tag list from either .tags or .tech
    const allTags = useMemo(() => {
        const set = new Set();
        PROJECTS.forEach((p) => {
            const tags = p.tags || p.tech || [];
            tags.forEach((t) => set.add(t));
        });
        return ["All", ...Array.from(set)];
    }, []);

    // Filter by the active tag (works with either .tags or .tech)
    const list = useMemo(() => {
        if (active === "All") return PROJECTS;
        return PROJECTS.filter((p) => {
            const tags = p.tags || p.tech || [];
            return tags.includes(active);
        });
    }, [active]);

    return (
        <section id="projects" className="relative py-20 px-4 border-t border-white/10">
            <div className="mx-auto max-w-6xl">
                <header className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <h3 className="text-3xl font-bold text-white">Projects</h3>
                        <p className="text-slate-300/90">Selected work across CV, GenAI, and multimodal systems.</p>
                    </div>

                    {/* filters */}
                    <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setActive(tag)}
                                className={
                                    "rounded-full px-3 py-1 text-sm ring-1 transition " +
                                    (active === tag
                                        ? "bg-indigo-600 text-white ring-indigo-500"
                                        : "bg-white/5 text-slate-200 ring-white/15 hover:bg-white/10")
                                }
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </header>

                {/* grid */}
                <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((p) => (
                        <motion.div
                            key={p.title}
                            layout
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.35 }}
                        >
                            <ProjectCard project={p} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
