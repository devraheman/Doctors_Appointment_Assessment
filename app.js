import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
dotenv.config();

const app = express();
app.use(bodyParser.json());

connectDB();

app.use('/api', appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

