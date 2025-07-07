import { Button, Input, Option, Select } from '@material-tailwind/react'
import React from 'react'

const Dimensions = ({ step, setStep, dimension, setDimension, dimentionData, setDimentionData, subOrders, setSubOrders, dropLocation, setDropLocation, mode, setMode, amount, setAmount, weight, setWeight, consigneeGST, setConsigneeGST, sellerGST, setSellerGST, orderID, setOrderID, insuranceType, setInsuranceType, lrDetails, setLrDetails, lrNumber, setLrNumber, handleDimensionData, removeDimesion }) => {
    return (
        <div className='bg-white px-6 py-3 my-4 ' >
            <h3 className='font-[GilroyBold]' >Product Details</h3>

            <div className='w-[800px]' >
                <div className='my-6  gap-6 flex items-center flex-wrap justify-start' >
                    <div  >
                        <Input
                            value={dimentionData.p_name} onChange={(e) => setDimentionData({ ...dimentionData, p_name: e.target.value })}
                            required={true} label='Product Name' />
                    </div>
                    <div  >
                        <Input type='number'
                            value={dimentionData.p_qty} onChange={(e) => setDimentionData({ ...dimentionData, p_qty: e.target.value })}
                            required={true} label='Product Quantity' />
                    </div>
                    <div  >
                        <Input type='number'
                            value={dimentionData.p_price} onChange={(e) => setDimentionData({ ...dimentionData, p_price: e.target.value })}
                            required={true} label='Product Price' />
                    </div>

                    <div  >
                        <Input type='number'
                            value={dimentionData.p_size} onChange={(e) => setDimentionData({ ...dimentionData, p_size: e.target.value })}
                            required={true} label='Product Size' />
                    </div>
                </div>
                <div>
                    <div className='flex items-center justify-center' >
                        <Button onClick={handleDimensionData} >Add More</Button>
                    </div>
                </div>
                <div className=' my-4' >
                    <div className=' grid font-[GilroyMedium] bg-gray-200 px-4 py-3 grid-cols-5 grid-flow-col' >

                        <p>Product Name</p>
                        <p>Product Quantity</p>
                        <p>Product Price</p>
                        <p>Product Size</p>

                        <p>Actions</p>
                    </div>
                    {
                        dimension?.map((item) => (
                            <div className='grid font-[GilroyMedium] bg-white my-0 px-4 py-3 grid-cols-5 grid-flow-col' >

                                <p>{item.p_name}</p>
                                <p>{item.p_qty}</p>
                                <p>{item.p_price}</p>
                                <p>{item.p_size}</p>

                                <p onClick={() => removeDimesion(item.name)} className='font-[GilroyBold] cursor-pointer' >X</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Dimensions