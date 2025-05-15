import { Module } from '@nestjs/common';
import { EnergyService } from './energy.service';
import { EnergyResolver } from './energy.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Energy, EnergySchema } from './schemas/energy.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Energy.name, schema: EnergySchema }]),
  ],
  providers: [EnergyService, EnergyResolver],
  exports: [EnergyService]
})
export class EnergyModule {}
