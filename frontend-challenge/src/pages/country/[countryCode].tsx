import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchCountryInfo } from '@/utils/api';
import PopulationChart from '@/components/PopulationChart';
import Head from 'next/head';

interface ICountryInfo {
	name: string;
	flag: string;
	borders: {
		commonName: string;
		countryCode: string;
	}[];
	population: { year: number; value: number }[];
}

const CountryInfo = () => {
	const [countryInfo, setCountryInfo] = useState<ICountryInfo | null>(null);
	const router = useRouter();
	const { countryCode } = router.query;

	useEffect(() => {
		if (countryCode) {
			const fetchData = async () => {
				const data = await fetchCountryInfo(countryCode as string);
				setCountryInfo(data);
			};
			fetchData();
		}
	}, [countryCode]);

	if (!countryInfo) {
		return <div className='text-center text-xl'>Loading...</div>;
	}

	return (
		<>
			<Head>
				<title>{countryInfo.name} - Country Details</title>
			</Head>
			<div className='max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-8'>
				<div className='flex items-center justify-center space-x-4'>
					<img
						src={countryInfo.flag}
						alt={`${countryInfo.name} flag`}
						className='w-16 h-10 object-contain'
					/>
					<h1 className='text-2xl md:text-4xl font-bold'>
						{countryInfo.name}
					</h1>
				</div>

				<div>
					<h2 className='text-xl md:text-2xl font-semibold'>
						Border Countries:
					</h2>
					<ul className='list-disc pl-5 mt-2'>
						{countryInfo.borders.length > 0 ? (
							countryInfo.borders.map((border) => (
								<li key={border.countryCode} className=' md:text-lg'>
									<a
										href={`/country/${border.countryCode}`}
										className='text-blue-600 hover:text-blue-800'
									>
										{border.commonName}
									</a>
								</li>
							))
						) : (
							<li className='text-lg text-gray-500'>
								No bordering countries found.
							</li>
						)}
					</ul>
				</div>

				<div>
					{countryInfo.population && countryInfo.population.length > 0 ? (
						<PopulationChart populationData={countryInfo.population} />
					) : (
						<div className='text-lg text-gray-500'>
							No population data available.
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default CountryInfo;
