import { Router } from 'express';
import { addProject } from '../controllers/projects.controller';
import { createProject } from '../schema/project.schema';

const router = Router();

router.post('/add',createProject, addProject);

export default router;
