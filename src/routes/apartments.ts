import { Router } from 'express';
import { getApartments } from '../controllers/apartments';

const router = Router();

router.get('/', getApartments);

export default router;
