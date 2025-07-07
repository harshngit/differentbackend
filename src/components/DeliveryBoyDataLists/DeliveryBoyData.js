import React from 'react'
import TopMenu from './TopMenu'
import DBoyList from '../DeliveryBoylist/DBoyList'


const DeliveryBoyData = ({ setActiveTab, activeTab, deliverytData, deleteOrder }) => {
	return (
		<div className='h-[105vh] mx-4 bg-gray-100' >
			<div className='mt-[10px]' >
				<div className='lg:grid grid-cols-6 items-center grid-flow-col' >
					<div className='col-span-1' >
						<h3 className='font-[GilroyBold] text-[1.5rem]' >Delivery Boy List</h3>
					</div>
				</div>
			</div>
			<TopMenu activeTab={activeTab} setActiveTab={setActiveTab} />
			<DBoyList deleteOrder={deleteOrder} deliverytData={deliverytData} />
		</div>
	)
}

export default DeliveryBoyData