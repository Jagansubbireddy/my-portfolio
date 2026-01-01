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
                        I’m an Software Engineer with hands-on experience building real-time systems that operate reliably in dynamic environments. 
                        
                    </p>

                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200 mt-5">
                        While my background is in AI and computer vision, I’m now expanding my expertise into <span className="font-medium">Data Analytics</span>. 
                        I’ve developed strong skills in <span className="font-medium">data cleaning, exploratory data analysis (EDA),</span> and <span className="font-medium">data visualization </span> 
                        using tools like Python, Pandas, and Matplotlib. I’m passionate about transforming complex datasets into actionable insights that drive business decisions.
                    </p>

                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200 mt-5">
                        I’m focused on applying data-driven decision-making to optimize business processes and improve user experience. 
                        My approach is rooted in a mix of technical proficiency, problem-solving, and a keen understanding of the value of clean, actionable data.
                    </p>

                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200 mt-5">
                        <span className="font-semibold">Open to</span> roles and meaningful collaborations in Data Analytics, Data Science, and business intelligence.
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
                                    href="https://forums.developer.nvidia.com/u/s.jagannath/summary"
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
                        src="/jagan.jpeg"
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
