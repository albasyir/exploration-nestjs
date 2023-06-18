import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffees/coffees.module';

@Module({
  imports: [CoffeesModule],
})
export class FileModule {}
