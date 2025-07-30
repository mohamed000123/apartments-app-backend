import { Router } from 'express';
import { addProject } from '../controllers/projects.controller';

const router = Router();

router.post('/add', addProject);

export default router;
