import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes';
import blogRouter from './routes/blogRoutes';
dotenv.config();

const app = express();
app.use(express.json());
const PORT=5000;

app.use('/auth', authRouter);
app.use('/blog', blogRouter);

app.listen(PORT, ()=>{
    console.log('app running on:', PORT)
})