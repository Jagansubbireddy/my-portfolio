import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Blog from './pages/Blog'; // <-- Import Blog

function App() {
    return (
        <div className="font-inter bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 scroll-smooth">
            <Router>
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <Home />
                                <About />
                                <Skills />
                                <Projects />
                                <Contact />
                            </>
                        } />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/blog" element={<Blog />} /> {/* <-- Add this line */}
                    </Routes>
                </main>
            </Router>
        </div>
    );
}

export default App;