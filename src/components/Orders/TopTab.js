import React from 'react'

const TopTab = ({ activeTab, setActiveTab, orderList }) => {
    const getOrderCount = (status) => {
        if (status === "all") return orderList?.length || 0;
        return orderList?.filter(order => order.status === status)?.length || 0;
    };
    // const getOrderCountnew = (status) => {
    //     if (status === "all") return orderList?.length || 0;
    //     return orderList?.filter(order => order.status === status)?.length || 0;
    // };

    const statuses = ["all", "new", "delivered", "in transit", "picked up", "pre created"];
    console.log(orderList?.length)
    const activeClass = "font-[GilroyMedium] text-[1.3rem] border-b-[2px] border-[#3D3B40] cursor-pointer "
    const inActiveClass = "font-[GilroyMedium] text-[1.3rem] border-b-[2px] border-transparent cursor-pointer hover:border-b-[2px] hover:border-[#3D3B40]"
    return (
        <div className='mt-3 border-[1px] border-gray-200  bg-white py-6 px-12 ' >
            <div className='flex items-center gap-12 justify-between' >
                <div className='flex items-center gap-12 justify-start'>
                    <div onClick={() => setActiveTab("all")} className={activeTab === "all" ? activeClass : inActiveClass} >
                        <p>All </p>
                    </div>
                    <div onClick={() => setActiveTab("new")} className={activeTab === "new" ? activeClass : inActiveClass} >
                        <p>New</p>
                    </div>
                    <div onClick={() => setActiveTab("delivered")} className={activeTab === "delivered" ? activeClass : inActiveClass} >
                        <p>Delivered</p>
                    </div>
                    <div onClick={() => setActiveTab("in-transit")} className={activeTab === "in-transit" ? activeClass : inActiveClass} >
                        <p>In Transit</p>
                    </div>
                    <div onClick={() => setActiveTab("pickedUp")} className={activeTab === "pickedUp" ? activeClass : inActiveClass} >
                        <p>Picked Up</p>
                    </div>
                    {/* <div onClick={() => setActiveTab("preCreated")} className={activeTab === "preCreated" ? activeClass : inActiveClass} >
                        <p>Pre Created</p>
                    </div> */}
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

export default TopTab