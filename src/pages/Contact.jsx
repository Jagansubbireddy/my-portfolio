import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

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
                    visible: { transition: { staggerChildren: 0.2 } }
                }}
            >
                <motion.li
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <FaEnvelope className="text-indigo-600 dark:text-indigo-400" />
                    <a href="mailto:debjit721212@gmail.com" className="hover:underline">debjit721212@gmail.com</a>
                </motion.li>

                <motion.li
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <FaLinkedin className="text-indigo-600 dark:text-indigo-400" />
                    <a href="https://www.linkedin.com/in/debjit-adak-b06416211" className="hover:underline" target="_blank" rel="noreferrer">LinkedIn</a>
                </motion.li>

                <motion.li
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <FaGithub className="text-indigo-600 dark:text-indigo-400" />
                    <a href="https://github.com/debjit721212" className="hover:underline" target="_blank" rel="noreferrer">GitHub</a>
                </motion.li>
            </motion.ul>
        </section>
    );
};

export default Contact;