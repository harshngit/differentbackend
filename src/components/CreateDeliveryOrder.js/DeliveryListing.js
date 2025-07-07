import React from 'react'

const DeliveryListing = ({ pickupList, handleUpdateModal, fetchOrderDetails, setDeliveryId, orderList }) => {
    return (
        <div className='px-4 py-4' >
            <h3 className='font-[GilroyBold] text-center' >Delivery List</h3>
            <div className='mt-4' >
                <div className={`bg-gray-300 py-4 px-3 grid  gap-3 grid-flow-col  items-center justify-start grid-cols-4  `}>
                    <p className='col-span-1 text-center font-[GilroyMedium]' >Lr No</p>
                    <p className='col-span-2 text-center font-[GilroyMedium]' >Address</p>
                    <p className='col-span-1 text-center font-[GilroyMedium]' >Status</p>

                </div>

                {
                    orderList.map((item) => (
                        <div className={`bg-white border-[1px] border-gray-300 grid  gap-3 grid-flow-col  items-center justify-start grid-cols-4 `}>

                            <p className='col-span-1  px-1 py-2  text-[0.7rem] font-[GilroyMedium]' >
                                <p>{item?.lrno}</p>

                            </p>
                            <p className='col-span-2 px-1 py-2 my-0 border-x-[1px] border-gray-300 text-[0.7rem] font-[GilroyMedium]' >{item?.dropoff_location?.address}, {item?.dropoff_location?.city}, {item?.dropoff_location?.region}, {item?.dropoff_location?.zip},<p>{item?.dropoff_location?.phone}</p></p>
                            <p className='col-span-1 flex items-center justify-center py-2 font-[GilroyMedium]' >
                                <p onClick={() => {
                                    fetchOrderDetails(item?.lrno)
                                    handleUpdateModal()
                                    setDeliveryId(item?.lrno)
                                }} className='bg-black px-2 py-2 cursor-pointer rounded-lg text-[.6rem] font-[GilroyMedium] text-white' >Update</p>
                            </p>

                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default DeliveryListing