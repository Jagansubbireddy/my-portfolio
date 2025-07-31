import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;
    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="bg-white dark:bg-slate-900 p-8 rounded-lg max-w-lg w-full shadow-lg relative"
                    initial={{ scale: 0.9, y: 40 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 40 }}
                    onClick={e => e.stopPropagation()}
                >
                    <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded mb-4" />
                    <h4 className="text-2xl font-bold mb-2">{project.title}</h4>
                    <p className="mb-4 text-gray-700 dark:text-gray-200">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {project.tech.map((tag, idx) => (
                            <span key={idx} className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>
                    <a href={project.link} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline">
                        GitHub Repo →
                    </a>
                    <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-indigo-600 text-xl">&times;</button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProjectModal;