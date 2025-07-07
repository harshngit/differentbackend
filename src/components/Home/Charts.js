import React from 'react'

import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const Charts = ({ chartData }) => {
	return (
		<div className='bg-white shadow-lg m-5 px-3 rounded-md py-2 flex justify-center items-center flex-col'>
			<h1 className='font-[GilroyBold] text-xl'> Analysis </h1>
			<div>
				<Doughnut
					data={chartData}
					options={{
						plugins: {
							title: {
								display: true,
								text: "Order Status Breakdown",
							},
						},
					}}
				/>
			</div>
		</div>
	)
}

export default Charts