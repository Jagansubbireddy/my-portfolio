import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaMoon, FaSun, FaFileDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [dark]);

    return (
        <header className="fixed top-0 left-0 w-full bg-white/80 dark:bg-slate-900/80 shadow z-50 backdrop-blur">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight">Jagannath S</h1>
                <div className="hidden md:flex space-x-6 text-sm font-medium">
                    <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
                    <Link to="/" state={{ scrollTo: "about" }} className="hover:text-indigo-600 transition">About</Link>
                    <Link to="/" state={{ scrollTo: "skills" }} className="hover:text-indigo-600 transition">Skills</Link>
                    <Link to="/" state={{ scrollTo: "projects" }} className="hover:text-indigo-600 transition">Projects</Link>
                    <Link to="/" state={{ scrollTo: "contact" }} className="hover:text-indigo-600 transition">Contact</Link>
                    <Link to="/blog" className="hover:text-indigo-600 transition">Blog</Link>
                </div>
                <div className="flex items-center gap-4 text-indigo-600 dark:text-indigo-400">
                    <a href="https://github.com/Jagansubbireddy" target="_blank" rel="noreferrer">
                        <FaGithub size={18} />
                    </a>
                    <a href="https://www.linkedin.com/in/s-jagannath-b8131123b/" target="_blank" rel="noreferrer">
                        <FaLinkedin size={18} />
                    </a>
                    <a href="subbireddyjagan@gmail.com">
                        <FaEnvelope size={18} />
                    </a>
                    <a href="/resume.pdf" download className="ml-2" title="Download Resume">
                        <FaFileDownload size={18} />
                    </a>
                    <motion.button
                        onClick={() => setDark(d => !d)}
                        className="ml-2"
                        title="Toggle dark mode"
                        whileTap={{ rotate: 180, scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {dark ? <FaSun size={18} /> : <FaMoon size={18} />}
                    </motion.button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;