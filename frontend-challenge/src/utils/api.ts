import { ICountry } from '@/components/CountriesList';
import axios from 'axios';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const fetchAvailableCountries = async (): Promise<ICountry[]> => {
	const response = await api.get<ICountry[]>('/countries/available');
	return response.data;
};
export const fetchCountryInfo = async (countryCode: string) => {
	const response = await api.get(`/countries/info/${countryCode}`);
	return response.data;
};
