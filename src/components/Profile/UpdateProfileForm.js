import React from 'react'
import { Button, Input, Option, Select } from '@material-tailwind/react'
const UpdateProfileForm = ({name,setName,companyName,setCompanyName,email,setEmail,password,setPassword,contact,setContact,companyAddress,setCompanyAddress,gstNo,setGstNo,insuranceType,setInsuranceType,handleUpdateUser}) => {
  return (
    <div className='col-span-4 mx-12 my-8 bg-white rounded-lg px-12 py-6' >
    <div className='' >
        <h3 className='font-[GilroyBold]  text-[2rem]' >Update User</h3>
        <div className='grid grid-cols-2 mt-3 grid-flow-col gap-6' >
        <div>
            <Input value={name} onChange={(e)=>setName(e.target.value)} label='Name' />
            </div>
            <div>
            <Input value={companyName} onChange={(e)=>setCompanyName(e.target.value)} label='Company Name' />
            </div>
        </div>
        <div className='grid grid-cols-2 mt-3 pt-3 grid-flow-col gap-6' >
        <div>
            <Input value={gstNo} onChange={(e)=>setGstNo(e.target.value)} label='GST No' />
            </div>
        <div>
            <Input value={email} onChange={(e)=>setEmail(e.target.value)} label='Email' />
            </div>
        </div>
        <div className='grid grid-cols-2 mt-3 pt-3 grid-flow-col gap-6' >
        <div>
            <Input value={contact} onChange={(e)=>setContact(e.target.value)} label='Contact No' />
            </div>
        <div>
            <Input value={companyAddress} onChange={(e)=>setCompanyAddress(e.target.value)} label='Company Address' />
            </div>
        
        </div>
        <div className='grid grid-cols-2 mt-3 pt-3 grid-flow-col gap-6' >
       
       
        
        </div>
      
        
    </div>
    <div className='flex items-center justify-end mt-6 ' >
    <Button className='' onClick={handleUpdateUser} >Submit</Button>
    </div>
</div>
  )
}

export default UpdateProfileForm