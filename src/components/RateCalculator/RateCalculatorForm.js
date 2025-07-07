import { Button, Input, Option, Select } from '@material-tailwind/react'
import React from 'react'
import Dimensions from './Dimensions'
import CalculatedRate from './CalculatedRate'

const RateCalculatorForm = ({originPincode,setOriginPincode,destinationPincode,setDestinationPincode,pickupType,setPickupType,amount,setAmount,totalWeight,setTotalWeight,dimensionData,setDimensionData,dimentions,setDimentions,removeDimesion,handleDimensionData,handleRateCalculator,freightCharge,fmCharge,lrCharge,otherCharges,totalCharge,fuelCharge,salesInsuranceCharge}) => {
  return (
    <div className='col-span-4' >
        <div className='bg-white px-6 py-3 my-4 mx-3' >
        {freightCharge !==0 && <div>
            <CalculatedRate freightCharge={freightCharge} fuelCharge={fuelCharge} fmCost={fmCharge} salesInsuranceCharge={salesInsuranceCharge} 
             lrCharge={lrCharge} />
        </div>}
        <h4 className='font-[GilroyBold] text-[1.3rem] '  >Rate Calculator</h4>
        <div className='flex gap-8 my-3 items-center justify-start' >
        <div className='w-[400px]' >
            <Input value={originPincode} onChange={(e)=>setOriginPincode(e.target.value)} label="Origin Pincode" />
            </div>
            <div className='w-[400px]'>
            <Input value={destinationPincode} onChange={(e)=>setDestinationPincode(e.target.value)} label="Destination Pincode" />
            </div>
        </div>
        <div className='my-6' >
            <h3 className='font-[GilroyBold]  ' >Freight Estimation</h3>
            <div className='my-2' >
            <div className='flex items-center flex-wrap justify-start gap-6' >
           
            <div className='w-[350px]' >
            <Input  value={amount} onChange={(e)=>setAmount(e.target.value)} label="Invoice value in Rs." />
            </div>
            <div className='w-[350px]' >
            <Input  value={totalWeight} onChange={(e)=>setTotalWeight(e.target.value)} label="Total Weight in kg." />
            </div>
            
          
            <div className='w-[350px]' >
            <Select value={pickupType} onChange={(e)=>setPickupType(e)} className=' font-[GilroyMedium] ' label='Pickup Type' >
            <Option value="fm-pickup" >Fm-Pickup</Option>
            <Option value="self-drop" >Self Drop</Option>
             </Select>
            </div>
                </div>
                
            </div>
        </div>
        </div>
        <Dimensions removeDimesion={removeDimesion} handleDimensionData={handleDimensionData} dimensionData={dimensionData} setDimensionData={setDimensionData} dimentions={dimentions} setDimentions={setDimentions} />
        <div className='flex items-center justify-end mx-3 my-3' >
            <Button onClick={handleRateCalculator} >Calculate Freight</Button>
        </div>
    </div>
  )
}

export default RateCalculatorForm