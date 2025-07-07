import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import React from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'

const CouponList = ({ coupon, deleteOrder }) => {
	return (
		<div className=''>
			<div className={`bg-gray-300  py-4 px-8 grid  gap-6 grid-flow-row  items-center justify-start grid-cols-2 lg:grid-cols-8  `}>
				<p className='col-span-1 font-[GilroyMedium]' >Coupon ID</p>
				<p className='col-span-1 font-[GilroyMedium]' >Coupon Name</p>
				<p className='col-span-1 font-[GilroyMedium]' >Created Date</p>
				<p className='col-span-1 font-[GilroyMedium]' >Coupon Code</p>
				<p className='col-span-1 font-[GilroyMedium]' >Coupon Amount </p>
				<p className='col-span-1 font-[GilroyMedium]' >Coupon Expire Date</p>
				<p className='col-span-1 font-[GilroyMedium]' >Coupon Status </p>
				<p className='col-span-1 font-[GilroyMedium]' >Action</p>
			</div>
			<div className='h-[30vh] overflow-y-scroll'>
				{coupon?.map((item) => (
					<div>
						<div className={`bg-white  py-4 px-8 grid  gap-6 grid-flow-row  items-center justify-start grid-cols-2 lg:grid-cols-8  `}>
							<p className='col-span-1 font-[GilroyMedium]' >{item?.id}</p>
							<p className='col-span-1 font-[GilroyMedium]' >{item?.couponName}</p>
							<div className='col-span-1 ' >
								<p className='text-[0.7rem] font-[GilroyMedium]' >{item?.createdAtDate?.toDate().toDateString()}</p>
								<p className='text-[0.7rem] font-[GilroyMedium]' >{item?.createdAtDate?.toDate().toLocaleTimeString()}</p>
							</div>
							{/* <p className='col-span-1 font-[GilroyMedium]' >Order ID</p> */}
							<p className='col-span-1 font-[GilroyMedium]' >{item?.couponCode}</p>
							{item?.couponAmountDetails === "price" ? <p className='col-span-1 font-[GilroyMedium]' >RS{item?.couponAmount} </p> :
								<p className='col-span-1 font-[GilroyMedium]' >{item?.couponAmount}% </p>}
							<p className='col-span-1 font-[GilroyMedium]' >{item?.couponExpireDate}</p>

							<p
								className={`col-span-1 font-[GilroyMedium] text-center rounded-md border-[1px] px-2 py-2
		${item?.couponStatus === "Active" ? "bg-green-100 text-green-600 border-green-600" :
										item?.couponStatus === "Expired" ? "bg-red-100 text-red-600 border-red-600" :
											""}`}
							>
								{item?.couponStatus}
							</p>
							<div className='col-span-1 font-[GilroyMedium]' >
								<Menu className=" rounded-none px-0 py-0">
									<MenuHandler>
										<Button className="bg-transparent px-[10px] py-[10px] shadow-none  hover:shadow-none">
											<p className="flex items-center justify-end gap-2">
												<HiDotsHorizontal className="text-black text-[1.3rem]" />{" "}
											</p>
										</Button>
									</MenuHandler>
									<MenuList className="w-[150px] px-0 rounded-none">

										{/* <Link className="outline-none border-none"
											to={`/editproduct/${item?.id}`}
										>
											<MenuItem className="border-b-[1px] rounded-none px-0 border-gray-300 ">
												<p className="px-6 text-black font-[GilroyRegular]">
													{" "}
													Edit Product
												</p>
											</MenuItem>
										</Link> */}
										<MenuItem onClick={() => deleteOrder(item?.id)} className=" rounded-none  px-0 border-gray-300 ">
											<p className="px-6  text-red-600 font-[GilroyRegular]">
												Delete Product
											</p>
										</MenuItem>
										{/* {item?.productStatus !== "Published" && (
											<MenuItem
												className="rounded-none px-0 border-gray-300"
												onClick={() => handleStatusChange(item?.id, "Published")}
											>
												<p className="px-6 text-green-500 font-[GilroyRegular]">Published</p>
											</MenuItem>
										)}
										{item?.productStatus !== "Archived" && (<MenuItem className=" rounded-none  px-0 border-gray-300 "
											onClick={() => handleStatusChange(item.id, "Archived")}
										>
											<p className="px-6  text-red-600 font-[GilroyRegular]">
												Archived
											</p>
										</MenuItem>)}
										{item?.productStatus !== "Draft" && (<MenuItem className=" rounded-none  px-0 border-gray-300 "
											onClick={() => handleStatusChange(item.id, "Draft")}
										>
											<p className="px-6  text-black font-[GilroyRegular]">
												Draft
											</p>
										</MenuItem>)}
										{item?.productStatus !== "Active" && (
											<MenuItem className="rounded-none px-0 border-gray-300"
												onClick={() => handleStatusChange(item.id, "Active")}
											>
												<p className="px-6 text-blue-500 font-[GilroyRegular]">
													Active
												</p>
											</MenuItem>
										)} */}
									</MenuList>
								</Menu>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default CouponList