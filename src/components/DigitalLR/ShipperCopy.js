import React, { useRef } from 'react'
import Grclogo from "../../asset/grc-logo.png"
import QRCode from "react-qr-code";
import ReactToPrint from 'react-to-print';
import { Button } from '@material-tailwind/react';
import Barcode from 'react-barcode';
const ShipperCopy = ({ id, orderDetail }) => {
    let componentRef = useRef();
    const getBoxes = () => {

        let totalBoxes = 0
        orderDetail?.dimensions?.map((d) => {
            totalBoxes = Number(totalBoxes) + Number(d?.count)

        })
        return totalBoxes
        console.log(totalBoxes)


    }
    return (
        <>
            <ReactToPrint
                className=""
                trigger={() => <Button>Print this out!</Button>}
                content={() => componentRef}
            />


            <div ref={(el) => (componentRef = el)} className='my-6 border-[1px] min-w-[1000px] max-w-[1200px] border-gray-600 ' >
                <div className='border-b-[1px] border-gray-600  grid grid-flow-col grid-cols-5' >
                    <div className='col-span-3 py-4 px-2 border-r-[1px] border-gray-600 gap-16 flex items-center justify-between' >
                        <div  >
                            <img className='w-[120px]' src={Grclogo} />
                            <p>GRC Express and Logistics PVT LTD</p>
                        </div>
                        <div  >
                            <p className='font-[600] text-[0.8rem]' >Web:  <span >https://grclogistics.com</span></p>
                            <p className='font-[600] text-[0.8rem]' >Email:  <span >info@grclogistics.com</span></p>
                            <p className='font-[600] text-[0.8rem]' >GST No:  <span >27AAECG9349K1Z1</span></p>
                        </div>
                    </div>
                    <div className='col-span-1 py-4 px-2 border-r-[1px] border-gray-600  flex items-center justify-center' >
                        <Barcode value={id} size={64} className="w-[150px]" />
                    </div>
                    <div className='col-span-1 py-4 px-2 border-r-[1px] border-gray-600 flex-col  flex items-center justify-center' >
                        <h6 className='text-blue-600 font-[600]' >Booking Date:</h6>
                        <p>{orderDetail?.createdAt?.toDate().toDateString()}</p>
                    </div>
                </div>
                <div className='grid grid-cols-3 grid-flow-col'>


                    <div className='border-[1px] border-gray-600' >
                        <div className='border-b-[1px] text-center  text-[0.8rem] border-gray-600' >
                            SHIPPER
                        </div>
                        <div className='border-b-[1px] py-6 px-3 text-center border-gray-600'>
                            <p className='text-[1.2rem] font-[600]' >{orderDetail?.pickup_location?.pickupName?.companyName}</p>
                            <p className='text-[.8rem] font-[500]'>{orderDetail?.pickup_location?.address}</p>
                            <p className='text-[.9rem] font-[500]'>{orderDetail?.pickup_location?.pinCode}, {orderDetail?.pickup_location?.city}, {orderDetail?.pickup_location?.phone}</p>
                        </div>
                        <div className='border-b-[1px] grid grid-cols-3  text-center   border-gray-600'>
                            <div className='border-[1px] border-gray-600' >
                                <div className='border-b-[1px] text-center  text-[0.8rem] border-gray-600' >
                                    PACKETS
                                </div>

                                <p className='font-[GilroyBold] text-[1.2rem]' >{getBoxes()}</p>
                            </div>
                            <div className='border-[1px] border-gray-600' >
                                <div className='border-b-[1px] text-center  text-[0.8rem] border-gray-600' >
                                    Actual Weight
                                </div>

                                <p className='font-[GilroyBold] text-[1.2rem]' >{(orderDetail?.weight) / 1000}kgs</p>
                            </div>
                            <div className='border-[1px] border-gray-600' >
                                <div className='border-b-[1px] text-center  text-[0.8rem] border-gray-600' >
                                    Volumetric Weight
                                </div>

                                <p className='font-[GilroyBold] text-[1.2rem]' >{Math.ceil(orderDetail?.totalChargeableWeight)} kgs</p>
                            </div>
                        </div>
                        <div className=''>
                            <div className='border-b-[1px] text-center  text-[0.8rem] border-gray-600' >
                                VOLUMETRIC WEIGHT CONVERSION (IN CMS)
                            </div>
                            <div className='grid grid-cols-4 grid-flow-col' >
                                <div className='border-r-[1px] text-center border-gray-600' >L</div>
                                <div className='border-r-[1px] text-center border-gray-600'>W</div>
                                <div className='border-r-[1px] text-center border-gray-600'>H</div>
                                <div className='text-center' >Qty</div>
                            </div>
                            {orderDetail?.dimensions?.map((dimension) => (
                                <div className='grid border-[1px] border-gray-600 grid-cols-4 grid-flow-col' >
                                    <div className='border-r-[1px] text-center border-gray-600' >{dimension.length}</div>
                                    <div className='border-r-[1px] text-center border-gray-600'>{dimension.width}</div>
                                    <div className='border-r-[1px] text-center border-gray-600'>{dimension.height}</div>
                                    <div className='text-center' >{dimension.count}</div>
                                </div>
                            ))}
                            <div>

                            </div>
                        </div>
                    </div>

                    <div className='border-[1px] border-gray-600' >
                        <div className='border-b-[1px] text-center  text-[0.8rem] border-gray-600' >
                            CONSIGNEE
                        </div>
                        <div className='border-b-[1px] py-6 px-3 text-center border-gray-600'>
                            <p className='text-[1.2rem] font-[600]' >{orderDetail?.dropoff_location?.companyName}</p>
                            <p className='text-[.8rem] font-[500]'>{orderDetail?.dropoff_location?.address}</p>
                            <p className='text-[.9rem] font-[500]'>{orderDetail?.dropoff_location?.zip}, {orderDetail?.dropoff_location?.city}, {orderDetail?.dropoff_location?.phone}</p>
                        </div>
                        <div className='border-b-[1px] font-[600] text-red-600 text-center  text-[0.8rem] border-gray-600' >
                            CONSIGNMENT NO.
                        </div>
                        <div className='border-b-[1px] py-3 px-3 text-center border-gray-600'>
                            <p className='text-[1.2rem] font-[600]' >{orderDetail?.lrno}</p>

                        </div>
                        <div className='border-b-[1px] font-[600]  text-center  text-[0.8rem] border-gray-600' >
                            Remark
                        </div>

                    </div>


                    <div className='border-[1px] border-gray-600' >
                        <div className='border-b-[1px] grid grid-cols-2  text-center   border-gray-600'>
                            <div className='border-[1px] border-gray-600' >
                                <div className='border-b-[1px] text-center  text-[0.8rem] border-gray-600' >
                                    ORIGIN
                                </div>
                                <p className='font-[GilroyBold] text-[1.2rem]' >{orderDetail?.pickup_location?.pinCode}</p>
                            </div>
                            <div className='border-[1px] border-gray-600' >
                                <div className='border-b-[1px] text-center  text-[0.8rem] border-gray-600' >
                                    DESTINATION
                                </div>

                                <p className='font-[GilroyBold] text-[1.2rem]' >{orderDetail?.dropoff_location?.zip}</p>
                            </div>

                        </div>
                        <div className='border-b-[1px] text-center  text-[1rem] border-gray-600' >
                            Order ID.
                        </div>
                        <div className='border-b-[1px] text-center font-[600]  text-[1rem] border-gray-600' >
                            {orderDetail?.orderID}
                        </div>
                        <div className=''>
                            <div className='border-b-[1px] text-center  text-[0.8rem] border-gray-600' >
                                Invoice Details
                            </div>
                            <div className='grid grid-cols-3 grid-flow-col' >
                                <div className='border-r-[1px] text-center border-gray-600' >INV.NO </div>
                                <div className='border-r-[1px] text-center border-gray-600'>INV.Value</div>
                                <div className='border-r-[1px] text-center border-gray-600'>EWB</div>
                            </div>
                            {orderDetail?.invoices?.map((dimension) => (
                                <div className='grid border-[1px] border-gray-600 grid-cols-3 grid-flow-col' >
                                    <div className='border-r-[1px] text-center border-gray-600' >{dimension.ident}</div>
                                    <div className='border-r-[1px] text-center border-gray-600'>{dimension.n_value}</div>
                                    <div className='border-r-[1px] text-center border-gray-600'>{dimension.ewaybill}</div>
                                    <div className='text-center' >{dimension.count}</div>
                                </div>
                            ))}
                            <div className='border-b-[1px] py-4 px-3 text-center border-gray-600'>
                                <p>Received above Shipment along with all document order in good condition.</p>
                                <div className='flex items-center px-6 justify-between mt-24' >
                                    <div>
                                        <p>Signature</p>
                                    </div>
                                    <div>
                                        <p>Stamp</p>
                                    </div>
                                </div>
                            </div>
                            <div className='py-4 px-3 text-center '>
                                <p>Document Type : <span className='font-[600]' >  SHIPPER COPY</span></p>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ShipperCopy