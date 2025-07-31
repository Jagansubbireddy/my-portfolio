import React, { useState } from 'react';
import { motion } from 'framer-motion';
import projects from '../data/projects';
import ProjectModal from '../components/ProjectModal';

const Projects = () => {
    const [selected, setSelected] = useState(null);

    return (
        <section id="projects" className="py-24 px-4 max-w-5xl mx-auto">
            <motion.h3
                className="text-3xl font-bold mb-12 text-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                Projects
            </motion.h3>
            <div className="grid md:grid-cols-2 gap-8">
                {projects.map((p, i) => (
                    <motion.div
                        key={i}
                        className="bg-white dark:bg-slate-800 shadow rounded-lg p-6 border cursor-pointer transition"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{
                            scale: 1.04,
                            boxShadow: "0 8px 32px rgba(80,80,200,0.15)",
                        }}
                        transition={{ delay: i * 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                        onClick={() => setSelected(p)}
                    >
                        <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-40 object-cover rounded mb-4 transition-transform duration-300"
                        />
                        <h4 className="text-xl font-semibold mb-2">{p.title}</h4>
                        <p className="text-gray-700 dark:text-gray-200 text-sm mb-3">{p.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {p.tech.map((tag, idx) => (
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