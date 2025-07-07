import React from 'react'
import { FaBoxOpen, FaTruckLoading } from 'react-icons/fa'
import { FaTruckFast } from 'react-icons/fa6'

const AnalysisBox = ({ orderDeliveryList, totalOrderList, orderInTransitList }) => {
	return (
		<>
			<div className='ml-10 mt-5 font-semibold font-[GilroyBold] text-xl'>Dashboard</div>
			<div className='m-10 grid grid-cols-3 gap-10'>
				<div className='bg-white shadow-lg rounded-lg py-3 px-6 flex flex-col'>
					<div className='flex justify-between items-center'>
						<div className=' w-[70px] h-[70px] rounded-full text-center  flex justify-center items-center bg-[#fceac1]'>
							<FaTruckLoading className='text-[#FFB200] text-[40px]' />
						</div>
						<div className='text-right pt-2'>
							<h3 className='font-[GilroyMedium]'>Total Order</h3>
							<h1 className='font-[GilroyBold] text-[40px]'>{totalOrderList?.length}</h1>
						</div>
					</div>
				</div>
				<div className='bg-white shadow-lg rounded-lg py-3 px-6 flex flex-col'>
					<div className='flex justify-between items-center'>
						<div className=' w-[70px] h-[70px] rounded-full text-center  flex justify-center items-center bg-[#fceac1]'>
							<FaBoxOpen className='text-[#FFB200] text-[40px]' />
						</div>
						<div className='text-right pt-2'>
							<h3 className='font-[GilroyMedium]'>Order In Transit</h3>
							<h1 className='font-[GilroyBold] text-[40px]'>{orderInTransitList?.length}</h1>
						</div>
					</div>
				</div>
				<div className='bg-white shadow-lg rounded-lg py-3 px-6 flex flex-col'>
					<div className='flex justify-between items-center'>
						<div className=' w-[70px] h-[70px] rounded-full text-center  flex justify-center items-center bg-[#fceac1]'>
							<FaTruckFast className='text-[#FFB200] text-[40px]' />
						</div>
						<div className='text-right pt-2'>
							<h3 className='font-[GilroyMedium]'>Order Delivered</h3>
							<h1 className='font-[GilroyBold] text-[40px]'>{orderDeliveryList?.length}</h1>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default AnalysisBox