import { TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'

const DboyList = ({ deliverytData, deleteOrder }) => {
	console.log(deliverytData)
	return (
		<>
			<div className=''>
				<div className={`bg-gray-300  py-4 px-8 grid  gap-6 grid-flow-row  items-center justify-start grid-cols-2 lg:grid-cols-7  `}>
					<p className='col-span-1 font-[GilroyMedium]' >Delivery boy</p>
					<p className='col-span-1 font-[GilroyMedium]' >Created Date</p>
					<p className='col-span-1 font-[GilroyMedium]' >Lr no</p>
					<p className='col-span-1 font-[GilroyMedium]' >Vehicle no</p>
					<p className='col-span-1 font-[GilroyMedium]' >Delivery Status</p>
					<p className='col-span-1 font-[GilroyMedium]' >Action</p>
				</div>
				{
					deliverytData?.map((item) => (
						<div
							className={`bg-white border-b-[1px] border-gray-300 py-4 px-8 grid gap-6 grid-flow-row grid-cols-2 items-center justify-start lg:grid-cols-7`}
						>
							<p className="col-span-1 font-[GilroyMedium]">{item?.user?.name}</p>
							<p className="col-span-1 font-[GilroyMedium]">
								{item?.createdAt.toDate().toDateString()},
								{item?.createdAt?.toDate().toLocaleTimeString()}
							</p>
							<p className="col-span-1 font-[GilroyMedium]">
								{/* Join the lrNumber array into a comma-separated string */}
								{item?.lrNumber?.join(", ")}
							</p>
							<p className="col-span-1 font-[GilroyMedium]">{item?.vehicleNo}</p>
							<p className="col-span-1 font-[GilroyMedium]">{item?.deliveryBoyStatus}</p>
							<div
								onClick={() => {
									deleteOrder(item?.id);
								}}
								className="col-span-1 text-red-600 cursor-pointer w-[1.4rem] mx-2 font-[GilroyMedium]"
							>
								<TrashIcon />
							</div>
						</div>
					))
				}
			</div>
		</>
	)
}

export default DboyList