import express from 'express';
import apartmentsRoutes from './routes/apartment.route';
import projectsRoutes from './routes/project.route';
import path from 'path';

const app = express();

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/apartment', apartmentsRoutes);
app.use('/project', projectsRoutes);

export default app;
