import React, { useState, useEffect } from 'react';
import { fetchAvailableCountries } from '@/utils/api';

export interface ICountry {
	name: string;
	countryCode: string;
}

export default function CountriesList() {
	const [countries, setCountries] = useState<ICountry[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [countriesPerPage, setCountriesPerPage] = useState(20);

	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const countriesFetch = await fetchAvailableCountries();
				setCountries(countriesFetch);
			} catch (error) {
				console.error('Error fetching countries:', error);
			}
		};

		fetchCountries();
	}, []);

	useEffect(() => {
		if (window.innerWidth >= 1024) {
			setCountriesPerPage(40);
		} else {
			setCountriesPerPage(20);
		}

		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setCountriesPerPage(40);
			} else {
				setCountriesPerPage(20);
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const indexOfLastCountry = currentPage * countriesPerPage;
	const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
	const currentCountries = countries.slice(
		indexOfFirstCountry,
		indexOfLastCountry,
	);

	const totalPages = Math.ceil(countries.length / countriesPerPage);

	const handlePageChange = (page: number) => {
		if (page < 1 || page > totalPages) return;
		setCurrentPage(page);
	};

	return (
		<div className='max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg'>
			<h1 className='text-xl sm:text-3xl md:text-4xl font-semibold text-gray-800 text-center mb-8'>
				Available Countries
			</h1>
			<ul className='space-y-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4'>
				{currentCountries.map((country) => (
					<li
						key={country.countryCode}
						className='flex items-center justify-between pr-2 p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out'
					>
						<span className='text-xl font-medium text-gray-600'>
							{country.countryCode}
						</span>
						<button
							className='px-2 py-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300'
							onClick={() =>
								(window.location.href = `/country/${country.countryCode}`)
							}
						>
							{country.name}
						</button>
					</li>
				))}
			</ul>

			<div className='flex justify-center mt-8 space-x-2'>
				<button
					className='px-4 py-2 bg-blue-600 text-white rounded-lg'
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					Prev
				</button>

				<div className='hidden sm:flex space-x-2'>
					{[...Array(totalPages)].map((_, index) => (
						<button
							key={index}
							className={`px-4 py-2 ${
								currentPage === index + 1
									? 'bg-blue-600 text-white'
									: 'bg-white text-blue-600'
							} rounded-lg`}
							onClick={() => handlePageChange(index + 1)}
						>
							{index + 1}
						</button>
					))}
				</div>

				<button
					className='px-4 py-2 bg-blue-600 text-white rounded-lg'
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					Next
				</button>
			</div>
		</div>
	);
}
