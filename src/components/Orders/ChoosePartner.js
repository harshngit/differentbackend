import React, { useState } from 'react'
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
import { MdOutlineLocalShipping } from "react-icons/md";
import { PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import DeliveryLogo from "../../asset/delhivery.png"
import GRCLogo from "../../asset/grc-logo.png"
const ChoosePartner = ({ partnerModal, handlePartnerModal, setPartnerModal, handleDeliveryShipping, handleOwnShipping }) => {
  const [showAutocomplete, setShowAutocomplete] = useState(false)
  return (
    <div>
      <div>
        <Dialog
          size="xs"
          open={partnerModal}
          handler={handlePartnerModal}
          className="bg-transparent  shadow-none"
        >
          <Card className="lg:mx-auto  relative    w-full ">
            <div className='px-6 pt-4 flex items-center justify-between' >
              <div className='' >
                <h3 className='text-[1.4rem] font-[GilroyBold]' >Choose a Partner</h3>
              </div>
              <div onClick={() => setPartnerModal(!partnerModal)} className=" cursor-pointer w-[40px] h-[40px]" >
                <XMarkIcon className='w-[30px]' />
              </div>
            </div>
            <CardBody className="h-[250px] mt-4 overflow-y-scroll ">
              <div onClick={handleOwnShipping} className='flex my-4 hover:bg-[#d8d8d8a6] cursor-pointer items-center justify-start py-4 rounded-lg gap-8 px-4' >
                <img className='w-[80px]' src={GRCLogo} />
                <h3>Shipping By Own</h3>
              </div>
              <div onClick={handleDeliveryShipping} className='flex  my-4 hover:bg-[#d8d8d8a6] cursor-pointer items-center justify-start py-4 rounded-lg gap-8 px-4' >
                <img className='w-[80px]' src={DeliveryLogo} />
                <h3>Shipping By Delivery</h3>
              </div>
            </CardBody>

          </Card>
        </Dialog>
      </div>
    </div>
  )
}

export default ChoosePartner