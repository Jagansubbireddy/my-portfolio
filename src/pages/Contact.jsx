// src/pages/Contact.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';

const item = (delay = 0.4) => ({
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, delay } },
});

const Contact = () => {
    return (
        <section id="contact" className="py-24 px-4 max-w-3xl mx-auto">
            <motion.h3
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                Contact Me
            </motion.h3>

            <motion.p
                className="mb-6 text-gray-700 dark:text-gray-200"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
            >
                Let’s connect! Feel free to email or reach out on social platforms.
            </motion.p>

            <motion.ul
                className="space-y-4 text-gray-800 dark:text-gray-200"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.12 } },
                }}
            >
                {/* Email */}
                <motion.li className="flex items-center gap-3" variants={item(0.1)}>
                    <FaEnvelope className="text-indigo-600 dark:text-indigo-400" />
                    <a
                        href="mailto:debjit721212@gmail.com"
                        className="hover:underline"
                        aria-label="Email Debjit"
                    >
                        debjit721212@gmail.com
                    </a>
                </motion.li>

                {/* LinkedIn */}
                <motion.li className="flex items-center gap-3" variants={item(0.22)}>
                    <FaLinkedin className="text-indigo-600 dark:text-indigo-400" />
                    <a
                        href="https://www.linkedin.com/in/debjit-adak-b06416211"
                        className="hover:underline"
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label="Debjit on LinkedIn"
                    >
                        LinkedIn
                    </a>
                </motion.li>

                {/* GitHub */}
                <motion.li className="flex items-center gap-3" variants={item(0.34)}>
                    <FaGithub className="text-indigo-600 dark:text-indigo-400" />
                    <a
                        href="https://github.com/debjit721212"
                        className="hover:underline"
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label="Debjit on GitHub"
                    >
                        GitHub
                    </a>
                </motion.li>

                {/* Instagram (professional handle recommended) */}
                <motion.li className="flex items-center gap-3" variants={item(0.46)}>
                    <FaInstagram className="text-pink-600 dark:text-pink-400" />
                    <a
                        href="https://www.instagram.com/debjit_adak?igsh=ZzltbTN0cGkxdWJv"
                        className="hover:underline"
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label="Debjit on Instagram"
                    >
                        Instagram
                    </a>
                </motion.li>
            </motion.ul>
        </section>
    );
};

export default Contact;
