// src/pages/Skills.jsx
import React from "react";
import { motion } from "framer-motion";

// Font Awesome (stable)
import {
    FaPython, FaDocker, FaLinux, FaDatabase, FaCubes,
    FaGithub, FaBitbucket, FaChartBar, FaMicrosoft
} from "react-icons/fa";

// Simple Icons (only the ones you need)
import {
    SiOpencv,
    SiPandas,
    SiNumpy,
} from "react-icons/si";

import { SiFlask } from "react-icons/si";

// Brand colors for your stack
const BRAND = {
    Python: "#3776AB",
    OpenCV: "#5C3EE8",
    DeepStream: "#76B900",
    Pandas: "#150458",
    NumPy: "#013243",
    Matplotlib: "#11557C",
    "Power BI": "#F2C811",
    Docker: "#2496ED",
    Linux: "#FCC624",
    Flask: "#000000",  // Flask color (black logo)
    SQL: "#2563EB",
    "Microsoft Excel": "#217346", // Added color for Excel
    GitHub: "#24292E",
    Bitbucket: "#0052CC",
};

/* Safe icon map */
const ICONS = {
    Python: FaPython,
    OpenCV: SiOpencv,
    DeepStream: FaCubes,
    Pandas: SiPandas,
    NumPy: SiNumpy,
    Matplotlib: FaChartBar,
    "Power BI": FaChartBar,  // Fallback for Power BI
    Docker: FaDocker,
    Linux: FaLinux,
    Flask: SiFlask,
    SQL: FaDatabase,
    "Microsoft Excel": FaMicrosoft,  // Use FontAwesome Microsoft icon
    GitHub: FaGithub,
    Bitbucket: FaBitbucket,
};

/* Doc links */
const LINKS = {
    Python: "https://www.python.org/doc/",
    OpenCV: "https://docs.opencv.org/",
    DeepStream: "https://docs.nvidia.com/metropolis/deepstream/dev-guide/index.html",
    Pandas: "https://pandas.pydata.org/docs/",
    NumPy: "https://numpy.org/doc/",
    Matplotlib: "https://matplotlib.org/stable/",
    "Power BI": "https://learn.microsoft.com/power-bi/",
    Docker: "https://docs.docker.com/",
    Linux: "https://www.kernel.org/doc/html/latest/",
    Flask: "https://flask.palletsprojects.com/en/2.0.x/",
    SQL: "https://learn.microsoft.com/en-us/sql/?view=sql-server-ver15",  // MS SQL Server link
    "Microsoft Excel": "https://support.microsoft.com/en-us/excel", // Added link for Microsoft Excel
    GitHub: "https://docs.github.com/",
    Bitbucket: "https://support.atlassian.com/bitbucket-cloud/",
};

/* Groups */
const GROUPS = [
    { title: "Data & Analytics", items: ["Python", "SQL", "Power BI", "Microsoft Excel", "NumPy", "Pandas", "Matplotlib",] },
    { title: "Computer Vision", items: ["OpenCV", "DeepStream"] },
    { title: "Infra & DevOps", items: ["Docker", "Linux", "Flask"] },
    { title: "Code & Collaboration", items: ["GitHub", "Bitbucket"] },
];

function hexToRgba(hex, alpha = 0.28) {
    const h = hex.replace("#", "");
    const n = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
    const v = parseInt(n, 16);
    const r = (v >> 16) & 255, g = (v >> 8) & 255, b = v & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function SkillButton({ name }) {
    const Icon = ICONS[name] || FaDatabase;
    const color = BRAND[name] || "#6366F1";
    const href = LINKS[name] || "#";

    return (
        <motion.button
            className="flex flex-col items-center bg-transparent border-none outline-none cursor-pointer focus:outline-none"
            whileHover={{ scale: 1.16, boxShadow: `0 10px 28px ${hexToRgba(color)}` }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
            title={name}
            style={{ transition: "box-shadow 0.2s ease" }}
            aria-label={`Open ${name} docs`}
        >
            <span className="mb-2" style={{ color }}>
                <Icon size={30} />
            </span>
            <span className="text-sm text-gray-700 dark:text-gray-200">{name}</span>
        </motion.button>
    );
}

export default function Skills() {
    return (
        <section id="skills" className="py-24 px-4 max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center">Skills & Tech Stack</h3>

            <div className="space-y-10">
                {GROUPS.map((group) => (
                    <section key={group.title}>
                        <div className="mb-4 flex items-center gap-3">
                            <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{group.title}</h4>
                            <div className="h-px w-24 bg-gradient-to-r from-indigo-500 via-sky-400 to-fuchsia-500 rounded-full" />
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-items-center">
                            {group.items.map((name) => (
                                <SkillButton key={name} name={name} />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </section>
    );
}
