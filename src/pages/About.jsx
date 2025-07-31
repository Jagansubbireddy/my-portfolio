import React from 'react';

const About = () => {
    return (
        <section id="about" className="py-24 px-4 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">About Me</h3>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
                I’m a highly motivated AI/Computer Vision Engineer with over 3 years of experience in Deep Learning, CV, and building full-stack AI solutions.
                At Kloudspot, I’ve optimized pipelines for 1500+ camera deployments, integrated YOLO, DeepStream, segmentation models, and built MCT systems.
                I'm currently working on real-time semantic search using CLIP & BLIP, and building RAG pipelines with LangChain and LoRA agents.
            </p>

            {/* Open Source & Community Section */}
            <section id="community" className="py-16">
                <h3 className="text-2xl font-bold mb-4">Open Source & Community</h3>
                <p className="mb-4">
                    Active contributor to the DeepStream community, building impactful tools and sharing knowledge.
                </p>
                <ul className="list-disc ml-6">
                    <li>
                        <a
                            href="https://github.com/NVIDIA-AI-IOT/deepstream_reference_apps"
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-600 hover:underline"
                        >
                            NVIDIA DeepStream Reference Apps
                        </a> – Contributor
                    </li>
                    <li>
                        <a
                            href="https://github.com/debjit721212"
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-600 hover:underline"
                        >
                            My GitHub (Pinned Repos)
                        </a>
                    </li>
                </ul>
            </section>
        </section>
    );
};

export default About;