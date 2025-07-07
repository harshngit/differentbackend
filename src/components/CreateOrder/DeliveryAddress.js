import { Input } from '@material-tailwind/react'
import React from 'react'
import { pinCodeList } from '../../data/pinCodeData'

const DeliveryAddress = ({ dropLocation, setDropLocation, customerName, setCustomerName }) => {
  const getCityandState = (pin) => {
    pinCodeList.map((zip) => {
      if (zip.Pin === Number(pin)) {
        setDropLocation({ ...dropLocation, city: zip.FacilityCity, region: zip.FacilityState, zip: pin })

      }
    })
  }
  return (
    <div className='bg-white px-6 my-3 py-3' >
      <h3 className='font-[GilroyBold]' >Add Delivery Details</h3>
      <div className='flex items-center flex-wrap my-3 justify-start gap-4' >

        <div className='w-[300px]'>
          <Input
            value={customerName} disabled onChange={(e) => setCustomerName(e.target.value)}
            label='Customer Name' />
        </div>
        <div className='w-[300px]'>
          <Input type='number' value={dropLocation.phone} onChange={(e) => setDropLocation({ ...dropLocation, phone: e.target.value })} label='Contact No' />
        </div>
        <div className='w-[300px]'>
          <Input value={dropLocation.address} onChange={(e) => setDropLocation({ ...dropLocation, address: e.target.value })} label='Address' />
        </div>
        <div className='w-[300px]'>
          <Input value={dropLocation.zip} onChange={(e) => {
            setDropLocation({ ...dropLocation, zip: e.target.value })
            getCityandState(e.target.value)
          }} label='Pincode' />
        </div>
        <div className='w-[300px]'>
          <Input value={dropLocation.city} onChange={(e) => setDropLocation({ ...dropLocation, city: e.target.value })} label='City' />
        </div>
        <div className='w-[300px]'>
          <Input value={dropLocation.region} onChange={(e) => setDropLocation({ ...dropLocation, region: e.target.value })} label='State' />
        </div>

      </div>
    </div>
  )
}

export default DeliveryAddress