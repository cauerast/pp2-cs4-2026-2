import { type Request, type Response, type NextFunction } from 'express';
import * as service from '../services/carService'

export async function getCars(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const cars = await service.findAll();
    res.json(cars);
  } catch (e) {
    next(e);
  }
}

export async function getCarById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const car = await service.findById(Number(req.params.id));
    res.json(car);
  } catch (e) {
    next(e)
  }
}

export async function createCar(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const car = await service.create(req.body);
    res.status(201).json(car);
  } catch (e) {
    next(e)
  }
}

export async function updateCar(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const car = await service.update(Number(req.params.id), { ...req.body });
    res.json(car);
  } catch (e) {
    next(e)
  }
}

export async function removeCar(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await service.remove(Number(req.params.id));
    res.status(204).end();
  } catch (e) {
    next(e)
  }
}