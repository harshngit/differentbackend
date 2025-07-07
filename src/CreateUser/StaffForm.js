import { Button, Input, Option, Select } from '@material-tailwind/react'
import React from 'react'

const StaffForm = ({name,setName,email,setEmail,password,setPassword,insuranceType,setInsuranceType,contact,setContact,handleCreateUser,role,setRole}) => {
  return (
    <div className='col-span-4 mx-12 my-8 h-full bg-white rounded-lg px-12 py-6' >
        <div className='' >
            <h3 className='font-[GilroyBold]  text-[2rem]' >Create User</h3>
            <div className='grid grid-cols-2 mt-3 grid-flow-col gap-6' >
            <div>
                <Input value={name} onChange={(e)=>setName(e.target.value)} label='Name' />
                </div>
                <div>
                <Input value={contact} onChange={(e)=>setContact(e.target.value)} label='Contact No' />
                </div>
            </div>
            <div className='grid grid-cols-2 mt-3 pt-3 grid-flow-col gap-6' >
           
            <div>
                <Input value={email} onChange={(e)=>setEmail(e.target.value)} label='Email' />
                </div>
            <div>
                <Input value={password} onChange={(e)=>setPassword(e.target.value)} label='Password' />
                </div>
            </div>
          
            <div className='grid grid-cols-2 mt-3 pt-3 grid-flow-col gap-6' >
            
            <div>
            <Select value={role} onChange={(e)=>setRole(e)}  className=' font-[GilroyMedium] ' label='Role' >
            <Option value='Delivery Boy' >Delivery Boy</Option>
            <Option value='Operational Manager' >Operational Manager</Option>
             </Select>
                </div>
            
            </div>
           
           
        </div>
        <div className='flex items-center justify-end mt-6 ' >
        <Button className='' onClick={handleCreateUser} >Submit</Button>
        </div>
    </div>
  )
}

export default StaffForm