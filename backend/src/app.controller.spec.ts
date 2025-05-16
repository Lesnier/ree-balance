import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnergyService } from './energy/energy.service';

describe('AppController', () => {
  let appController: AppController;
  let energyService: EnergyService;

  const mockEnergyService = {
    fetchNowManually: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: EnergyService, useValue: mockEnergyService },
      ],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    energyService = moduleRef.get<EnergyService>(EnergyService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getHello', () => {
    it('should call fetchNowManually and return "good!"', () => {
      const result = appController.getHello();
      expect(mockEnergyService.fetchNowManually).toHaveBeenCalled();
      expect(result).toBe('good!');
    });
  });
});
