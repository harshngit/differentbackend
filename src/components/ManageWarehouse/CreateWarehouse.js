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
import AutocompleteUser from './AutocompleteUser';
const CreateWarehouse = ({ warehouseModal, handleWarehouseModal, setWarehouseModal, setWarehouseData, warehouseData, handleWarehouse, pickupName, setPickupName, userList }) => {
  return (
    <div>
      <div>
        <Dialog
          size="lg"
          open={warehouseModal}
          handler={handleWarehouseModal}
          className="bg-transparent  shadow-none"
        >
          <Card className="lg:mx-auto  relative    w-full ">
            <div className='px-6 pt-4 flex items-center justify-between' >
              <div className='' >
                <h3 className='text-[1.4rem] font-[GilroyBold]' >Create Warehouse</h3>
              </div>
              <div onClick={() => setWarehouseModal(!warehouseModal)} className=" cursor-pointer w-[40px] h-[40px]" >
                <XMarkIcon className='w-[30px]' />
              </div>
            </div>
            <CardBody className="h-[400px] overflow-y-scroll ">
              <div className="mt-1" >
                <div className='grid grid-cols-3 gap-8' >
                  <div className='col-span-2'>
                    {Object.keys(pickupName).length === 0 ? <AutocompleteUser selected={pickupName} setSelected={setPickupName} placeholder="Enter Client Name" data={userList} /> : <div>
                      <div className=' flex items-center justify-end' >
                        <PencilIcon className='w-[25px] cursor-pointer' onClick={() => setPickupName({})} />
                      </div>
                      <h3 className='text-[.8rem]' >{pickupName.name}, {pickupName.email}</h3>
                      <h3 className='text-[.8rem]' >{pickupName.companyName}</h3>

                    </div>}
                  </div>
                  <div className='col-span-1'>
                    <Input value={warehouseData.pinCode} onChange={(e) => setWarehouseData({ ...warehouseData, pinCode: e.target.value })} type="text" label="Pin Code" />
                  </div>
                </div>
                <div className='grid grid-cols-3 mt-3 gap-8' >
                  <div className='col-span-1'>
                    <Input value={warehouseData.city} onChange={(e) => setWarehouseData({ ...warehouseData, city: e.target.value })} type="text" label="City" />
                  </div>
                  <div className='col-span-1'>
                    <Input value={warehouseData.state} onChange={(e) => setWarehouseData({ ...warehouseData, state: e.target.value })} type="text" label="State" />
                  </div>
                  <div className='col-span-1'>
                    <Input value={warehouseData.country} onChange={(e) => setWarehouseData({ ...warehouseData, country: e.target.value })} type="text" label="Country" />
                  </div>
                </div>
                <div className='mt-3 pb-6 border-b-[1px] border-gray-300' >
                  <Input value={warehouseData.address} onChange={(e) => setWarehouseData({ ...warehouseData, address: e.target.value })} type="text" label="Address" />
                </div>
                <div className='grid  grid-cols-3 pt-6 gap-8' >
                  <div className='col-span-1'>
                    <Input value={warehouseData.personName} onChange={(e) => setWarehouseData({ ...warehouseData, personName: e.target.value })} type="text" label="Contact Person Name" />
                  </div>
                  <div className='col-span-1'>
                    <Input value={warehouseData.email} onChange={(e) => setWarehouseData({ ...warehouseData, email: e.target.value })} type="text" label="Email" />
                  </div>
                  <div className='col-span-1'>
                    <Input value={warehouseData.phone} onChange={(e) => setWarehouseData({ ...warehouseData, phone: e.target.value })} type="text" label="Phone Number" />
                  </div>
                </div>
                <div className=' pt-3 gap-8' >
                  <Select value={warehouseData.slot} onChange={(e) => setWarehouseData({ ...warehouseData, slot: e })} className=' font-[GilroyMedium] ' label='Preferred Slot' >
                    <Option value='01:00 Pm - 04:00 Pm' >01:00 Pm - 04:00 Pm</Option>
                    <Option value='04:00 Pm - 07:00 Pm' >04:00 Pm - 07:00 Pm</Option>
                    <Option value='07:00 Pm - 10:00 Pm' >07:00 Pm - 10:00 Pm</Option>
                  </Select>


                </div>
              </div>
            </CardBody>
            <CardFooter className="border-t-1 border-gray-300 bg-gray-200 flex items-center justify-end gap-3">
              <Button onClick={() => setWarehouseModal(!warehouseModal)} className='bg-gray-600' >Cancel</Button>
              <Button onClick={handleWarehouse} >Submit</Button>
            </CardFooter>
          </Card>
        </Dialog>
      </div>
    </div>
  )
}

export default CreateWarehouse