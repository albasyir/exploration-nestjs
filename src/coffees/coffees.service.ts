import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
  ) {}

  async findAll() {
    return this.coffeesRepository.find();
  }

  async findOne(id: string) {
    const coffee = this.coffeesRepository.findOne({ where: { id: +id } });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeesRepository.create(createCoffeeDto);
    return this.coffeesRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = await this.coffeesRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });

    if (!existingCoffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return this.coffeesRepository.save(existingCoffee);
  }

  async remove(id: string) {
    return this.coffeesRepository.delete(id);
  }
}
