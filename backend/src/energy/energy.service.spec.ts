import { Test, TestingModule } from '@nestjs/testing';
import { EnergyService } from './energy.service';
import { getModelToken } from '@nestjs/mongoose';
import { Energy } from './schemas/energy.schema';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('EnergyService', () => {
  let service: EnergyService;
  let energyModel: any;

  beforeEach(async () => {
    const mockEnergyModel = {
      create: jest.fn(),
      find: jest.fn().mockReturnThis(),
      sort: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnergyService,
        {
          provide: getModelToken(Energy.name),
          useValue: mockEnergyModel,
        },
      ],
    }).compile();

    service = module.get<EnergyService>(EnergyService);
    energyModel = module.get(getModelToken(Energy.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getByDateRange', () => {
    it('should call find with correct date range', async () => {
      const start = '2023-01-01';
      const end = '2023-01-31';
      const mockData = [{ datetime: start, value: 100 }];

      energyModel.sort.mockResolvedValue(mockData);

      const result = await service.getByDateRange(start, end);

      expect(energyModel.find).toHaveBeenCalledWith({
        datetime: {
          $gte: start,
          $lte: end,
        },
      });
      expect(energyModel.sort).toHaveBeenCalledWith({ datetime: 1 });
      expect(result).toEqual(mockData);
    });
  });

  describe('fetchNowManually', () => {
    it('should call fetchAndSaveEnergyData', async () => {
      const spy = jest.spyOn(service, 'fetchAndSaveEnergyData').mockResolvedValue(undefined);
      await service.fetchNowManually();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('fetchAndSaveEnergyData', () => {
    it('should store energy data from API response', async () => {
      const mockResponse = {
        data: {
          included: [
            {
              type: 'generacion',
              attributes: {
                content: [
                  {
                    type: 'Hidráulica',
                    attributes: {
                      values: [
                        { datetime: '2019-01-01T00:00', value: 123 },
                      ],
                    },
                  },
                  {
                    type: 'Demanda en b.c.',
                    attributes: {
                      values: [
                        { datetime: '2019-01-01T01:00', value: 456 },
                      ],
                    },
                  },
                  {
                    type: 'Otra fuente',
                    attributes: {
                      values: [
                        { datetime: '2019-01-01T02:00', value: 789 },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      await service.fetchAndSaveEnergyData();

      expect(energyModel.create).toHaveBeenCalledTimes(2);
      expect(energyModel.create).toHaveBeenCalledWith({
        datetime: '2019-01-01T00:00',
        category: 'generacion',
        subcategory: 'Hidráulica',
        value: 123,
      });
      expect(energyModel.create).toHaveBeenCalledWith({
        datetime: '2019-01-01T01:00',
        category: 'generacion',
        subcategory: 'Demanda en b.c.',
        value: 456,
      });
    });

    it('should log warning if included is not an array', async () => {
      mockedAxios.get.mockResolvedValue({ data: {} });
      const logSpy = jest.spyOn(service['logger'], 'warn');

      await service.fetchAndSaveEnergyData();
      expect(logSpy).toHaveBeenCalledWith('No se encontraron valores en la respuesta.');
    });

    it('should log error on axios failure', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));
      const errorSpy = jest.spyOn(service['logger'], 'error');

      await service.fetchAndSaveEnergyData();
      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
