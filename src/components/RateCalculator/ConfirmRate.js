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
import { XMarkIcon } from '@heroicons/react/24/outline';
const ConfirmRate = ({confirmModal,handleRateModal,handleBookOrder,handleCalculate}) => {
  return (
    <div>
    <div>
    <Dialog
      size="sm"
      open={confirmModal}
      handler={handleRateModal}
      className="bg-transparent  shadow-none"
    >
      <Card className="lg:mx-auto  relative    w-full ">
      <div className='px-6 pt-4 flex items-center justify-between' >
      <div className='' >
          <h3 className='text-[1.4rem] font-[GilroyBold]' >Confirm Calculate Rate</h3>
      </div>
      <div onClick={handleRateModal} className=" cursor-pointer w-[40px] h-[40px]" >
         <XMarkIcon className='w-[30px]' />
      </div>
      </div>
        <CardBody className="h-[100px] overflow-y-scroll ">
            <h3>Are you Sure You want to Check the Rate</h3>
        </CardBody>
        <CardFooter className="border-t-1 border-gray-300 bg-gray-200 flex items-center justify-end gap-3">
      <Button onClick={handleRateModal} className='bg-gray-600' >Cancel</Button>
      <Button onClick={handleCalculate} >Submit</Button>
    </CardFooter>
      </Card>
    </Dialog>
  </div>
</div>
  )
}

export default ConfirmRate