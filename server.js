const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 4000; // or any port you like

app.use(cors());

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Simple password check (for demo; use env vars in production)
const ADMIN_PASSWORD = 'yourStrongPassword';

app.post('/upload-resume', upload.single('resume'), (req, res) => {
    const { password } = req.body;
    if (password !== ADMIN_PASSWORD) {
        // Delete uploaded file if password is wrong
        fs.unlinkSync(req.file.path);
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Move uploaded file to public/resume.pdf
    const targetPath = path.join(__dirname, 'public', 'resume.pdf');
    fs.renameSync(req.file.path, targetPath);

    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Resume upload server running on http://localhost:${PORT}`);
});