import React from 'react'

const TopMenu = ({ setActiveTab, activeTab }) => {
	const activeClass = "font-[GilroyMedium] text-[1.3rem] border-b-[2px] border-[#3D3B40] cursor-pointer "
	const inActiveClass = "font-[GilroyMedium] text-[1.3rem] border-b-[2px] border-transparent cursor-pointer hover:border-b-[2px] hover:border-[#3D3B40]"
	return (
		<div className='mt-3 border-[1px] border-gray-200  bg-white py-6 px-12 ' >
			<div className='flex items-center gap-12 justify-start' >
				<div onClick={() => setActiveTab("all")} className={activeTab === "all" ? activeClass : inActiveClass} >
					<p>All</p>
				</div>
				<div onClick={() => setActiveTab("currentday")} className={activeTab === "currentday" ? activeClass : inActiveClass} >
					<p>Current Day</p>
				</div>
			</div>
		</div>
	)
}

export default TopMenu