import React from 'react'

const TopInventoryNav = ({ activeTab, setActiveTab, orderList }) => {
	console.log(orderList?.length)
	const activeClass = "font-[GilroyMedium] text-[1.3rem] border-b-[2px] border-[#3D3B40] cursor-pointer "
	const inActiveClass = "font-[GilroyMedium] text-[1.3rem] border-b-[2px] border-transparent cursor-pointer hover:border-b-[2px] hover:border-[#3D3B40]"
	return (
		<div className='mt-3 border-[1px] border-gray-200  bg-white py-6 px-12 ' >
			<div className='flex items-center gap-12 justify-between' >
				<div className='flex items-center gap-12 justify-start'>
					<div onClick={() => setActiveTab("Available")} className={activeTab === "Available" ? activeClass : inActiveClass} >
						<p>Available</p>
					</div>
					<div onClick={() => setActiveTab("Committed")} className={activeTab === "Committed" ? activeClass : inActiveClass} >
						<p>Committed</p>
					</div>
					<div onClick={() => setActiveTab("Unavailable")} className={activeTab === "Unavailable" ? activeClass : inActiveClass} >
						<p>Unavailable</p>
					</div>
				</div>
				{/* <div className='font-[GilroyMedium] bg-[#c9fcc5] py-2 px-2 border-[2px] border-[#2fa127] rounded-lg  text-[1rem]'>
					<p>{activeTab.toUpperCase()} = ({getOrderCount()})</p>
				</div> */}
				{/* {statuses.map((status) => (
				<div
					key={status}
					className={activeTab === status ? "active-tab" : "inactive-tab"}
					onClick={() => setActiveTab(status)}
				>
					{status.toUpperCase()} ({getOrderCount(status)})
				</div>
			))} */}
			</div>
		</div>
	)
}

export default TopInventoryNav