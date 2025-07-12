import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const Charts = ({ chartData, type = "line" }) => {
	return (
		<div className='bg-white p-4 rounded-lg shadow-lg'>
			{type === 'bar' ? (
				<Bar data={chartData} options={{ responsive: true }} />
			) : (
				<Line data={chartData} options={{ responsive: true }} />
			)}
		</div>
	);
};

export default Charts;
