import React from 'react'
import { CiCircleCheck } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
const ServiceTable = ({pinCodeDetail,pinCode}) => {
  return (
    <div className=' my-3 ' >
        <div className='bg-white py-4 ' > 
        <h3 className='px-6 font-[GilroyBold] text-[1.2rem] py-2' >{pinCodeDetail.Pin} is valid Pin Code, Serviceability listed below </h3>
                <div className='bg-gray-100 px-6 grid grid-cols-5 grid-flow-col py-3 border-y-[1px] border-gray-200' >
                    <p>Pin Code</p>
                    <p>State</p>
                    <p>City</p>
                    <p>Service</p>
                    <p>ODA</p>
                </div>
                <div className=' px-6 grid grid-cols-5 grid-flow-col py-3' >
                    <p>{pinCodeDetail?.Pin}</p>
                    <p>{pinCodeDetail?.FacilityState}</p>
                    <p>{pinCodeDetail?.FacilityCity}</p>
                    <p className="text-[1.5rem] text-green-600" ><CiCircleCheck /> </p>
                    <p  > {pinCodeDetail.ODA==="ODA" ? <CiCircleCheck className="text-[1.5rem] text-green-600" /> : <RxCrossCircled className="text-[1.5rem] text-red-600" />  } </p>
                </div>
        </div>
    </div>
  )
}

export default ServiceTable