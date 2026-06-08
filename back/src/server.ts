import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import { errorHandler } from './middleware/error.middleware';
import authRoutes from './routes/auth.routes';
import tutorRoutes from './routes/tutor.routes';
import petRoutes from './routes/pet.routes';
import serviceRoutes from './routes/service.routes';
import productRoutes from './routes/product.routes';
import appointmentRoutes from './routes/appointment.routes';
import dashboardRoutes from './routes/dashboard.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/auth', authRoutes);
app.use('/tutors', tutorRoutes);
app.use('/pets', petRoutes);
app.use('/services', serviceRoutes);
app.use('/products', productRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/dashboard', dashboardRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'AmigoPet API is running' });
});

// Error Handler
app.use(errorHandler);

// Database Connection and Server Start
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
