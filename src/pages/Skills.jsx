// src/pages/Skills.jsx
import React from "react";
import { motion } from "framer-motion";

// Font Awesome (stable)
import {
    FaPython, FaDocker, FaAws, FaLinux, FaDatabase, FaCubes,
    FaGithub, FaBitbucket, FaGlobe, FaChartBar
} from "react-icons/fa";

// Simple Icons (only ones your build is likely to have)
import {
    SiPytorch,
    SiTensorflow,
    SiOpencv,
    SiFastapi,
    SiRedis,
    SiKubernetes,
    // ❌ SiPowerbi removed (not available in your build)
    SiScikitlearn,
    SiPandas,
    SiNumpy,
} from "react-icons/si";

import { TbBrandOpenai } from "react-icons/tb";
import { GiArtificialIntelligence } from "react-icons/gi";

/* Brand colors */
const BRAND = {
    Python: "#3776AB",
    "scikit-learn": "#F7931E",
    Pandas: "#150458",
    NumPy: "#013243",
    Seaborn: "#4C72B0",
    Matplotlib: "#11557C",
    "Power BI": "#F2C811",

    PyTorch: "#EE4C2C",
    TensorFlow: "#FF6F00",
    OpenCV: "#5C3EE8",
    DeepStream: "#76B900",
    TensorRT: "#76B900",

    LangChain: "#10A37F",
    LangGraph: "#0EA5E9",
    RAG: "#10A37F",
    LoRA: "#10A37F",
    CLIP: "#10A37F",
    "Agentic AI": "#7C3AED",
    "NVIDIA NeMo": "#76B900",

    Docker: "#2496ED",
    Kubernetes: "#326CE5",
    Linux: "#FCC624",
    AWS: "#FF9900",
    FastAPI: "#009688",

    Milvus: "#00A99D",
    Qdrant: "#6E56CF",
    ChromaDB: "#A78BFA",
    FAISS: "#1877F2",
    Redis: "#DC382D",
    SQL: "#2563EB",

    GitHub: "#24292E",
    Bitbucket: "#0052CC",
    Crawl4AI: "#0EA5E9",
};

/* Safe icon map */
const ICONS = {
    // Data & Analytics
    Python: FaPython,
    "scikit-learn": SiScikitlearn,
    Pandas: SiPandas,
    NumPy: SiNumpy,
    Seaborn: FaChartBar,     // fallback icon
    Matplotlib: FaChartBar,  // fallback icon
    "Power BI": FaChartBar,  // ✅ fallback instead of missing SiPowerbi

    // CV / Frameworks
    PyTorch: SiPytorch,
    TensorFlow: SiTensorflow,
    OpenCV: SiOpencv,
    DeepStream: FaCubes,
    TensorRT: FaCubes,

    // LLMs & Agents
    LangChain: TbBrandOpenai,
    LangGraph: TbBrandOpenai,
    RAG: TbBrandOpenai,
    LoRA: TbBrandOpenai,
    CLIP: TbBrandOpenai,
    "Agentic AI": GiArtificialIntelligence,
    "NVIDIA NeMo": FaCubes,

    // Infra & DevOps
    Docker: FaDocker,
    Kubernetes: SiKubernetes,
    Linux: FaLinux,
    AWS: FaAws,
    FastAPI: SiFastapi,

    // Vector / DB
    Milvus: FaDatabase,
    Qdrant: FaDatabase,
    ChromaDB: FaDatabase,
    FAISS: FaDatabase,
    Redis: SiRedis,
    SQL: FaDatabase,

    // Code & Collaboration / Crawling
    GitHub: FaGithub,
    Bitbucket: FaBitbucket,
    Crawl4AI: FaGlobe,
};

/* Doc links */
const LINKS = {
    Python: "https://www.python.org/doc/",
    "scikit-learn": "https://scikit-learn.org/stable/",
    Pandas: "https://pandas.pydata.org/docs/",
    NumPy: "https://numpy.org/doc/",
    Seaborn: "https://seaborn.pydata.org/",
    Matplotlib: "https://matplotlib.org/stable/",
    "Power BI": "https://learn.microsoft.com/power-bi/",

    PyTorch: "https://pytorch.org/docs/stable/index.html",
    TensorFlow: "https://www.tensorflow.org/learn",
    OpenCV: "https://docs.opencv.org/",
    DeepStream: "https://docs.nvidia.com/metropolis/deepstream/dev-guide/index.html",
    TensorRT: "https://docs.nvidia.com/deeplearning/tensorrt/developer-guide/index.html",

    LangChain: "https://python.langchain.com/docs/",
    LangGraph: "https://langchain-ai.github.io/langgraph/",
    RAG: "https://huggingface.co/docs/transformers/en/model_doc/rag",
    LoRA: "https://huggingface.co/docs/peft/en/package_reference/lora",
    CLIP: "https://github.com/openai/CLIP",
    "Agentic AI": "https://blogs.nvidia.com/blog/what-is-agentic-ai/",
    "NVIDIA NeMo": "https://docs.nvidia.com/nemo-framework/index.html",

    Docker: "https://docs.docker.com/",
    Kubernetes: "https://kubernetes.io/docs/home/",
    Linux: "https://www.kernel.org/doc/html/latest/",
    AWS: "https://docs.aws.amazon.com/",
    FastAPI: "https://fastapi.tiangolo.com/",

    Milvus: "https://milvus.io/",
    Qdrant: "https://qdrant.tech/documentation/",
    ChromaDB: "https://docs.trychroma.com/",
    FAISS: "https://faiss.ai/",
    Redis: "https://redis.io/docs/",
    SQL: "https://www.postgresql.org/docs/",

    GitHub: "https://docs.github.com/",
    Bitbucket: "https://support.atlassian.com/bitbucket-cloud/",
    Crawl4AI: "https://docs.crawl4ai.com/",
};

/* Groups */
const GROUPS = [
    { title: "Computer Vision", items: ["OpenCV", "PyTorch", "TensorFlow", "DeepStream", "TensorRT"] },
    { title: "LLMs & Agents", items: ["LangChain", "LangGraph", "RAG", "LoRA", "CLIP", "Agentic AI", "NVIDIA NeMo"] },
    { title: "Data & Analytics", items: ["Python", "Pandas", "NumPy", "scikit-learn", "Seaborn", "Matplotlib", "Power BI"] },
    { title: "Vector Databases & Search", items: ["Milvus", "Qdrant", "ChromaDB", "FAISS", "Redis", "SQL"] },
    { title: "Infra & DevOps", items: ["Docker", "Kubernetes", "Linux", "AWS", "FastAPI"] },
    { title: "Code & Collaboration", items: ["GitHub", "Bitbucket"] },
    { title: "Data Ingestion & Crawling", items: ["Crawl4AI"] },
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
