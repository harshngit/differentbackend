import { PencilIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Link } from "react-router-dom";
const ProfileArea = ({userProfile}) => {
  return (
    <div className='col-span-4 ' >
        <div className='bg-white  py-6 px-8 mx-3 rounded-lg my-3' >
            <h3 className='py-3 font-[600] text-[1.5rem]' >User Details</h3>
            <div className='w-[450px] mt-8' >
                <div className='flex items-center my-1 justify-between' > 
                    <h3 className='text-[1.1rem] font-[500]' >Name</h3>
                    <h3 className='text-[1.1rem] font-[600]'>{userProfile?.name}</h3>
                </div>
                <div className='flex items-center my-1 justify-between' > 
                    <h3 className='text-[1.1rem] font-[500]' >Email</h3>
                    <h3 className='text-[1.1rem] font-[600]'>{userProfile?.email}</h3>
                </div>
                <div className='flex items-center my-1 justify-between' > 
                    <h3 className='text-[1.1rem] font-[500]' >Company Name</h3>
                    <h3 className='text-[1.1rem] font-[600]'>{userProfile?.companyName}</h3>
                </div>
                <div className='flex items-center my-1 justify-between' > 
                    <h3 className='text-[1.1rem] font-[500]' >Bill Due</h3>
                    <h3 className='text-[1.1rem] font-[600]'>{userProfile?.billAmount}</h3>
                </div>
                <div className='flex items-center my-1 justify-between' > 
                    <h3 className='text-[1.1rem] font-[500]' >Contact No</h3>
                    <h3 className='text-[1.1rem] font-[600]'>{userProfile?.contact}</h3>
                </div>
                <div className='flex items-center my-1 justify-between' > 
                    <h3 className='text-[1.1rem] font-[500]' >Insurance Type</h3>
                    <h3 className='text-[1.1rem] font-[600]'>{userProfile?.insuranceType}</h3>
                </div>
                <div className='flex items-center my-1 justify-between' > 
                    <h3 className='text-[1.1rem] font-[500]' >Partner Type</h3>
                    <h3 className='text-[1.1rem] font-[600]'>{userProfile?.partnerType}</h3>
                </div>
               
            </div>
        </div>
    </div>
  )
}

export default ProfileArea