import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const NonPaginatedItem = ({
	itemsPerPage, filteredOrderList, showAdd, setShowAdd, setOrderID, handlePartnerModal, userProfile, deleteOrder, loadingOrder, setLoadingOrder, search, searchQuery, currentPage, setCurrentPage, orderList
}) => {
	return (
		<>
			<div className='h-[60vh] overflow-y-scroll'>
				{filteredOrderList?.map((item) => (
					<div className={`bg-white border-b-[1px]  border-gray-300 py-4 px-8 grid  gap-6 grid-flow-row grid-cols-2  items-center justify-start lg:grid-cols-5 `}>
						<Link to={`/orderDetails/${item?.lrno}`} > <p className='col-span-1 text-[0.8rem] underline hover:text-blue-400 font-[GilroyMedium]' >{item.lrno}</p></Link>
						{/* <p className='col-span-1 text-[0.8rem] font-[GilroyMedium]' >{item.orderID}</p> */}
						<div className='col-span-1 ' >
							<p className='text-[0.7rem] font-[GilroyMedium]' >{item?.createdAt?.toDate().toDateString()}</p>
							<p className='text-[0.7rem] font-[GilroyMedium]' >{item?.createdAt?.toDate().toLocaleTimeString()}</p>
						</div>
						<p className='col-span-1 text-[0.7rem] font-[GilroyMedium]' >{item?.customerName}</p>
						{/* {showAdd === item?.lrno ? (
								  <p className='col-span-1 relative text-[0.7rem] font-[GilroyMedium]' >
									<p onClick={() => setShowAdd('')} className='border-[1px] cursor-pointer absolute  right-[2px] flex items-center justify-center px-2  border-red-500 text-red-500 w-[20px] h-[20px] rounded-full' >X</p>
									<br />
									<span className='text-[0.6rem]' >{item?.dropoff_location?.address}</span>
					
								  </p>) : <p className='cursor-pointer text-[0.7rem] text-blue-400' onClick={(e) => setShowAdd(item?.lrno)}>{item?.dropoff_location?.consignee}</p>} */}
						{/* <p className='col-span-1 text-[0.7rem] font-[GilroyMedium]' >{item?.pickup_location?.city},{item?.pickup_location?.state}</p>
								<p className='col-span-1 text-[0.7rem] font-[GilroyMedium]' >{item?.dropoff_location?.city},<br />{item?.dropoff_location?.region}</p> */}

						<p className='col-span-1 uppercase text-[0.7rem] font-[GilroyMedium]' >{item?.orderStatus}</p>
						<div className='flex items-start justify-start ' >
							{item?.orderStatus === "new" && <Button onClick={() => {
								setOrderID(item?.id)
								handlePartnerModal()
							}} className='col-span-1 text-[.7rem] font-[GilroyMedium]' >Ship Now</Button>}
							{/* {userProfile?.role === "admin" && <div onClick={() => {
									deleteOrder(item?.id)
								  }} className='col-span-1 text-red-600 cursor-pointer w-[3rem] mx-2 font-[GilroyMedium]' ><TrashIcon /></div>} */}
							{/* {item?.orderStatus === "pickedUp" && <Button  onClick={()=>{
								setOrderID(item?.id)
									handlePartnerModal()
								}} className='col-span-1 text-[.7rem] font-[GilroyMedium]' >View Invoice</Button>} */}
							{item?.orderStatus === "delivered" && <a className='bg-black text-[0.7rem] py-2 px-5 font-[GilroyMedium] rounded-lg text-white' target='_blank' href={item?.pod} download={item?.pod}>View & Download POD</a>}
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default NonPaginatedItem