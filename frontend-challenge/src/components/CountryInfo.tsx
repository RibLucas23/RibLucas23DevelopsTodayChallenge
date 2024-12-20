import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchCountryInfo } from '@/utils/api';

interface ICountryInfo {
	name: string;
	flagUrl: string;
	borders: { name: string; countryCode: string }[];
	populationData: { year: number; population: number }[];
}

export default function CountryInfo() {
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
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>
				<img
					src={countryInfo.flagUrl}
					alt={`${countryInfo.name} flag`}
					style={{ width: '50px', height: '30px', marginRight: '10px' }}
				/>
				{countryInfo.name}
			</h1>

			<h2>Border Countries:</h2>
			<ul>
				{countryInfo.borders.map((border) => (
					<li key={border.countryCode}>
						<a href={`/country/${border.countryCode}`}>{border.name}</a>
					</li>
				))}
			</ul>
		</div>
	);
}
