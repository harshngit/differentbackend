import React from 'react';
import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import { HiDotsHorizontal } from 'react-icons/hi';

const GiftCardLists = ({ deleteOrder, giftCards, setGiftCards }) => {
	return (
		<div className='px-5 pt-5'>
			<div className='flex justify-start px-5 py-5 items-end'>
				<h2 className='w-[50%] font-[GilroyBold] text-[25px]'>Gift Card List</h2>
			</div>

			{/* Table Headers */}
			<div className='bg-gray-300 py-4 px-8 grid gap-6 grid-cols-2 lg:grid-cols-6 items-center'>
				<p className='col-span-1 font-[GilroyMedium]'>Gift Card ID</p>
				<p className='col-span-1 font-[GilroyMedium]'>Product Name</p>
				<p className='col-span-1 font-[GilroyMedium]'>Created Date</p>
				<p className='col-span-1 font-[GilroyMedium]'>Gift Card Value</p>
				<p className='col-span-1 font-[GilroyMedium]'>Gift Card Status</p>
				<p className='col-span-1 font-[GilroyMedium]'>Action</p>
			</div>

			{/* Table Rows */}
			<div className='h-[60vh] overflow-y-scroll'>
				{giftCards?.map((item, index) => (
					<div key={item?.id || index}>
						<div className='bg-white py-4 px-8 grid gap-6 grid-cols-2 lg:grid-cols-6 items-center'>
							<p className='col-span-1 font-[GilroyMedium]'>{item?.id}</p>

							{/* Product Name: If array, show first name; if object, show directly */}
							<p className='col-span-1 font-[GilroyMedium]'>
								{Array.isArray(item?.product)
									? item.product[0]?.productName
									: item?.product?.productName || '—'}
							</p>

							{/* Created Date & Time */}
							<div className='col-span-1'>
								<p className='text-[0.7rem] font-[GilroyMedium]'>
									{item?.createdAt?.toDate().toDateString()}
								</p>
								<p className='text-[0.7rem] font-[GilroyMedium]'>
									{item?.createdAt?.toDate().toLocaleTimeString()}
								</p>
							</div>

							<p className='col-span-1 font-[GilroyMedium]'>{item?.value}</p>

							{/* Status */}
							<p
								className={`col-span-1 font-[GilroyMedium] text-center rounded-md border-[1px] px-2 py-2
									${item?.status === 'Active'
										? 'bg-green-100 text-green-600 border-green-600'
										: item?.status === 'Expired'
											? 'bg-red-100 text-red-600 border-red-600'
											: ''
									}`}
							>
								{item?.status}
							</p>

							{/* Actions */}
							<div className='col-span-1 font-[GilroyMedium]'>
								<Menu>
									<MenuHandler>
										<Button className="bg-transparent px-[10px] py-[10px] shadow-none hover:shadow-none">
											<HiDotsHorizontal className="text-black text-[1.3rem]" />
										</Button>
									</MenuHandler>
									<MenuList className="w-[150px] px-0 rounded-none">
										<MenuItem
											onClick={() => deleteOrder(item?.id)}
											className="px-6 text-red-600 font-[GilroyRegular]"
										>
											Delete Product
										</MenuItem>
									</MenuList>
								</Menu>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default GiftCardLists;
