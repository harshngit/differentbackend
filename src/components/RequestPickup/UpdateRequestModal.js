import React from 'react'
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Select,
    Option,
    Textarea,
    
  } from "@material-tailwind/react";
import { PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import AutocompleteDeliveryBoy from './AutocompleteDeliveryBoy';

const UpdateRequestModal = ({updateModal,handleUpdateModal,setUpdateModal,handleUpdateRequest,status,setStatus,deliveryBoy,setDeliveryBoy,deliveryBoys,setDeliveryBoys}) => {
  
  return (
    <div>
      <div>
      <Dialog
        size="sm"
        open={updateModal}
        handler={handleUpdateModal}
        className="bg-transparent  shadow-none"
      >
        <Card className="lg:mx-auto  relative    w-full ">
        <div className='px-6 pt-4 flex items-center justify-between' >
        <div className='' >
            <h3  className='text-[1.4rem] font-[GilroyBold]' >Update Status</h3>
        </div>
        <div onClick={()=>setUpdateModal(!updateModal)} className=" cursor-pointer w-[40px] h-[40px]" >
           <XMarkIcon className='w-[30px]' />
        </div>
        </div>
          <CardBody className="h-[250px] overflow-y-scroll ">
          <div className='my-3 z-[999]'>
                <Select value={status} onChange={(e)=>setStatus(e)} label="Status" >
                   <Option value='approved' >Approved</Option>
                   <Option value="pickingUp" >Picking Up</Option> 
                 <Option value="pickedUp" >Pickedup</Option>
                  <Option value="arrived" >Arrived</Option>
                    <Option value="cancel" >Cancel</Option>
                </Select>
              {status==="pickingUp"  &&   <div className='my-4' >
                { Object.keys(deliveryBoy).length === 0  ?  <AutocompleteDeliveryBoy selected={deliveryBoy} setSelected={setDeliveryBoy} placeholder="Enter Pickup Boy Name" data={deliveryBoys} /> : <div>
           <div className=' flex items-center justify-end' >
           <PencilIcon className='w-[25px] cursor-pointer' onClick={()=>setDeliveryBoy({})} />
           </div>
            <h3 className='text-[.8rem]' >{deliveryBoy?.name}, {deliveryBoy?.email}</h3>
            <h3 className='text-[.8rem]' >{deliveryBoy?.phone}</h3>
    
           </div>}
           </div>}
            </div>
          </CardBody>
          <CardFooter className="border-t-1 border-gray-300 bg-gray-200 flex items-center justify-end gap-3">
        <Button onClick={()=>setUpdateModal(!updateModal)} className='bg-gray-600' >Cancel</Button>
        <Button onClick={handleUpdateRequest} >Submit</Button>
      </CardFooter>
        </Card>
      </Dialog>
    </div>
</div>
  )
}

export default UpdateRequestModal