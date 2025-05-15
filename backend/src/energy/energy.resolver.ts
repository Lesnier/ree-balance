import { Resolver, Query, Args } from '@nestjs/graphql';
import { EnergyService } from './energy.service';
import { EnergyModel } from './models/energy.model';
import { DateRangeInput } from './dto/date-range.input';

@Resolver(() => EnergyModel)
export class EnergyResolver {
    constructor(private readonly energyService: EnergyService) {}

    @Query(() => [EnergyModel])
    async getEnergyByDateRange(
        @Args('range') range: DateRangeInput,
    ): Promise<EnergyModel[]> {
        return this.energyService.getByDateRange(range.startDate, range.endDate);
    }
}
