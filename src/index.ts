import express from 'express';
import apartmentsRoutes from './routes/apartment.route';
import projectsRoutes from './routes/project.route';

const app = express();

app.use(express.json());

app.use('/apartment', apartmentsRoutes);
app.use('/project', projectsRoutes);

export default app;
