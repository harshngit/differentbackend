import React from 'react'
import LightBox from './LightBox'
import Details from './Details'
import { FaDeleteLeft } from 'react-icons/fa6'
import { MdDeleteForever } from 'react-icons/md'

const ViewProducts = ({ productDetails }) => {
	return (
		<div className='px-5 py-5 '>
			<div className='grid lg:grid-cols-2 grid-cols-1'>
				<div>
					<LightBox productDetails={productDetails} />
				</div>
				<div>
					<Details productDetails={productDetails} />
				</div>
			</div>
			{/* Variation */}
			<div className='w-full mt-10 mb-10'>
				<h2 className='text-[30px] mb-2 font-bold'>Variation</h2>
				<div className="grid grid-cols-6 px-5 py-5 bg-gray-400">
					<p>Image</p>
					<p>Quantity</p>
					<p>Size</p>
					<p>Price</p>
					<p>Color</p>
					<p>Action</p>
				</div>
				{
					productDetails?.variation?.map((item, index) => (
						<>
							<div key={index} className="grid grid-cols-6 px-5 py-5 bg-gray-100">
								<img className='w-12' src={item.img} alt={item.img} />
								<p>{item.quantity}</p>
								<p>{item.size.join(",")}</p>
								<p>{item.price}</p>
								<div className="w-6 h-6 rounded-full border" style={{ backgroundColor: item.color }}></div>
								<p><MdDeleteForever className='hover:text-red-700 text-[40px]' /></p>
							</div>
						</>
					))
				}
			</div>
		</div>
	)
}

export default ViewProducts