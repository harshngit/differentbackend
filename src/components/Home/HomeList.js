import { Button } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'

const HomeList = ({ totalOrderList, userProfile }) => {
	return (
		<div className='bg-white shadow-lg mt-5 mr-10 px-5 py-2 rounded-md h-[340px]'>
			<div className='flex justify-between items-center pb-2 border-b-[1px] border-[#cecece]'>
				<h1 className='font-[GilroyBold] text-xl'> Order List </h1>
				{
					userProfile?.role === "admin" &&
					<Link to="/create-order">
						<Button className=''>+ Create Order</Button>
					</Link>
				}
			</div>
			<div className='mt-2 grid grid-cols-3 pb-2 border-b-[1px] border-[#cecece]'>
				<p>Lr Number</p>
				<p>Client</p>
				<p>Order Status</p>
			</div>
			{totalOrderList?.slice(0, 5)?.map((item, index) => (
				<div key={index} className='mt-2 grid grid-cols-3  pb-2 gap-5 border-b-[1px] border-[#cecece]'>
					<p className='text-left text-[12px]'>{item?.lrno}</p>
					<p className='text-left  text-[12px]'>{item?.userName}</p>
					<p className='text-left  text-[12px]'>{item?.orderStatus}</p>
				</div>
			))}
		</div>
	)
}

export default HomeList