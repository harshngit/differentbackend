import { Button, Input, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import React from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import TopFilter from './TopFilter';

const ProductLists = ({ productList, deleteOrder, handleStatusChange, filterBySearch, activeTab, setActiveTab }) => {
	console.log(productList)
	return (
		<div className=''>
			<div className='flex justify-start px-5 py-5 items-end'>
				<h2 className='w-[50%] font-[GilroyBold] text-[25px]'>Product List</h2>
				<div className="relative flex w-[50%] justify-end items-end gap-2 md:w-max">
					<Input
						type="search"
						onChange={filterBySearch}
						placeholder="Product Id"
						containerProps={{
							className: "lg:min-w-[450px]",
						}}
						className=" !border-t-blue-gray-200 outline-none bg-white pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-200"
						labelProps={{
							className: "before:content-none after:content-none",
						}}
					/>
					<div className="!absolute left-3 top-[13px]">
						<CiSearch />
					</div>
				</div>
			</div>
			<div>
				<TopFilter setActiveTab={setActiveTab} activeTab={activeTab} />
			</div>
			<div className={`bg-gray-300  py-4 px-8 grid  gap-6 grid-flow-row  items-center justify-start grid-cols-2 lg:grid-cols-9  `}>
				<p className='col-span-1 font-[GilroyMedium]' >Product ID</p>
				<p className='col-span-1 font-[GilroyMedium]' >Product Name</p>
				<p className='col-span-1 font-[GilroyMedium]' >Created Date</p>
				{/* <p className='col-span-1 font-[GilroyMedium]' >Order ID</p> */}
				<p className='col-span-1 font-[GilroyMedium]' >Product Category</p>
				<p className='col-span-1 font-[GilroyMedium]' >Product Price </p>
				<p className='col-span-1 font-[GilroyMedium]' >Product Inventory</p>
				<p className='col-span-1 font-[GilroyMedium]' >Product Type</p>

				<p className='col-span-1 font-[GilroyMedium]' >Product Status</p>
				<p className='col-span-1 font-[GilroyMedium]' >Action</p>
			</div>
			<div className='h-[60vh] overflow-y-scroll'>
				{productList?.map((item) => (
					<div>
						<div className={`bg-white  py-4 px-8 grid  gap-6 grid-flow-row  items-center justify-start grid-cols-2 lg:grid-cols-9  `}>
							<p className='col-span-1 font-[GilroyMedium]' >{item?.id}</p>
							<p className='col-span-1 font-[GilroyMedium]' >{item?.productName}</p>
							<div className='col-span-1 ' >
								<p className='text-[0.7rem] font-[GilroyMedium]' >{item?.createdAtDate?.toDate().toDateString()}</p>
								<p className='text-[0.7rem] font-[GilroyMedium]' >{item?.createdAtDate?.toDate().toLocaleTimeString()}</p>
							</div>
							{/* <p className='col-span-1 font-[GilroyMedium]' >Order ID</p> */}
							<p className='col-span-1 font-[GilroyMedium]' >{item?.productCategory}</p>
							<p className='col-span-1 font-[GilroyMedium]' >{item?.productPrice} </p>
							<p className='col-span-1 font-[GilroyMedium]' >{item?.productQuantity}</p>
							<p className='col-span-1 font-[GilroyMedium]' >{item?.productType}</p>

							<p
								className={`col-span-1 font-[GilroyMedium] text-center rounded-md border-[1px] px-2 py-2
		${item?.productStatus === "Published" ? "bg-green-100 text-green-600 border-green-600" :
										item?.productStatus === "Archived" ? "bg-red-100 text-red-600 border-red-600" :
											item?.productStatus === "Draft" ? "bg-gray-200 text-black border-black" :
												"bg-blue-100 text-blue-700 border-blue-700"}`}
							>
								{item?.productStatus}
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

										<Link className="outline-none border-none"
											to={`/editproduct/${item?.id}`}
										>
											<MenuItem className="border-b-[1px] rounded-none px-0 border-gray-300 ">
												<p className="px-6 text-black font-[GilroyRegular]">
													{" "}
													Edit Product
												</p>
											</MenuItem>
										</Link>
										<Link className="outline-none border-none"
											to={`/productdetails/${item?.id}`}
										>
											<MenuItem className="border-b-[1px] rounded-none px-0 border-gray-300 ">
												<p className="px-6 text-black font-[GilroyRegular]">
													{" "}
													View Product
												</p>
											</MenuItem>
										</Link>
										<MenuItem onClick={() => {
											deleteOrder(item?.id)
										}} className=" rounded-none  px-0 border-gray-300 ">
											<p className="px-6  text-red-600 font-[GilroyRegular]">
												Delete Product
											</p>
										</MenuItem>
										{item?.productStatus !== "Published" && (
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
										)}
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

export default ProductLists