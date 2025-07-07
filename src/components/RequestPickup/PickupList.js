import { TrashIcon } from '@heroicons/react/24/outline'
import { Button } from '@material-tailwind/react'
import React from 'react'
import { useSelector } from 'react-redux'

const PickupList = ({pickupList,handleUpdateModal,setPickupId,requestId,setRequestId,deletePickup}) => {
  const {isAuthenticated,users,userProfile  } = useSelector(
    (state)=>state.user
  )
  return (
    <div  className=' mx-6 my-6 py-4' >
        <div>
        <div className='bg-gray-300 py-4 px-8 grid grid-cols-9 gap-6 grid-flow-col  items-center justify-start ' >
            <p className='col-span-1 font-[GilroyMedium]' >Request Id</p>
            <p className='col-span-1 font-[GilroyMedium]' >Client</p>
            <p className='col-span-1 font-[GilroyMedium]' >Warehouse Location</p>
            <p className='col-span-2 font-[GilroyMedium]' >Pickup Date and Time</p>
            <p className='col-span-1 font-[GilroyMedium]' >Pickup Boy</p>
            <p className='col-span-1 font-[GilroyMedium]' >Status</p>
            <p className='col-span-2 font-[GilroyMedium]' >Action</p>
        
        </div>
        {
          pickupList.map((item)=>(
            <div className='bg-white border-b-[2px] border-gray-200 py-4 px-8 grid grid-cols-9 gap-6 grid-flow-col  items-center justify-start ' >
            <p className='col-span-1 font-[GilroyMedium]' >{item.requestId}</p>
            <p className='col-span-1 font-[GilroyMedium]' >{item?.userName}</p>
            <p className='col-span-1 font-[GilroyMedium]' >{item.location?.pinCode}</p>
            <p className='col-span-2 font-[GilroyMedium]' >{item.date}, {item.time}</p>
            <p className='col-span-1 capitalize font-[GilroyMedium]' >{item?.pickupBoy?.name ? item?.pickupBoy?.name : "-"}</p>
            <p className='col-span-1 capitalize font-[GilroyMedium]' >{item.pickupStatus}</p>
             <p className='col-span-2 flex items-center justify-center gap-3  font-[GilroyMedium]' > {isAuthenticated && userProfile?.role==="admin" ? <Button onClick={()=>{
              setPickupId(item?.id)
              setRequestId(item?.requestId)
              handleUpdateModal()
             }}>Update Request</Button> : "-" }
             {userProfile?.role === "admin" && <div  onClick={()=>{
           deletePickup(item?.id)
            }} className='col-span-1 text-red-600 cursor-pointer w-[1.4rem] mx-2 font-[GilroyMedium]' ><TrashIcon /></div>}
             </p>
        </div>
          ))
        }
       
      
    </div>
    </div>
  )
}

export default PickupList