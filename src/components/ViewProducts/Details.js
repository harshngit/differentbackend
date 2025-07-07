import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const Details = ({ productDetails }) => {
	const [openIndex, setOpenIndex] = useState(null);

	const toggle = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const {
		productName,
		productPrice,
		productSku,
		productType,
		productStatus,
		productSize,
		productQuantity,
		variation = [],
		productMaterial,
		productDeliveryPayment,
		productDescription,
	} = productDetails || {};

	const data = [
		{
			title: 'Product Description',
			content: productDescription,
		},
		{
			title: 'Product Material',
			content: productMaterial,
		},
		{
			title: 'Product Delivery And Payment',
			content: productDeliveryPayment,
		},
	];

	return (
		<div className="px-5 py-5 w-full flex flex-col justify-start items-start gap-5">
			{/* Product Info */}
			<div className="flex justify-between items-center w-full">
				<p className="font-thin text-[15px] text-[#666666]">{productSku}</p>
				<p
					className={`col-span-1 font-medium text-center rounded-md border px-2 py-2
          ${productStatus === 'Published'
							? 'bg-green-100 text-green-600 border-green-600'
							: productStatus === 'Archived'
								? 'bg-red-100 text-red-600 border-red-600'
								: productStatus === 'Draft'
									? 'bg-gray-200 text-black border-black'
									: 'bg-blue-100 text-blue-700 border-blue-700'
						}`}
				>
					{productStatus}
				</p>
			</div>

			<div className="w-full">
				<h2 className="font-normal text-[25px] text-[#000]">{productName}</h2>
				<div className="flex items-center gap-5 mt-2">
					<h2 className="font-normal text-[27px] text-[#000]">Rs {productPrice}</h2>
				</div>
			</div>

			<div className="w-full">
				<p className="text-[18px] text-[#666666]">
					Only <span className="font-bold">{productQuantity}</span> item(s) left in stock!
				</p>
			</div>

			<div className="w-full">
				<div className="flex justify-between items-center mb-4">
					<div className="text-lg font-semibold">
						Size: <span className="font-normal">{productSize?.join(", ")}</span>
					</div>
				</div>
			</div>
			<div className="w-full">
				<div className="flex justify-between items-center mb-4">
					<div className="text-lg font-semibold">
						Size: <span className="font-normal">{productSize?.join(", ")}</span>
					</div>
				</div>
			</div>
			<div className="w-6 h-6 rounded-full border" style={{ backgroundColor: pr }}></div>

			{/* Accordion Section */}
			<div className="w-full mx-auto divide-y divide-gray-200">
				{data?.map((item, index) => (
					<div key={index}>
						<button
							className="w-full flex justify-between items-center py-3 font-normal text-[18px] text-left"
							onClick={() => toggle(index)}
						>
							{item?.title}
							<IoIosArrowDown
								className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
									}`}
							/>
						</button>
						<div
							className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index
								? 'max-h-[1000px] opacity-100'
								: 'max-h-0 opacity-0'
								}`}
						>
							<p className="py-2 text-gray-700">
								{(item?.content || '').replace(/<[^>]+>/g, '')}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Details;
