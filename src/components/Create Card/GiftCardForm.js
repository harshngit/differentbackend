import { Button, Input, Option, Select } from '@material-tailwind/react'
import React from 'react'
import Autocompletegiftcard from './Autocompletegiftcard'
import { PencilIcon } from '@heroicons/react/24/outline'

const GiftCardForm = ({
	giftCardCode,
	setGiftCardCode,
	giftCardValue,
	setGiftCardValue,
	giftCardProduct,
	setGiftCardProduct,
	giftCardExpiryDate,
	setGiftCardExoiryDate,
	loading,
	setLoading,
	handleGiftCard,
	productName,
	product,
	setProduct,
	handleGenerateCode,
}) => {
	return (
		<div className="bg-[#fff] my-6 mx-6 rounded-lg py-5 px-5 h-[40vh] overflow-y-scroll">
			<h2 className="text-secondary font-bold text-[1.5rem]">Create Gitt Card</h2>
			<div className="flex justify-start items-start mt-3 gap-10">
				<div className='w-1/2'>
					{Object.keys(product).length === 0 ? <Autocompletegiftcard selected={giftCardProduct} setSelected={setGiftCardProduct} placeholder="Enter Product Name" data={productName} /> : <div>
						<div className=' flex items-center justify-end' >
							<PencilIcon className='w-[25px] cursor-pointer'
								onClick={() => setProduct({})}

							/>
						</div>
						<h3 className='text-[.8rem]' >{product.productName}, {product.productSku}</h3>

					</div>}
				</div>
				<div className='w-1/2'>
					<Input
						value={giftCardValue} placeholder='Enter Your Gift Value' onChange={(e) => setGiftCardValue(e.target.value)}
						label='Gift Value' />
				</div>
			</div>
			<div className="flex justify-start items-start mt-3 gap-10">
				<div className='w-1/2'>
					<Input
						value={giftCardCode} placeholder='Enter Your Card Code' onChange={(e) => setGiftCardCode(e.target.value)}
						label='Card Code' />
					<Button onClick={handleGenerateCode} className='mt-2'>Generate Code</Button>
				</div>
				<div className='w-1/2'>
					<Input
						type='date'
						value={giftCardExpiryDate} placeholder='Enter Gift Expiry Date' onChange={(e) => setGiftCardExoiryDate(e.target.value)}
						label='Gift Expiry Date' />
				</div>
			</div>
			<div className='flex justify-end items-end'>
				<Button disabled={loading} onClick={handleGiftCard}>
					{loading ? "Submitting" : "Create Gift Card"}
				</Button>
			</div>
		</div>
	)
}

export default GiftCardForm