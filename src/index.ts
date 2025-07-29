import express from 'express';
import apartmentsRoutes from './routes/apartments';

const app = express();

app.use(express.json());

app.use('/apartments', apartmentsRoutes);

export default app;
