// src/pages/About.jsx
import React from "react";
import PortraitPro from "../components/PortraitPro";

const About = () => {
    return (
        <section id="about" className="py-24 px-4">
            <div className="mx-auto max-w-6xl grid items-start gap-10 md:grid-cols-2">
                {/* Left: About text */}
                <div className="max-w-2xl">
                    <h3 className="text-3xl font-bold mb-4">About Me</h3>

                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
                        I’m an AI/Computer Vision engineer who builds real-time systems that operate reliably in the wild.
                        My recent focus breaks down roughly as <span className="font-medium">50% computer vision</span>,
                        <span className="font-medium"> 30% generative AI</span>, and
                        <span className="font-medium"> 20% multimodal (vision-language)</span>.
                        I’ve integrated <span className="font-medium">action recognition</span> into production pipelines and tuned
                        <span className="font-medium"> per-camera trackers</span> across diverse deployments to balance accuracy, speed, and stability.
                        I also completed a <span className="font-medium">RAG-based LoRA</span> project powered by multimodal understanding and continue
                        to explore GenAI to improve search, retrieval, and user experience.
                    </p>

                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200 mt-5">
                        I’m currently pursuing an <span className="font-medium">MS in Data Science &amp; AI</span> at BITS Pilani.
                        Beyond the tech, I care about clean design, measurable reliability, and shipping systems that make sense to the people who use them.
                    </p>

                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200 mt-5">
                        <span className="font-semibold">Open to</span> roles and meaningful collaborations.
                    </p>

                    {/* Open Source & Community Section (DeepStream only) */}
                    <section id="community" className="py-16">
                        <h3 className="text-2xl font-bold mb-4">Open Source & Community</h3>
                        <p className="mb-4">
                            Active in the <span className="font-medium">NVIDIA DeepStream</span> community—sharing solutions, examples, and troubleshooting tips.
                        </p>
                        <ul className="list-disc ml-6 space-y-2">
                            <li>
                                <a
                                    href="https://forums.developer.nvidia.com/u/debjit.adak/summary"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-indigo-600 hover:underline"
                                >
                                    NVIDIA Developer Forums — DeepStream Profile
                                </a>
                            </li>
                        </ul>
                    </section>
                </div>

                {/* Right: Advanced animated portrait (sticky, parallax, tilt, shine, orbiters) */}
                <div className="flex justify-center md:justify-end">
                    <PortraitPro
                        src="/debjit.jpeg"
                        size="clamp(260px, 32vw, 480px)"
                        intensity="high"
                        orbiters={4}
                        shine
                        tilt
                        kenBurns
                        grayscaleOnIdle
                        alignToSelector="#LoRA"  // align with the “Open Source & Community” headline on md+
                        alignOffsetPx={8}             // fine-tune: nudge a bit further down
                    />
                </div>
            </div>
        </section>
    );
};

export default About;
