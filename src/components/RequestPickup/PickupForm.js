import { Input, Select, Option, Button } from '@material-tailwind/react'
import React from 'react'
import AutocompleteInput from '../CreateOrder/AutocompleteInput'
import { PencilIcon } from '@heroicons/react/24/outline'

const PickupForm = ({ pickupData, setPickupData, handlePickup, warehouseList, warehouseLocation, setWarehouseLocation }) => {
  return (
    <div className='' >
      <div className='bg-white px-12 mx-6 my-6 py-4' >
        <h4 className='font-[GilroyBold] text-[1.4rem] ' >New Pickup Request</h4>
        <div className='flex gap-6 items-center my-3 justify-start ' >
          {Object.keys(warehouseLocation).length === 0 ? <AutocompleteInput selected={warehouseLocation} setSelected={setWarehouseLocation} placeholder="Enter Pickup Location" data={warehouseList} /> : <div>
            <div className=' flex items-center justify-end' >
              <PencilIcon className='w-[25px] cursor-pointer' onClick={() => setWarehouseLocation({})} />
            </div>
            <h3 className='text-[.8rem]' >{warehouseLocation?.pickupName?.name}, {warehouseLocation?.pinCode}</h3>
            <h3 className='text-[.8rem]' >{warehouseLocation?.address}, {warehouseLocation?.city}, {warehouseLocation?.state}</h3>

          </div>}
          <Input value={pickupData.packages} onChange={(e) => setPickupData({ ...pickupData, packages: e.target.value })} className=' font-[GilroyMedium] ' label='Expected Packages' />
        </div>
        <div className='flex gap-6 items-center my-3 justify-start ' >
          <Input value={pickupData.date} onChange={(e) => setPickupData({ ...pickupData, date: e.target.value })} type='date' className=' font-[GilroyMedium] ' label='Pickup Date' />
          <Select value={pickupData.time} onChange={(e) => setPickupData({ ...pickupData, time: e })} className=' font-[GilroyMedium] ' label='Pickup Time' >
            <Option value="10:00am - 12:00am" >10:00am - 12:00am</Option>
            <Option value="12:00am - 2:00pm" >12:00am - 2:00pm</Option>
            <Option value='2:00pm - 4:00pm' >2:00pm - 4:00pm</Option>
            <Option value="4:00pm - 6:00pm" >4:00pm - 6:00pm</Option>
            <Option value="6:00pm - 8:00pm" >6:00pm - 8:00pm</Option>
          </Select>
        </div>
        <div>
          <Button onClick={handlePickup} className='font-[GilroyBold] py-3 px-8' >Book Pickup</Button>
        </div>

      </div>
    </div>
  )
}

export default PickupForm