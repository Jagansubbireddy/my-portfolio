import React, { useState } from 'react';

const Admin = () => {
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return setStatus('Please select a file.');

        const formData = new FormData();
        formData.append('resume', file);
        formData.append('password', password);

        setStatus('Uploading...');
        try {
            const res = await fetch('http://localhost:4000/upload-resume', {
                method: 'POST',
                body: formData,
            });
            if (res.ok) {
                setStatus('Resume uploaded successfully!');
            } else {
                setStatus('Upload failed. Wrong password or server error.');
            }
        } catch (err) {
            setStatus('Network error.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow max-w-md w-full space-y-4"
            >
                <h2 className="text-2xl font-bold mb-4">Admin: Upload Resume</h2>
                <input
                    type="password"
                    placeholder="Admin Password"
                    className="border p-2 rounded w-full"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <input
                    type="file"
                    accept="application/pdf"
                    className="border p-2 rounded w-full"
                    onChange={e => setFile(e.target.files[0])}
                    required
                />
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
                >
                    Upload
                </button>
                {status && <div className="text-center mt-2">{status}</div>}
            </form>
        </div>
    );
};

export default Admin;