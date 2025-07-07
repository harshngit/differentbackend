import React from 'react'

const TopFilter = ({ activeTab, setActiveTab }) => {
	const activeClass = "font-[GilroyMedium] text-[1.3rem] border-b-[2px] border-[#3D3B40] cursor-pointer "
	const inActiveClass = "font-[GilroyMedium] text-[1.3rem] border-b-[2px] border-transparent cursor-pointer hover:border-b-[2px] hover:border-[#3D3B40]"
	return (
		<div className='mt-3 border-[1px] border-gray-200  bg-white py-6 px-12 ' >
			<div className='flex items-center gap-12 justify-between' >
				<div className='flex items-center gap-12 justify-start'>
					<div onClick={() => setActiveTab("All")} className={activeTab === "All" ? activeClass : inActiveClass} >
						<p>All </p>
					</div>
					<div onClick={() => setActiveTab("Draft")} className={activeTab === "Draft" ? activeClass : inActiveClass} >
						<p>Draft</p>
					</div>
					<div onClick={() => setActiveTab("Active")} className={activeTab === "Active" ? activeClass : inActiveClass} >
						<p>Active</p>
					</div>
					<div onClick={() => setActiveTab("Published")} className={activeTab === "Published" ? activeClass : inActiveClass} >
						<p>Published</p>
					</div>
					<div onClick={() => setActiveTab("Archived")} className={activeTab === "Archived" ? activeClass : inActiveClass} >
						<p>Archived</p>
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

export default TopFilter