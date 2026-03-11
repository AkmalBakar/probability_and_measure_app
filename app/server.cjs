const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const PROGRESS_FILE = path.join(DATA_DIR, 'progress.json');

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'dist')));

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.get('/api/progress', (req, res) => {
  if (!fs.existsSync(PROGRESS_FILE)) {
    return res.json(null);
  }
  try {
    const data = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    res.json(data);
  } catch {
    res.json(null);
  }
});

app.post('/api/progress', (req, res) => {
  try {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(req.body, null, 2));
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SPA fallback — serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`MA411 Study App running on http://localhost:${PORT}`);
});
