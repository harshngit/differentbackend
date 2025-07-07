import { TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'

const BranchList = ({branchList,deleteWarehouse}) => {
  return (
    <div className='overflow-scroll mt-3 h-[50vh]' >
    <div className='bg-gray-300 py-4 px-8 grid grid-cols-8 gap-6 grid-flow-col  items-center justify-start ' >
    <p className='col-span-1 font-[GilroyMedium]' >Branch Name</p>
        <p className='col-span-1 font-[GilroyMedium]' >Branch Manager</p>
        <p className='col-span-1 font-[GilroyMedium]' >Phone Number</p>
        <p className='col-span-1 font-[GilroyMedium]' >City</p>
        <p className='col-span-1 font-[GilroyMedium]' >State</p>
        <p className='col-span-1 font-[GilroyMedium]' >Pin code</p>
        <p className='col-span-1 font-[GilroyMedium]' >Phone</p>
        <p className='col-span-1 font-[GilroyMedium]' >Action</p>
    </div>
    {
        branchList?.map((item)=>(
    <div className='bg-white border-b-[2px] border-gray-200 py-4 px-8 grid grid-cols-8 gap-6 grid-flow-col  items-center justify-start ' >
    <p className='col-span-1 text-[0.8rem] font-[GilroyMedium]' >{item?.locationName}</p>
        <p className='col-span-1 text-[0.8rem] font-[GilroyMedium]' >{item?.branchManager}</p>
        <p className='col-span-1 text-[0.8rem] font-[GilroyMedium]' >{item?.phone}</p>
        <p className='col-span-1 text-[0.8rem]  font-[GilroyMedium]' >{item?.city}</p>
        <p className='col-span-1 text-[0.8rem] font-[GilroyMedium]' >{item?.state}</p>
        <p className='col-span-1 text-[0.8rem] font-[GilroyMedium]' >{item.pinCode}</p>
        <p className='col-span-1 text-[0.8rem] font-[GilroyMedium]' >{item.phone}</p>
        <p onClick={()=>deleteWarehouse(item.id)} className='col-span-1 ' ><TrashIcon className='text-red-600 cursor-pointer w-8' /></p>
    </div>
        ))
    }
    
</div>
  )
}

export default BranchList