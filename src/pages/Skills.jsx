import React from 'react';
import { FaPython, FaDocker, FaAws, FaLinux, FaDatabase, FaCubes } from 'react-icons/fa';
import { SiPytorch, SiTensorflow, SiOpencv, SiFastapi, SiRedis, SiKubernetes } from 'react-icons/si';
import { TbBrandOpenai } from "react-icons/tb";
import { GiArtificialIntelligence } from "react-icons/gi";
import { motion } from 'framer-motion';

const skills = [
    { name: "Python", icon: <FaPython />, link: "https://www.python.org/doc/" },
    { name: "PyTorch", icon: <SiPytorch />, link: "https://pytorch.org/docs/stable/index.html" },
    { name: "TensorFlow", icon: <SiTensorflow />, link: "https://www.tensorflow.org/learn" },
    { name: "OpenCV", icon: <SiOpencv />, link: "https://docs.opencv.org/" },
    { name: "FastAPI", icon: <SiFastapi />, link: "https://fastapi.tiangolo.com/" },
    { name: "Docker", icon: <FaDocker />, link: "https://docs.docker.com/" },
    { name: "AWS", icon: <FaAws />, link: "https://docs.aws.amazon.com/" },
    { name: "Linux", icon: <FaLinux />, link: "https://www.kernel.org/doc/html/latest/" },
    { name: "Redis", icon: <SiRedis />, link: "https://redis.io/docs/" },
    { name: "Qdrant", icon: <FaDatabase />, link: "https://qdrant.tech/documentation/" },
    { name: "ChromaDB", icon: <FaDatabase />, link: "https://docs.trychroma.com/" },
    { name: "FAISS", icon: <FaDatabase />, link: "https://faiss.ai/" },
    { name: "DeepStream", icon: <FaCubes />, link: "https://docs.nvidia.com/metropolis/deepstream/dev-guide/index.html" },
    { name: "TensorRT", icon: <FaCubes />, link: "https://docs.nvidia.com/deeplearning/tensorrt/developer-guide/index.html" },
    { name: "Kubernetes", icon: <SiKubernetes />, link: "https://kubernetes.io/docs/home/" },
    { name: "Agentic AI", icon: <GiArtificialIntelligence />, link: "https://blogs.nvidia.com/blog/what-is-agentic-ai/" },
    { name: "RAG", icon: <TbBrandOpenai />, link: "https://huggingface.co/docs/transformers/en/model_doc/rag" },
    { name: "LoRA", icon: <TbBrandOpenai />, link: "https://huggingface.co/docs/peft/en/package_reference/lora" },
    { name: "CLIP", icon: <TbBrandOpenai />, link: "https://github.com/openai/CLIP" },
    { name: "LangChain", icon: <TbBrandOpenai />, link: "https://python.langchain.com/docs/" },
    { name: "LangGraph", icon: <TbBrandOpenai />, link: "https://langchain-ai.github.io/langgraph/" },
];

const Skills = () => (
    <section id="skills" className="py-24 px-4 max-w-5xl mx-auto">
        <h3 className="text-3xl font-bold mb-8 text-center">Skills & Tech Stack</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-items-center">
            {skills.map((skill, idx) => (
                <motion.button
                    key={idx}
                    className="flex flex-col items-center bg-transparent border-none outline-none cursor-pointer"
                    whileHover={{ scale: 1.18 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(skill.link, "_blank")}
                    title={skill.name}
                    style={{ transition: "box-shadow 0.2s" }}
                >
                    <span className="text-3xl text-indigo-600 dark:text-indigo-400 mb-2">
                        {skill.icon}
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-200">{skill.name}</span>
                </motion.button>
            ))}
        </div>
    </section>
);

export default Skills;