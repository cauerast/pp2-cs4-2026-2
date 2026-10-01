import { Router } from 'express';
import * as controller from '../controllers/carController';
import { CreateCarDto } from '../dto/car/createCarDto';
import { UpdateCarDto } from '../dto/car/updateCarDto';

const router = Router();

router.get('/', controller.getCars);
router.get('/:id', controller.getCarById);
router.post('/', controller.createCar);
router.patch('/:id',controller.updateCar);
router.delete('/:id', controller.removeCar);

export default router;
