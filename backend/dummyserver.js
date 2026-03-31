const express = require('express');
const ocrRoutes = require('./routes/new-ocr-route.js');
const connectDB = require('./config/db.js');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());

// Routes
app.use('/api/ocr', ocrRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});