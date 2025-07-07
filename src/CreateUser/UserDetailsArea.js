import { Button, Input } from '@material-tailwind/react'
import React from 'react'

const UserDetailsArea = ({profile,billAmount,setBillAmount,updateBillAmount,sendBillDueEmail}) => {
  return (
    <div className='col-span-4 grid gap-12 grid-cols-2 mx-4 mt-8 ' >
        <div className='bg-white h-[75vh] py-4 px-6 rounded-lg' >
 
      
            <h3 className='py-3 font-[600] text-[1.5rem]' >User Details</h3>
            <div className='w-[450px] mt-8' >
                <div className='flex items-center my-1 justify-between' > 
                    <h3 className='text-[1.1rem] font-[500]' >Name</h3>
                    <h3 className='text-[1.1rem] font-[600]'>{profile?.name}</h3>
                </div>
                <div className='flex items-center my-1 justify-between' > 
                    <h3 className='text-[1.1rem] font-[500]' >Email</h3>
                    <h3 className='text-[1.1rem] font-[600]'>{profile?.email}</h3>
                </div>
                <div className='flex items-center my-1 justify-between' > 
                    <h3 className='text-[1.1rem] font-[500]' >Company Name</h3>
                    <h3 className='text-[1.1rem] font-[600]'>{profile?.companyName}</h3>
                </div>
                <div className='flex items-center my-1 justify-between' > 
                    <h3 className='text-[1.1rem] font-[500]' >GST No</h3>
                    <h3 className='text-[1.1rem] font-[600]'>{profile?.gstNo}</h3>
                </div>
                <div className='flex items-center my-1 justify-between' > 
                    <h3 className='text-[1.1rem] font-[500]' >Bill Due</h3>
                    <h3 className='text-[1.1rem] font-[600]'>{profile?.billAmount}</h3>
                </div>
                <div className='flex items-center my-1 justify-between' > 
                    <h3 className='text-[1.1rem] font-[500]' >Contact No</h3>
                    <h3 className='text-[1.1rem] font-[600]'>{profile?.contact}</h3>
                </div>
                <div className='flex items-center my-1 justify-between' > 
                    <h3 className='text-[1.1rem] font-[500]' >Insurance Type</h3>
                    <h3 className='text-[1.1rem] font-[600]'>{profile?.insuranceType}</h3>
                </div>
                <div className='flex items-center my-1 justify-between' > 
                    <h3 className='text-[1.1rem] font-[500]' >Partner Type</h3>
                    <h3 className='text-[1.1rem] font-[600]'>{profile?.partnerType}</h3>
                </div>
               
            </div>
       
   
        </div>
        <div className='bg-white h-[80vh] py-4 px-6 rounded-lg' >
            <h4 className='py-3 font-[600] text-[1.5rem]'>Actions</h4>
            <div className='my-4 flex items-center justify-start gap-12' >
                <h3>Send MIS Report</h3>
                <Button>Send Mail</Button>
            </div>
            <div className='my-4 flex items-center justify-start gap-12' >
                <h3>Send Payment Mail</h3>
                <Button onClick={sendBillDueEmail}>Send Mail</Button>
            </div>
            <div className='my-4 flex items-center justify-start gap-12' >
                <h3>Send Monthly Invoice</h3>
                <Button>Send Mail</Button>
            </div>
            <div className='my-4 ' >
                <h3 className='font-[GilroyBold] ' >Update Bill Amount</h3>
                    <div className='my-3' >
                        <Input value={billAmount} onChange={(e)=>setBillAmount(e.target.value)} label="Update Bill Amount" />
                    </div>
                    <div>
                        <Button onClick={updateBillAmount} >Update</Button>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default UserDetailsArea