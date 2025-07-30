import { Router } from 'express';
import { getApartments, addApartment, deleteApartment, getApartment } from '../controllers/apartments.controller';
import { createApartment } from '../schema/apartment.schema';
import upload from "../middleware/upload";
const router = Router();

router.get('/all', getApartments);
router.post('/add',createApartment,upload.array("images"), addApartment);
router.delete('/:id', deleteApartment);
router.get('/:id', getApartment);

export default router;
