import { Router } from 'express';
import { getApartments, addApartment, deleteApartment, getApartment } from '../controllers/apartments.controller';

const router = Router();

router.get('/all', getApartments);
router.post('/add', addApartment);
router.delete('/:id', deleteApartment);
router.get('/:id', getApartment);

export default router;
