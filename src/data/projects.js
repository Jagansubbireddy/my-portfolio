// src/data/projects.js
const projects = [
    {
        title: "Semantic Image + Video Search + Multimodal RAG Agent",
        description:
            "Production CLIP+BLIP system for image/video search with captioning, time-aware FAISS retrieval, and LangChain RAG agents.",
        tech: ["CLIP", "BLIP", "Streamlit", "FastAPI", "LangChain", "Docker"],
        image: "/project1.png",
        link:
            "https://github.com/debjit721212/semantic-image-search/tree/feature/multimodal-lora-rag-agent",
    },
    {
        title: "MCT – Multi-Camera Tracking System",
        description:
            "Real-time multi-camera tracking with global ID assignment using DeepStream; scalable zone pipelines backed by Qdrant and Redis.",
        tech: ["DeepStream", "Qdrant", "Redis", "FastAPI", "Docker"],
        image: "/project2.png",
        link: "https://github.com/debjit721212/MCT",
    },

    // NEW
    {
        title: "Face Recognition Attendance",
        description:
            "End-to-end attendance platform: DeepStream for on-prem face detection/embeddings, Milvus vector search, FastAPI backend, and an admin UI for review/overrides.",
        tech: ["DeepStream", "Milvus", "FastAPI", "PostgreSQL", "React", "Docker"],
        image: "/project-attendance.png",
        link: "https://github.com/debjit721212/Student_attendence_managment",
    },
    {
        title: "Customer Churn Predictor",
        description:
            "Binary churn model with a minimal web app: notebooks for EDA/training, Flask endpoint + HTML form for interactive predictions.",
        tech: ["Python", "Flask", "scikit-learn", "Pandas", "Jupyter"],
        image: "/project-churn.png",
        link: "https://github.com/debjit721212/Churn-project",
    },
    {
        title: "Loan Eligibility Model",
        description:
            "Flask-based loan approval predictor: scikit-learn model (pickled), training notebooks, and a simple form UI for inputs.",
        tech: ["Python", "Flask", "scikit-learn", "Pandas", "Jupyter"],
        image: "/project-loan.png",
        link: "https://github.com/debjit721212/loan_prediction",
    },
];

export default projects;
  