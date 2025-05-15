import { Test, TestingModule } from '@nestjs/testing';
import { EnergyResolver } from './energy.resolver';

describe('EnergyResolver', () => {
  let resolver: EnergyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnergyResolver],
    }).compile();

    resolver = module.get<EnergyResolver>(EnergyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
