import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { IoChevronDownSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ShippinglabelAdmin from '../../pages/ShippinglabelAdmin';

const ViewOrderDetails = ({ orderDetails, generateForwardingNumber, loadingPod, handleUpdateModal, addPOD, id }) => {
    const { error, loading, isAuthenticated, users, userProfile } = useSelector(
        (state) => state.user
    );
    const [totalBox, setTotalBox] = useState(0)
    const [showLabel, setShowLabel] = useState(false)

    console.log(orderDetails)

    const getBoxes = () => {

        let totalBoxes = 0
        orderDetails?.dimensions?.map((d) => {
            totalBoxes = Number(totalBoxes) + Number(d?.count)

        })
        return totalBoxes
        console.log(totalBoxes)


    }

    const Openlabel = () => {
        setShowLabel(true)
    }

    useEffect(() => {

        getBoxes()
    }, [])

    return (
        <>
            <div className='col-span-4 mx-3 py-4' >
                <div className='flex items-center justify-between' >
                    {/* <h3 className='text-[1.2rem] text-gray-600 font-[GilroyMedium] ' >{orderDetails?.pickup_location?.pickupName?.companyName}: <span className='font-[GilroyBold] text-black' >{orderDetails?.lrno}</span> </h3> */}
                    {userProfile?.role === "admin" && <Link to={`/editorder/${id}`}><Button>Edit Order</Button></Link>}
                    {/* <Menu>
                        <MenuHandler>
                            <Button className="text-[#fff] bg-[#000] flex items-center gap-1 lg:gap-1 px-[16px] py-[10px] shadow-none  hover:shadow-none" >

                                <span className='font-[GilroyMedium] text-[0.6rem] lg:text-[.9rem] text-[#fff] ' >Print</span>
                                <IoChevronDownSharp />
                            </Button>
                        </MenuHandler>
                        <MenuList>
                            <Link to={`/orderDetails/waybill/${id}`} className='text-left' ><MenuItem>Waybill</MenuItem></Link>
                            <Link to={`/orderDetails/shippinglabel/${id}`}><MenuItem>Shipping Label</MenuItem></Link>
                        </MenuList>
                    </Menu> */}
                </div>
                <div className='grid  grid-cols-5  my-3 gap-6 grid-flow-col ' >
                    <div className='col-span-2 w-full py-6 h-auto rounded-lg border-[1px] border-gray-200 px-6 bg-white' >
                        <div className='flex items-center justify-between ' >
                            <h4 className='font-[GilroyBold] text-[1.5rem]' >Order Details</h4>
                            <div className='bg-green-600 capitalize rounded-lg py-2 px-6 text-white' >{orderDetails?.orderStatus}</div>
                        </div>
                        <div className='my-3' >
                            {/* <h3 className='text-[1.2rem] font-[GilroyMedium] '>LR No: {orderDetails?.lrno} </h3> */}
                            <div className='my-3' >
                                <h4 className='font-[GilroyMedium] text-gray-700' >Order ID:</h4>
                                <p className='font-[GilroyBold] text-[1.2rem]' >{orderDetails?.OrderID}</p>
                            </div>
                            <div className='my-3 flex items-center justify-between' >
                                <div>
                                    <h4 className='font-[GilroyMedium] text-gray-700' >Customer Name:</h4>
                                    <p className='font-[GilroyBold] text-[1.2rem]' >{orderDetails?.customerName}</p>
                                </div>
                                {/* {userProfile?.role === "admin" && orderDetails?.orderStatus === "pickedUp" && !orderDetails?.forwardingNumber && <div className='' >
                                    <button onClick={generateForwardingNumber} className='outline-none bg-black py-3 px-4 text-[.7rem] text-white rounded-lg' >Generate Forwarding Number</button>
                                </div>} */}
                            </div>
                            {/* <div className='my-3 flex items-center justify-between' >
                                <div>
                                    <h4 className='font-[GilroyMedium] text-gray-700' >Shipment Type:</h4>
                                    <p className='font-[GilroyBold] text-[1.2rem]' >{orderDetails?.d_mode}</p>
                                </div>
                                <div>
                                    <h4 className='font-[GilroyMedium] text-gray-700' >Chargable Weight:</h4>
                                    <p className='font-[GilroyBold] text-[1.2rem]' >{Math.ceil(orderDetails?.totalChargeableWeight
                                    )} kgs</p>
                                </div>
                            </div> */}
                            <div className='my-6 flex items-center justify-between' >
                                <div>
                                    <h4 className='font-[GilroyMedium] text-gray-700' >No of Products:</h4>
                                    <p className='font-[GilroyBold] text-[1.2rem]' >{orderDetails?.dimensions?.length}</p>
                                </div>
                                {/* <div>
                    <h4 className='font-[GilroyMedium] text-gray-700' >ROV Type:</h4>
                    <p className='font-[GilroyBold] text-[1.2rem]' >{userProfile?.insuranceType}</p>
                    </div> */}
                            </div>
                            <div className='my-3' >
                                <h4 className='font-[GilroyMedium] text-gray-700' >Reciever Details:</h4>
                                <p className='font-[GilroyMedium] text-[1rem]' >{orderDetails?.customerName}, {orderDetails?.dropoff_location?.address}, {orderDetails?.dropoff_location?.city}, {orderDetails?.dropoff_location?.region}, {orderDetails?.dropoff_location?.zip}</p>
                            </div>
                        </div>
                        {orderDetails?.orderStatus === "delivered" && orderDetails?.pod && <div className='flex items-center justify-between my-8' >
                            <h3 className='font-[GilroyBold] text-[1.5rem] mt-4' >View POD</h3>
                            <a className='bg-black py-3 px-6 font-[GilroyMedium] rounded-lg text-white' href={orderDetails?.pod} download>Check POD</a>
                        </div>}
                        {orderDetails?.orderStatus === "delivered" && userProfile.role === "admin" && <div>
                            <h3 className='font-[GilroyBold] text-[1.5rem] mt-4 mb-2' >Upload POD</h3>
                            <div>
                                <form onSubmit={addPOD} className='form flex items-start gap-5 flex-col justify-center'>
                                    <input type='file' />
                                    <Button className='' type='submit' size="md">{loadingPod ? "Uploading" : "Upload Pod"}</Button>
                                </form>
                            </div>
                        </div>}
                        <div className='h-[200px] overflow-y-scroll'>
                            <h4 className='font-[GilroyMedium] text-gray-700' >Product Details:</h4>
                            {orderDetails?.dimensions?.map((activity) => (
                                <div className='shadow-md rounded-lg my-3 border-[1px] border-gray-300 py-3 px-4 grid grid-cols-3 grid-flow-col' >
                                    <div>
                                        <h3 className='text-gray-500 text-[.8rem] font-[GilroyMedium] mb-2' >Product Name</h3>
                                        <p className='font-[GilroyBold] capitalize' >{activity?.p_name}</p>
                                    </div>
                                    <div>
                                        <h3 className='text-gray-500 text-[.8rem] font-[GilroyMedium] mb-2' >Inventory</h3>
                                        <p className='font-[GilroyBold]' >{activity?.p_qty}</p>
                                        {/* <p className='text-[.8rem]' >{activity?.time?.toDate().toString().slice(0, 25)}</p> */}
                                    </div>
                                    <div>
                                        <h3 className='text-gray-500 text-[.8rem] font-[GilroyMedium] mb-2' >Price</h3>
                                        <p className='font-[GilroyBold]' >{activity?.p_price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='h-[200px] overflow-y-scroll'>
                            <h4 className='font-[GilroyMedium] text-gray-700' >Invoice Details:</h4>
                            {orderDetails?.invoices?.map((activity) => (
                                <div className='shadow-md rounded-lg my-3 border-[1px] border-gray-300 py-3 px-4 grid grid-cols-2 grid-flow-col' >
                                    <div>
                                        <h3 className='text-gray-500 text-[.8rem] font-[GilroyMedium] mb-2' >Invoice No.</h3>
                                        <p className='font-[GilroyBold] capitalize' >{activity?.ident}</p>
                                    </div>
                                    <div>
                                        <h3 className='text-gray-500 text-[.8rem] font-[GilroyMedium] mb-2' >Invoice Price</h3>
                                        <p className='font-[GilroyBold]' >{activity?.n_value}</p>
                                        {/* <p className='text-[.8rem]' >{activity?.time?.toDate().toString().slice(0, 25)}</p> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='col-span-3 w-full py-6 rounded-lg border-[1px] border-gray-200 px-3 bg-white'>
                        <div className='flex items-center justify-between' >
                            <h3 className='font-[GilroyMedium] text-[1.4rem] ' >Status</h3>
                            {userProfile?.role === "admin" && <div>
                                <button onClick={handleUpdateModal} className='outline-none bg-black py-3 px-4 text-[.7rem] text-white rounded-lg'>Update Status</button>
                            </div>}
                        </div>
                        <div className='h-[100vh] overflow-y-scroll mt-2'>
                            {orderDetails?.orderActivity?.map((activity) => (
                                <div className='shadow-md rounded-lg my-3 border-[1px] border-gray-300 py-3 px-4 grid grid-cols-3 grid-flow-col' >
                                    <div>
                                        <h3 className='text-gray-500 text-[.8rem] font-[GilroyMedium] mb-2' >Status</h3>
                                        <p className='font-[GilroyBold] capitalize' >{activity?.status}</p>
                                    </div>
                                    <div>
                                        <h3 className='text-gray-500 text-[.8rem] font-[GilroyMedium] mb-2' >Location</h3>
                                        <p className='font-[GilroyBold]' >{activity?.location}</p>
                                        <p className='text-[.8rem]' >{activity?.time?.toDate().toString().slice(0, 25)}</p>
                                    </div>
                                    <div>
                                        <h3 className='text-gray-500 text-[.8rem] font-[GilroyMedium] mb-2' >Remark</h3>
                                        <p className='font-[GilroyBold]' >{activity?.remark}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ViewOrderDetails