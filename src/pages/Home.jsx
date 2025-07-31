import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Particles from "react-tsparticles";

const backgrounds = [
    { src: "/cv-bg.jpg", alt: "Computer Vision", position: "center 40%" },
    { src: "/genai-bg.jpg", alt: "GenAI", position: "center 70%" },
];

const Home = () => {
    const [index, setIndex] = useState(0);
    const [parallax, setParallax] = useState({ x: 0, y: 0 });

    // For smooth mouse glow
    const mouseTarget = useRef({ x: 0, y: 0 });
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    // React Router location for scroll-to-section
    const location = useLocation();

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % backgrounds.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Smoothly animate the mouse glow
    useEffect(() => {
        let frame;
        const animate = () => {
            setMouse((prev) => {
                const dx = mouseTarget.current.x - prev.x;
                const dy = mouseTarget.current.y - prev.y;
                return {
                    x: prev.x + dx * 0.15,
                    y: prev.y + dy * 0.15,
                };
            });
            frame = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(frame);
    }, []);

    // Scroll to section if state is present
    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            const el = document.getElementById(location.state.scrollTo);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        }
    }, [location]);

    const handleMouseMove = (e) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 20;
        const y = (e.clientY / innerHeight - 0.5) * 20;
        setParallax({ x, y });
        mouseTarget.current = { x: e.clientX, y: e.clientY };
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center flex-col text-center px-4 pt-32"
            style={{ overflow: "hidden", cursor: "pointer" }}
            onMouseMove={handleMouseMove}
        >
            {/* Particles */}
            <Particles
                id="tsparticles"
                className="absolute inset-0 w-full h-full"
                style={{ zIndex: 3 }}
                options={{
                    fullScreen: false,
                    background: { color: { value: "transparent" } },
                    particles: {
                        number: { value: 40 },
                        color: { value: "#6366f1" },
                        links: { enable: true, color: "#6366f1", distance: 150 },
                        move: { enable: true, speed: 1 },
                        size: { value: 2 },
                        opacity: { value: 0.5 },
                    },
                    interactivity: {
                        events: { onHover: { enable: true, mode: "repulse" } },
                        modes: { repulse: { distance: 100 } },
                    },
                }}
            />

            {/* Background Images with Fade, Zoom, and Parallax */}
            {backgrounds.map((bg, i) => (
                <img
                    key={bg.src}
                    src={bg.src}
                    alt={bg.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        zIndex: 1,
                        opacity: index === i ? 1 : 0,
                        transition: "opacity 1s, transform 8s cubic-bezier(0.4,0,0.2,1)",
                        objectPosition: bg.position,
                        transform: `scale(${index === i ? 1.08 : 1}) translate(${parallax.x}px, ${parallax.y}px)`,
                    }}
                />
            ))}

            {/* Overlay for Text Readability */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(90deg, rgba(30,41,59,0.85) 0%, rgba(30,41,59,0.5) 100%)",
                    zIndex: 2,
                }}
            />

            {/* Smooth Mouse Glow */}
            <div
                style={{
                    position: "absolute",
                    left: mouse.x - 60,
                    top: mouse.y - 60,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: "rgba(99,102,241,0.15)",
                    boxShadow: "0 0 32px 8px rgba(99,102,241,0.25)",
                    pointerEvents: "none",
                    zIndex: 4,
                }}
            />

            {/* Hero Content */}
            <div
                className="relative z-10 text-white max-w-2xl mx-auto rounded-lg p-8"
                style={{
                    background: "rgba(30,41,59,0.65)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                }}
            >
                <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
                    Hi, I’m Debjit <span className="wave">👋</span>
                </h1>
                <p className="text-2xl font-semibold mb-2 drop-shadow">
                    Building real-time AI for the physical world
                </p>
                <p className="text-lg mb-6 drop-shadow">
                    AI & Computer Vision Engineer passionate about DeepStream, LLMs, and GenAI.
                </p>
                <a
                    href="#projects"
                    className="mt-2 inline-block bg-indigo-600 text-white px-7 py-3 rounded-lg text-base font-semibold shadow-lg hover:bg-indigo-700 transition"
                >
                    View My Projects
                </a>
            </div>
        </section>
    );
};

export default Home;