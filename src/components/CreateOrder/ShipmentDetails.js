import { Input, Option, Radio, Select } from '@material-tailwind/react'
import React from 'react'
import AutocompleteInput from './AutocompleteInput'
import { PencilIcon } from '@heroicons/react/20/solid'
import AutocompleteUser from '../ManageWarehouse/AutocompleteUser'

const ShipmentDetails = ({ id, customerName,
  setCustomerName, step, setStep, dimension, setDimension, dimentionData, setDimentionData, subOrders, setSubOrders, dropLocation, setDropLocation, mode, setMode, amount, setAmount, weight, setWeight, consigneeGST, setConsigneeGST, sellerGST, setSellerGST, orderID, setOrderID, lrDetails, setLrDetails, lrNumber, setLrNumber, warehouseList, pickupLocation, setPickupLocation, userList, user, setUser, orderList, setTotalbox, totalbox }) => {
  console.log(pickupLocation)
  const date = new Date()
  console.log(userList)
  return (
    <div className='my-4 bg-white  px-6 py-3' >
      <h4 className='font-[GilroyBold] border-b-[2px] border-black py-2 w-[160px] ' >Add Order Details</h4>
      <div>
        <div className='my-6' >
          <h4 className='font-[GilroyMedium]' >Order Details</h4>
          {/* <div className='ml-[-10px]' >
            <Radio defaultChecked={true} onChange={(e) => setLrDetails(e.target.value)} value="manual" name='type' label="Manual" />
            <Radio onChange={(e) => {
              setLrDetails(e.target.value)
            }} value="automatic" name='type' label="Automatic" />
          </div> */}
          <div className='flex justify-start gap-5 items-center'>
            <div className='w-[400px] my-2' >
              <Input value={id} onChange={(e) => setOrderID(e.target.value)} disabled={lrDetails === "automatic" ? true : false} label='Enter Order ID' />
            </div>
            <div className='w-[350px]'>
              <Input
                value={customerName} onChange={(e) => setCustomerName(e.target.value)}
                label='Enter Customer Name' />
            </div>
          </div>
        </div>
        <div className='my-6' >
          {/* <h4 className='font-[GilroyMedium]' >Shipment Details</h4> */}

          <div className='flex-wrap gap-3 flex items-center justify-start  my-2' >
            {/* <div className='w-[350px]' >
              {Object.keys(user).length === 0 ? <AutocompleteUser selected={user} setSelected={setUser} placeholder="Enter Client Name" data={userList} /> : <div>
                <div className=' flex items-center justify-end' >
                  <PencilIcon className='w-[25px] cursor-pointer' onClick={() => setUser({})} />
                </div>
                <h3 className='text-[.8rem]' >{user.name}, {user.email}</h3>
                <h3 className='text-[.8rem]' >{user.companyName}</h3>

              </div>}
            </div>
            <div className='w-[350px]' >
              {Object.keys(pickupLocation).length === 0 ? <AutocompleteInput selected={pickupLocation} setSelected={setPickupLocation} placeholder="Enter Pickup Location" data={warehouseList} /> : <div>
                <div className=' flex items-center justify-end' >
                  <PencilIcon className='w-[25px] cursor-pointer' onClick={() => setPickupLocation({})} />
                </div>
                <h3 className='text-[.8rem]' >{pickupLocation?.pickupName?.name}, {pickupLocation.pinCode}</h3>
                <h3 className='text-[.8rem]' >{pickupLocation.address}, {pickupLocation.city}, {pickupLocation.state}</h3>

              </div>}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShipmentDetails