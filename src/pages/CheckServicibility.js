import React, { useState } from 'react'
import Topbar from '../components/Layout/Topbar'
import { Sidebar } from '../components/Layout/Sidebar'
import CreateOrderPage from '../components/CreateOrder/CreateOrderPage'
import Servicibility from '../components/Servicibility/Servicibility'
import { pinCodeList } from '../data/pinCodeData'
import ServiceTable from '../components/Servicibility/ServiceTable'

const CheckServicibility = () => {
  const [pinCode, setPinCode] = useState("")
  const [pinCodeDetail, setPinCodeDetail] = useState({})
  const handleCheckPinCode = () => {
    console.log("click")
    if (pinCode.length === 0 || pinCode.length !== 6) {
      alert('Please enter a valid Pin Code')
    }
    else {
      console.log("hii")
      pinCodeList.map((pin) => {
        if (pin.Pin === Number(pinCode)) {
          setPinCodeDetail(pin)
        }
      })
      setPinCode("")
    }
  }
  console.log(pinCodeDetail)
  return (
    <div className='bg-gray-100 flex '>
      <Sidebar />

      <div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col' >
        <Topbar />

        <div className='col-span-4 mx-4' >
          <Servicibility handleCheckPinCode={handleCheckPinCode} pinCodeDetail={pinCodeDetail} pinCode={pinCode} setPinCode={setPinCode} />
          {Object.keys(pinCodeDetail).length !== 0 && <ServiceTable pinCodeDetail={pinCodeDetail} pinCode={pinCode} />}
        </div>
      </div>
    </div>
  )
}

export default CheckServicibility