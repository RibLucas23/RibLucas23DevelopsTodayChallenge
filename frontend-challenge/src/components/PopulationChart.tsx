import React from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from 'victory';

const PopulationChart = ({
	populationData,
}: {
	populationData: { year: number; value: number }[];
}) => {
	return (
		<div className='p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-xl border border-gray-200'>
			<h2 className='sm:text-3xl font-semibold text-center mb-8 text-gray-800'>
				Population Over Time
			</h2>
			<VictoryChart
				theme={VictoryTheme.material}
				width={800}
				height={400}
				padding={{ top: 50, left: 120, right: 50, bottom: 60 }}
			>
				<VictoryAxis
					label='Year'
					tickFormat={(x) => `${x}`}
					style={{
						axisLabel: {
							fontSize: 20,
							padding: 30,
							fill: '#4B5563',
							fontWeight: 'bold',
						},
						tickLabels: {
							fontSize: 16,
							padding: 10,
							fill: '#4B5563',
							fontWeight: 'bold',
						},
					}}
				/>

				<VictoryAxis
					dependentAxis
					label='Population'
					tickFormat={(y) => `${y.toLocaleString()}`}
					style={{
						axisLabel: {
							fontSize: 20,
							padding: 100,
							fill: '#4B5563',
							fontWeight: 'bold',
						},
						tickLabels: {
							fontSize: 15,
							padding: 0,
							fill: '#4B5563',
							fontWeight: 'bold',
						},
					}}
				/>

				<VictoryLine
					data={populationData}
					x='year'
					y='value'
					style={{
						data: { stroke: '#4CAF50', strokeWidth: 3 },
					}}
				/>
			</VictoryChart>
		</div>
	);
};

export default PopulationChart;
