import React from 'react'

const LrNoTable = ({ lrNolist, removelrno }) => {
	console.log(lrNolist)
	return (
		<div className='my-4'>
			<div className='grid font-[GilroyMedium] bg-gray-200 px-4 py-3 grid-cols-2 grid-flow-col' >

				<p>Lr Number</p>
				<p>Action</p>
			</div>
			{lrNolist?.map((item, index) => (
				<div key={index} className='grid font-[GilroyMedium] bg-white px-4 py-3 grid-cols-2 grid-flow-col' >

					<p>{item}</p>
					<p onClick={() => removelrno(item)} className='font-[GilroyBold] cursor-pointer' >X</p>
				</div>
			))}
		</div>
	)
}

export default LrNoTable