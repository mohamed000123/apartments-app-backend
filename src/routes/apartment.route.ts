import { Router } from 'express';
import { getApartments, addApartment, deleteApartment, getApartment } from '../controllers/apartments.controller';
import { createApartment } from '../schema/apartment.schema';
const router = Router();

router.get('/all', getApartments);
router.post('/add',createApartment, addApartment);
router.delete('/:id', deleteApartment);
router.get('/:id', getApartment);

export default router;
