const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Vote Schema
const voteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    option: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Vote = mongoose.model('Vote', voteSchema);

// SUBMIT VOTE
app.post('/api/vote', async (req, res) => {
    const { name, option } = req.body;
    if (!name || !option) {
        return res.status(400).json({ error: "Name and option are required." });
    }

    try {
        const vote = new Vote({ name, option });
        await vote.save();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Failed to save vote." });
    }
});

// GET RESULTS (Password Protected)
app.post('/api/results', async (req, res) => {
    const { password } = req.body;
    
    if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const votes = await Vote.find().sort({ timestamp: -1 });
        res.json(votes);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch results." });
    }
});

// Serve Results page
app.get('/results', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/results.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});