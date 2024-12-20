import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CountriesService {
  private readonly nagerBaseUrl = process.env.BASE_URL_NAGER;
  private readonly countriesNowBaseUrl = process.env.BASE_URL_COUNTRIES;

  async getAvailableCountries() {
    try {
      const response = await axios.get(
        `${this.nagerBaseUrl}/AvailableCountries`,
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Error fetching available countries',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCountryInfo(countryCode: string) {
    try {
      const borderResponse = await axios.get(
        `${this.nagerBaseUrl}/CountryInfo/${countryCode}`,
      );

      const populationResponse = await axios.post(
        `${this.countriesNowBaseUrl}/countries/population`,
        { country: borderResponse.data.commonName },
      );

      const flagResponse = await axios.post(
        `${this.countriesNowBaseUrl}/countries/flag/images`,
        { country: borderResponse.data.commonName },
      );

      return {
        name: borderResponse.data.commonName,
        borders: borderResponse.data.borders,
        population: populationResponse.data.data.populationCounts,
        flag: flagResponse.data.data.flag,
      };
    } catch (error) {
      throw new HttpException(
        'Error fetching country information',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
