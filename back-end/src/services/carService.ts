import * as repository from "../repositories/carRepository";
import type { Car } from "../../generated/prisma/client";
import type { CreateCarDto } from "../dto/car/createCarDto";
import type { UpdateCarDto } from "../dto/car/updateCarDto";
import { NotFoundError } from "../errors/NotFoundError";

export async function findAll(): Promise<Car[]> {
  return repository.findAll();
}

export async function findById(id: number): Promise<Car> {
  const Car = await repository.findById(id);

  if (!Car) throw new NotFoundError("Car not found.");
  
  return Car;
}

export async function create(data: CreateCarDto): Promise<Car> {
  return repository.create(data);
}

export async function update(id: number,data: UpdateCarDto,): Promise<Car> {
  const exists = await repository.findById(id);

  if (!exists) throw new NotFoundError('Car not found');

  return await repository.update(id, data) as any;
}

export async function remove(id: number): Promise<Car> {
  const car = await repository.findById(id);

  if (!car) throw new NotFoundError('Car not found');

  return await repository.remove(id);
}