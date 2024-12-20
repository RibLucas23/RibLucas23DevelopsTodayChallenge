import CountriesList from '@/components/CountriesList';
import Head from 'next/head';

export default function Home() {
	return (
		<>
			<Head>
				<title>Countries List</title>
			</Head>
			<div>
				<CountriesList />
			</div>
		</>
	);
}
