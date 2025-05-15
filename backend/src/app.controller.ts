import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {EnergyService} from './energy/energy.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly energyService: EnergyService) {}

  @Get()
  getHello(): string {
    this.energyService.fetchNowManually();
    return 'good!';
  }
}
