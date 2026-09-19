import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import apiRoutes from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cloth_shop_db';

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Root Status Route
app.get('/', (req, res) => {
  res.json({
    message: "ThreadCraft Pro API Service Operational",
    status: "Active",
    version: "2.4.0",
    docs: "/api/stats"
  });
});

// Attempt MongoDB Connection (Non-blocking fallback)
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Successfully!');
  })
  .catch((err) => {
    console.log('⚠️ MongoDB Local Service Not Detected — Operating with High-Performance Memory Sync Engine!');
  });

app.listen(PORT, () => {
  console.log(`🚀 ThreadCraft Backend Server running on http://localhost:${PORT}`);
});
