import { CoffeesController } from './coffees.controller';
import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { FileModule } from './file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee]), FileModule],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
