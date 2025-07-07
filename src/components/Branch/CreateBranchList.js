import { Button, Input, Option, Select } from '@material-tailwind/react'
import React from 'react'
import { pinCodeList } from '../../data/pinCodeData'
const CreateBranchList = ({brandInfo,setBrandInfo,handleBrachAdd}) => {
    const getCityandState = (pin) =>{
        pinCodeList.map((zip)=>{
          if(zip.Pin === Number(pin)){
            setBrandInfo({...brandInfo,city:zip.FacilityCity,state:zip.FacilityState,pincode:pin})
          
          }
        })
      }
  return (
    <div   >
  <div className='' >
            <h3 className='font-[GilroyBold]  text-[2rem]' >Create User</h3>
            <div className='grid grid-cols-2 mt-2 grid-flow-col gap-6' >
            <div>
                <Input value={brandInfo?.name} onChange={(e)=>setBrandInfo({...brandInfo,name:e.target.value})} label='Branch Name' />
                </div>
                <div>
                <Input value={brandInfo?.branchManager} onChange={(e)=>setBrandInfo({...brandInfo,branchManager:e.target.value})} label='Branch Manager Name' />
                </div>
            </div>
          
            <div className='grid grid-cols-2 mt-2 pt-3 grid-flow-col gap-6' >
            <div>
                <Input value={brandInfo?.location} onChange={(e)=>setBrandInfo({...brandInfo,location:e.target.value})} label='Branch Address' />
                </div>
            <div>
                <Input value={brandInfo?.pincode} 
                onChange={(e)=>{
                   
                 
                    setBrandInfo({...brandInfo,pincode:e.target.value})
                    getCityandState(e.target.value)
                    }} label='Branch Pincode' />
                </div>
            
            </div>
            <div className='grid grid-cols-3 mt-2 pt-3 grid-flow-col gap-6' >
            <div>
                <Input value={brandInfo.city} onChange={(e)=>setBrandInfo({...brandInfo,city:e.target.value})} label='City' />
                </div>
                <div>
                <Input value={brandInfo.state} onChange={(e)=>setBrandInfo({...brandInfo,state:e.target.value})} label='state' />
                </div>
                <div>
                <Input value={brandInfo.phoneNumber} onChange={(e)=>setBrandInfo({...brandInfo,phoneNumber:e.target.value})} label='Phone Number' />
                </div>
            
            </div>
       <div className='flex items-center justify-end mt-2' >
        <Button onClick={handleBrachAdd} >Create</Button>
       </div>
        </div>
    </div>
  )
}

export default CreateBranchList