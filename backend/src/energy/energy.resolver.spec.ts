import { Test, TestingModule } from '@nestjs/testing';
import { EnergyResolver } from './energy.resolver';
import { EnergyService } from './energy.service';
import { EnergyModel } from './models/energy.model';
import { DateRangeInput } from './dto/date-range.input';

describe('EnergyResolver', () => {
  let resolver: EnergyResolver;
  let service: EnergyService;

  const mockEnergyService = {
    getByDateRange: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnergyResolver,
        {
          provide: EnergyService,
          useValue: mockEnergyService,
        },
      ],
    }).compile();

    resolver = module.get<EnergyResolver>(EnergyResolver);
    service = module.get<EnergyService>(EnergyService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getEnergyByDateRange', () => {
    it('should return energy data for the given date range', async () => {
      const mockRange: DateRangeInput = {
        startDate: new Date('2023-01-01').toISOString()
            .split('T')[0],
        endDate: new Date('2023-01-31').toISOString()
            .split('T')[0],
      };

      const mockResult: EnergyModel[] = [
        {
          id: '1',
          value: 100,
          category:'Renovable',
          subcategory:'Hidráulica',
          datetime: new Date('2023-01-15').toISOString()
              .split('T')[0],
        } as EnergyModel,
      ];

      mockEnergyService.getByDateRange.mockResolvedValue(mockResult);

      const result = await resolver.getEnergyByDateRange(mockRange);

      expect(service.getByDateRange).toHaveBeenCalledWith(
          mockRange.startDate,
          mockRange.endDate,
      );
      expect(result).toEqual(mockResult);
    });
  });
});
