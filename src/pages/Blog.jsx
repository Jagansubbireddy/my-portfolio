import React from 'react';

const posts = [
    {
        title: "How I Leveraged Data Analytics to Drive Business Insights",
        date: "2024-07-20",
        content: "Short summary or link to full post...",
    },
    {
        title: "Lessons from Integrating Machine Learning into Data Analysis",
        date: "2024-07-10",
        content: "Key takeaways from applying machine learning to real-world data problems.",
    },
    // Add more posts as you write them!
];

const Blog = () => (
    <section id="blog" className="py-24 px-4 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold mb-8">Data Analytics Notes & Insights</h3>
        <ul>
            {posts.map((post, idx) => (
                <li key={idx} className="mb-6">
                    <h4 className="text-xl font-semibold">{post.title}</h4>
                    <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                    <p>{post.content}</p>
                </li>
            ))}
        </ul>
    </section>
);

export default Blog;