import './db';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import employeeRoutes from './routes/employeeRoutes';
import cors from 'cors';

dotenv.config();

const { PORT, MONGODB_URI } = process.env;

if (!PORT) {
  throw new Error('PORT not found in the environment variables');
}

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI not found in the environment variables');
}

const app: Express = express();
app.use(cors({origin:"*"}))

app.use(express.json());
app.get("/",(req,res)=>{
res.send("welcome to Employee Task Manager")
});
app.use(employeeRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });

export default app;