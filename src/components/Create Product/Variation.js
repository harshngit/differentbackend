import { Button, Input } from '@material-tailwind/react';
import React, { useState } from 'react';

const Variation = ({
	variation,
	setVariation,
	variationData,
	setvariationData,
	handlevariant,
	addImageVariant,
	uploading,
}) => {
	const [variantSizeInput, setVariantSizeInput] = useState("");

	const removevariation = (index) => {
		const newVariations = [...variation];
		newVariations.splice(index, 1);
		setVariation(newVariations);
	};

	const removeVariantSize = (idx) => {
		const updatedSizes = variationData.size.filter((_, i) => i !== idx);
		setvariationData((prev) => ({
			...prev,
			size: updatedSizes,
		}));
	};

	const addVariantSize = () => {
		const trimmedSize = variantSizeInput.trim();
		if (trimmedSize && !variationData.size.includes(trimmedSize)) {
			setvariationData((prev) => ({
				...prev,
				size: [...prev.size, trimmedSize],
			}));
			setVariantSizeInput("");
		}
	};

	return (
		<div>
			<div className='w-full'>
				<div className='my-6 gap-6 flex items-start flex-wrap justify-start'>
					<div className='w-[25%]'>
						<form
							onSubmit={addImageVariant}
							className='form flex items-center flex-col justify-center gap-2 my-2'
						>
							<input type='file' />
							<Button type='submit' disabled={uploading}>
								{uploading ? 'Uploading...' : 'Upload Image'}
							</Button>
						</form>
					</div>

					{/* Sizes Input (Multiple) */}
					<div className='w-[25%]'>
						<div className='mb-2'>
							<Input
								value={variantSizeInput}
								onChange={(e) => setVariantSizeInput(e.target.value)}
								label='Add Size'
							/>
							<Button
								size='sm'
								className='mt-2'
								onClick={addVariantSize}
							>
								Add Size
							</Button>
						</div>
						<div className='flex flex-wrap gap-2'>
							{variationData.size.map((sz, idx) => (
								<div
									key={idx}
									className='bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center gap-1'
								>
									{sz}
									<button
										type='button'
										onClick={() => removeVariantSize(idx)}
										className='text-red-600 hover:text-red-800'
									>
										×
									</button>
								</div>
							))}
						</div>
					</div>

					<div className='w-[25%]'>
						<Input
							value={variationData.color}
							onChange={(e) =>
								setvariationData({ ...variationData, color: e.target.value })
							}
							required
							type='color'
							label='Color'
						/>
					</div>

					<div className='w-[25%]'>
						<Input
							value={variationData.price}
							onChange={(e) =>
								setvariationData({ ...variationData, price: e.target.value })
							}
							required
							type='number'
							label='Price'
						/>
					</div>

					<div className='w-[25%]'>
						<Input
							value={variationData.quantity}
							onChange={(e) =>
								setvariationData({ ...variationData, quantity: e.target.value })
							}
							required
							type='number'
							label='Inventory'
						/>
					</div>
				</div>

				<div className='flex items-center justify-center'>
					<Button onClick={handlevariant}>Add More</Button>
				</div>

				<div className='my-4'>
					<div className='grid font-[GilroyMedium] bg-gray-200 px-4 py-3 grid-cols-6 grid-flow-col'>
						<p>Image</p>
						<p>Size</p>
						<p>Color</p>
						<p>Price</p>
						<p>Quantity</p>
						<p>Actions</p>
					</div>
					{variation.map((item, index) => (
						<div
							key={index}
							className='grid font-[GilroyMedium] bg-white my-0 px-4 py-3 grid-cols-6 grid-flow-col'
						>
							<img src={item.img} className='w-10' alt='' />
							<p>{Array.isArray(item.size) ? item.size.join(', ') : item.size}</p>
							<p>{item.color}</p>
							<p>{item.price}</p>
							<p>{item.quantity}</p>
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
	);
};

export default Variation;
