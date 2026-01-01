// src/pages/project.jsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import projectsData from "../data/projects";
import ProjectModal from "../components/ProjectModal";

const Projects = () => {
  const [selected, setSelected] = useState(null);

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
        <div className="mx-auto h-px w-24 bg-gradient-to-r from-indigo-500 via-sky-400 to-fuchsia-500 rounded-full" />
      </header>

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
            {/* Image: fully visible (no crop) */}
            <div
              className="relative w-full rounded mb-4 overflow-hidden bg-slate-100 dark:bg-slate-900"
              style={{ aspectRatio: "16 / 9" }} // keeps cards uniform without needing tailwind aspect-ratio plugin
            >
              {/* fallback background (always there) */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/25 via-sky-500/15 to-fuchsia-600/25" />

              {p.image ? (
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-contain p-2"
                  onError={(e) => {
                    // hide broken image; gradient fallback stays visible
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : null}
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

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default Projects;
