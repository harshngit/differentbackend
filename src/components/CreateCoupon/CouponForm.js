import { Button, Input, Radio } from '@material-tailwind/react'
import React from 'react'

const CouponForm = ({ couponID,
	setCouponID,
	couponIDdetails,
	setcouponIDdetails,
	couponName,
	setCouponName,
	couponAmountPercentage,
	setCouponAmountPercentage,
	couponAmountPrice,
	setCouponAmountPrice,
	couponCode,
	setCouponCode,
	couponAmountDetails,
	setCouponAmountDetails,
	couponExpireDate,
	setcouponExpireDate,
	loading,
	handleCouponCode,
}) => {
	return (
		<div className="bg-[#fff] w-full my-6 mx-6 rounded-lg py-5 px-5 h-[50vh] overflow-y-scroll">
			<h2 className="text-secondary font-bold text-[1.5rem]">Create Coupon</h2>
			<div className="flex flex-col justify-start items-end lg:flex-row gap-10 my-5">
				{/* Coupon ID Section */}
				<div className='w-[33.33%]'>
					<div className="flex gap-4 items-center mb-2">
						<Radio
							defaultChecked
							onChange={(e) => setcouponIDdetails(e.target.value)}
							value="manual"
							name="couponIDType"
							label="Manual"
						/>
						<Radio
							onChange={(e) => setcouponIDdetails(e.target.value)}
							value="automatic"
							name="couponIDType"
							label="Automatic"
						/>
					</div>
					<div className="w-[300px]">
						<Input
							label="Enter Coupon ID"
							value={couponID}
							onChange={(e) => setCouponID(e.target.value)}
							disabled={couponIDdetails === "automatic"}
						/>
					</div>
				</div>

				{/* Coupon Amount Section */}
				<div className='w-[33.33%]'>
					<div>
						<div className="flex gap-4 items-center mb-2">
							<Radio
								defaultChecked
								onChange={(e) => setCouponAmountDetails(e.target.value)}
								value="percentage"
								name="amountType"
								label="Percentage"
							/>
							<Radio
								onChange={(e) => setCouponAmountDetails(e.target.value)}
								value="price"
								name="amountType"
								label="Price"
							/>
						</div>
					</div>
					<div className="w-[300px]">
						{couponAmountDetails === "percentage" ? (<Input
							type="number"
							label="Enter Coupon Percentage"
							value={couponAmountPercentage}
							onChange={(e) => setCouponAmountPercentage(e.target.value)}
						/>) :
							(<Input
								type="number"
								label="Enter Coupon Price"
								value={couponAmountPrice}
								onChange={(e) => setCouponAmountPrice(e.target.value)}
							/>)}
					</div>
				</div>

				<div className='w-[33.33%] flex justify-end items-end'>
					<Input type='text' value={couponName} onChange={(e) => setCouponName(e.target.value)} label='Enter Coupon Name' />
				</div>
			</div>
			<div className="flex flex-col justify-start items-end lg:flex-row gap-10 my-5">
				{/* Coupon ID Section */}
				<div className='w-[25%]'>
					<Input type='text' value={couponCode} onChange={(e) => setCouponCode(e.target.value)} label='Enter Coupon Code' />
				</div>

				<div className='w-[25%] flex justify-end items-end'>
					<Input type='date' value={couponExpireDate} onChange={(e) => setcouponExpireDate(e.target.value)} label='Enter Coupon Expire Date' />
				</div>
			</div>



			<div className="flex justify-end mt-5">
				<Button
					onClick={handleCouponCode} disabled={loading}
				>
					{loading ? "Submitting" : "Create Coupon"}
				</Button>
			</div>
		</div>
	)
}

export default CouponForm