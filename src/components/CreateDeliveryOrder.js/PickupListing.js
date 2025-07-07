import { Button } from '@material-tailwind/react'
import React from 'react'
import { db } from '../../firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const PickupListing = ({pickupList,fetchPickupList}) => {
    const navigate = useNavigate()
    const updateStatus = (id) =>{
        const repairRef = doc(db, "pickupLocation", id);
        updateDoc(repairRef, {
            pickupStatus:"pickedUp",
            }).then(()=>{
                navigate("/")
            })
          
    }
  return (
    <div className='px-4 py-4' >
        <h3 className='font-[GilroyBold] text-center' >Pickup List</h3>
        <div className='mt-4' >
        <div className={`bg-gray-300 py-4 px-3 grid  gap-3 grid-flow-col  items-center justify-start grid-cols-4  `}>
            <p className='col-span-1 text-center font-[GilroyMedium]' >Name</p>
            <p className='col-span-2 text-center font-[GilroyMedium]' >Address</p>
            <p className='col-span-1 text-center font-[GilroyMedium]' >Action</p>
         
        </div>
       
        {
            pickupList.map((item) =>(
                <div className={`bg-white border-[1px] border-gray-300 grid  gap-3 grid-flow-col  items-center justify-start grid-cols-4 `}>
       
            <p className='col-span-1  px-1 py-2  text-[0.7rem] font-[GilroyMedium]' >
                <p>{item?.location?.personName}</p>
                <p>{item?.location?.phone}</p>
            </p>
            <p className='col-span-2 px-1 py-2 my-0 border-x-[1px] border-gray-300 text-[0.7rem] font-[GilroyMedium]' >{item?.location?.address}, {item?.location?.city}, {item?.location?.state}, {item?.location?.pinCode}</p>
            <p className='col-span-1 flex items-center justify-center  py-2 font-[GilroyMedium]' >
           <p onClick={()=>updateStatus(item.id)} className='bg-black px-2 py-2 rounded-lg text-[.6rem] font-[GilroyMedium] text-white' >Pickedup</p>
            </p>
          
        </div>
            ))
        }
        
    </div>
    </div>
  )
}

export default PickupListing