import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { HttpException } from '@nestjs/common';

const countriesServiceMock = {
  getAvailableCountries: jest.fn(),
  getCountryInfo: jest.fn(),
};

describe('CountriesController', () => {
  let controller: CountriesController;
  let service: CountriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [
        { provide: CountriesService, useValue: countriesServiceMock },
      ],
    }).compile();

    controller = module.get<CountriesController>(CountriesController);
    service = module.get<CountriesService>(CountriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAvailableCountries', () => {
    it('should return a list of countries', async () => {
      const countriesMock = [{ name: 'Argentina', countryCode: 'AR' }];
      countriesServiceMock.getAvailableCountries.mockResolvedValue(
        countriesMock,
      );

      const result = await controller.getAvailableCountries();
      expect(result).toEqual(countriesMock);
    });

    it('should throw an error if service fails', async () => {
      countriesServiceMock.getAvailableCountries.mockRejectedValue(
        new HttpException('Error fetching available countries', 400),
      );

      await expect(controller.getAvailableCountries()).rejects.toThrow(
        new HttpException('Error fetching available countries', 400),
      );
    });
  });

  describe('getCountryInfo', () => {
    it('should return country info', async () => {
      const countryCode = 'AR';
      const countryInfoMock = {
        name: 'Argentina',
        borders: ['BR', 'CL'],
        population: [10000000],
        flag: 'url_to_flag',
      };

      countriesServiceMock.getCountryInfo.mockResolvedValue(countryInfoMock);

      const result = await controller.getCountryInfo(countryCode);
      expect(result).toEqual(countryInfoMock);
    });

    it('should throw an error if service fails', async () => {
      countriesServiceMock.getCountryInfo.mockRejectedValue(
        new HttpException('Error fetching country information', 400),
      );

      await expect(controller.getCountryInfo('AR')).rejects.toThrow(
        new HttpException('Error fetching country information', 400),
      );
    });
  });
});
