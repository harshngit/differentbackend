import React, { useRef } from 'react'
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
import AutocompleteDeliveryBoy from '../RequestPickup/AutocompleteDeliveryBoy';
import { useNavigate } from 'react-router-dom';

const UpdateDeliveryModal = ({ setReason, reason, updateModal, handleUpdateModal, setUpdateModal, status, setStatus, pod, setPod, addPOD, handleUpdateStatus, loadingPod, setloadingPod, handleDeliveryBoyStatus }) => {
  console.log(status)
  const navigate = useNavigate()
  const hiddenFileInput = useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  console.log(pod)
  console.log(reason)
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
                <h3 className='text-[1.4rem] font-[GilroyBold]' >Update Status</h3>
              </div>
              <div onClick={() => setUpdateModal(!updateModal)} className=" cursor-pointer w-[40px] h-[40px]" >
                <XMarkIcon className='w-[30px]' />
              </div>
            </div>
            <CardBody className="h-[250px] overflow-y-scroll ">

              <div className='my-3'>
                <Select value={status} onChange={(e) => setStatus(e)} label="Status" >
                  <Option value="delivered" >Delivered</Option>
                  <Option value="Undelivered" >Undelivered</Option>

                </Select>
              </div>
              {status === "delivered" && <div>

                <div>
                  <form onSubmit={addPOD} className='form flex items-center justify-center flex-col my-6 '>
                    <input ref={hiddenFileInput}

                      style={{ display: 'none' }}
                      accept=".pdf,.jpg,.png,jpeg" type='file' />
                    <Button onClick={handleClick} className='my-3' type='submit' size="md">
                      {loadingPod ? "Uploading" : "Upload Pod"}
                    </Button>
                  </form>
                </div>
              </div>}
              <p className='w-full text-[0.5rem]'>{pod}</p>
              {status === "Undelivered" &&
                <div className='my-3'>
                  <Select value={reason} onChange={(e) => setReason(e)} label="Reason" >
                    <Option value="No one present at the Address" >No one present at the Address</Option>
                    <Option value="Wrong Pin code" >Wrong Pin code</Option>
                    <Option value="Wrong Address" >Wrong Address</Option>
                    <Option value="Wrong Phone Number" >Wrong Phone Number</Option>
                    <Option value="Refused to Take Order" >Refused to Take Order</Option>
                    <Option value='Door Closed Option'>Door Closed Option</Option>
                    <Option value='Shifted'>Shifted</Option>
                    <Option value='Rescheduled by Consignee'>Rescheduled by Consignee</Option>
                  </Select>
                </div>
              }
            </CardBody>
            <CardFooter className="border-t-1 border-gray-300 bg-gray-200 flex items-center justify-end gap-3">

              {status === "Undelivered" || pod ? <Button onClick={() => {
                handleUpdateModal()
                handleUpdateStatus()
                handleDeliveryBoyStatus()
                navigate("/")
              }} >Submit</Button> : <p>Pod Is Not Upload</p>}
            </CardFooter>
          </Card>
        </Dialog>
      </div>
    </div>
  )
}

export default UpdateDeliveryModal