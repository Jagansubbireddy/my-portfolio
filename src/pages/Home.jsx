// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Particles from "react-tsparticles";
import HeroInfoCard from "../components/HeroInfoCard";
import Skills from "../pages/Skills";            // ⬅️ added
import Experience from "../components/Experience";
import Projects from "../pages/Projects";        // ⬅️ added

/* ---------- Responsive helper: true if viewport < 768px ---------- */
function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < breakpoint);
        check();
        window.addEventListener("resize", check);
        window.addEventListener("orientationchange", check);
        return () => {
            window.removeEventListener("resize", check);
            window.removeEventListener("orientationchange", check);
        };
    }, [breakpoint]);
    return isMobile;
}

/* ---------- Backgrounds ---------- */
const backgrounds = [
    { src: "/cv-bg.jpg", alt: "Computer Vision", position: "center 40%" },
    { src: "/genai-bg.jpg", alt: "GenAI", position: "center 70%" },
];

const Home = () => {
    const isMobile = useIsMobile();

    const [index, setIndex] = useState(0);
    const [parallax, setParallax] = useState({ x: 0, y: 0 });

    // Smooth mouse-glow lerp
    const mouseTarget = useRef({ x: 0, y: 0 });
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    // React Router location for scroll-to-section
    const location = useLocation();

    // Rotate background every 5s
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
                return { x: prev.x + dx * 0.15, y: prev.y + dy * 0.15 };
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
            if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
        }
    }, [location]);

    // Disable parallax on small screens
    const handleMouseMove = (e) => {
        if (isMobile) return;
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 20;
        const y = (e.clientY / innerHeight - 0.5) * 20;
        setParallax({ x, y });
        mouseTarget.current = { x: e.clientX, y: e.clientY };
    };

    return (
        <>
            {/* HERO */}
            <section
                id="home"
                className="relative min-h-[100svh] md:min-h-screen flex items-center justify-center flex-col text-center px-4 pt-24 md:pt-32"
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
                        detectRetina: true,
                        particles: {
                            number: { value: isMobile ? 16 : 40 },
                            color: { value: "#6366f1" },
                            links: {
                                enable: !isMobile,
                                color: "#6366f1",
                                distance: isMobile ? 90 : 150,
                            },
                            move: { enable: true, speed: isMobile ? 0.6 : 1 },
                            size: { value: isMobile ? 1.4 : 2 },
                            opacity: { value: isMobile ? 0.4 : 0.5 },
                        },
                        interactivity: {
                            events: { onHover: { enable: !isMobile, mode: "repulse" } },
                            modes: { repulse: { distance: isMobile ? 60 : 100 } },
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
                        loading="eager"
                        decoding="async"
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

                {/* Smooth Mouse Glow (hidden on small screens) */}
                <div
                    className="hidden md:block"
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

                {/* Hero Content (Text only) */}
                <div className="relative z-10 w-full">
                    <div className="mx-auto max-w-4xl px-4 md:px-8">
                        <HeroInfoCard
                            name="Jagan"
                            headline="Software Engineer (AI/CV Engineer) | Data Analyst"
                            tagline="Experienced Software Engineer with a focus on AI and Computer Vision engineering, skilled in data analysis. Outside of my core role, I apply my expertise to data analytics, using data to drive business decisions and improve processes."
                        />
                    </div>
                </div>
            </section>

            {/* Skills & Tech Stack */}
            <Skills />

            {/* Experience */}
            <Experience />

            {/* Projects */}
            <Projects />
        </>
    );
};

export default Home;
