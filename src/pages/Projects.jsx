// src/pages/project.jsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import projectsData from "../data/projects";
import ProjectModal from "../components/ProjectModal";

const Projects = () => {
    const [selected, setSelected] = useState(null);

    // Guard against bad imports
    const projects = useMemo(
        () => (Array.isArray(projectsData) ? projectsData : []),
        [projectsData]
    );

    return (
        <section id="projects" className="py-24 px-4 max-w-5xl mx-auto">
            <header className="mb-12 text-center">
                <motion.h3
                    className="text-3xl font-bold mb-3"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Projects
                </motion.h3>
                {/* thin gradient underline for a subtle accent */}
                <div className="mx-auto h-px w-24 bg-gradient-to-r from-indigo-500 via-sky-400 to-fuchsia-500 rounded-full" />
            </header>

            {/* Empty state (just in case) */}
            {projects.length === 0 && (
                <p className="text-center text-slate-500 dark:text-slate-300">
                    Nothing to show yet. Check back soon.
                </p>
            )}

            <div className="grid md:grid-cols-2 gap-8">
                {projects.map((p, i) => (
                    <motion.div
                        key={p.title || i}
                        role="button"
                        tabIndex={0}
                        aria-label={`Open details for ${p.title}`}
                        className="bg-white dark:bg-slate-800 shadow rounded-lg p-6 border border-white/10 cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{
                            scale: 1.04,
                            boxShadow: "0 8px 32px rgba(80,80,200,0.15)",
                        }}
                        transition={{ delay: i * 0.12, duration: 0.45 }}
                        viewport={{ once: true, amount: 0.2 }}
                        onClick={() => setSelected(p)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setSelected(p);
                            }
                        }}
                    >
                        {/* image or graceful fallback */}
                        <div className="relative w-full h-40 rounded mb-4 overflow-hidden">
                            {p.image ? (
                                <img
                                    src={p.image}
                                    alt={p.title}
                                    className="w-full h-full object-cover transition-transform duration-300"
                                    loading="lazy"
                                    decoding="async"
                                    onError={(e) => {
                                        // swap to a soft gradient if the image 404s
                                        e.currentTarget.style.display = "none";
                                        const fallback = e.currentTarget.nextElementSibling;
                                        if (fallback) fallback.classList.remove("hidden");
                                    }}
                                />
                            ) : null}
                            <div className={`absolute inset-0 hidden bg-gradient-to-br from-indigo-600/30 via-sky-500/20 to-fuchsia-600/30`} />
                        </div>

                        <h4 className="text-xl font-semibold mb-2">{p.title}</h4>
                        <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">
                            {p.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-3">
                            {(p.tech || []).map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <span className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline">
                            View Details
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Modal (tolerates null) */}
            <ProjectModal project={selected} onClose={() => setSelected(null)} />
        </section>
    );
};

export default Projects;
