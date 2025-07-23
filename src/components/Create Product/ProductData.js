import { Button, Input } from '@material-tailwind/react'
import React from 'react'

const ProductData = ({
	productDataNew,
	setproductDataNew,
	productData,
	setProductData,
	handleProductdata,
}) => {
	const removevariation = (index) => {
		const newVariations = [...productData];
		newVariations.splice(index, 1);
		setProductData(newVariations);
	};

	return (
		<div>
			<div className='w-full'>
				<div className='my-6 gap-6 flex items-start flex-wrap justify-start'>
					<div className='w-[20%]'>
						<Input
							value={productDataNew.productSize}
							onChange={(e) =>
								setproductDataNew({ ...productDataNew, productSize: e.target.value })
							}
							// type='number'
							label='Product Size'
						/>
					</div>
					<div className='w-[20%]'>
						<Input
							value={productDataNew.productColor}
							type='color'
							onChange={(e) =>
								setproductDataNew({ ...productDataNew, productColor: e.target.value })
							}
							label='Product Color'
						/>
					</div>
					<div className='w-[20%]'>
						<Input
							value={productDataNew.productPrice}
							onChange={(e) =>
								setproductDataNew({ ...productDataNew, productPrice: e.target.value })
							}
							label='Product Price'
						/>
					</div>
					<div className='w-[20%]'>
						<Input
							value={productDataNew.productInventory}
							onChange={(e) =>
								setproductDataNew({ ...productDataNew, productInventory: e.target.value })
							}
							label='Product Inventory'
						/>
					</div>
				</div>
				<div className='flex items-center justify-center'>
					<Button onClick={handleProductdata}>Add More</Button>
				</div>
				<div className='my-4'>
					<div className='grid font-[GilroyMedium] bg-gray-200 px-4 py-3 grid-cols-6 grid-flow-col'>
						<p>Size</p>
						<p>Color</p>
						<p>Price</p>
						<p>Quantity</p>
						<p>Actions</p>
					</div>
					{productData.map((item, index) => (
						<div
							key={index}
							className='grid font-[GilroyMedium] bg-white my-0 px-4 py-3 grid-cols-6 grid-flow-col'
						>
							<p>{item.productSize}</p>
							<div className='w-5 h-5 border-1 rounded-full border-[#000]' style={{ background: item.productColor }}></div>
							<p>{item.productPrice}</p>
							<p>{item.productInventory}</p>
							<p
								onClick={() => removevariation(index)}
								className='font-[GilroyBold] cursor-pointer'
							>
								X
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default ProductData