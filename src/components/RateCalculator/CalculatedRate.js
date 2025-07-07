import React from 'react'

const CalculatedRate = ({freightCharge,fmCost,lrCharge,otherCharges,totalCharge,fuelCharge,salesInsuranceCharge}) => {
  return (
    <div className=' my-3 ' >
    <div className='bg-white py-4 ' > 
    <h3 className='px-6 font-[GilroyBold] text-[1.2rem] py-2' >The Rate  is calculated as follows:</h3>
            <div className='bg-gray-100 px-6 grid grid-cols-6 grid-flow-col py-3 border-y-[1px] border-gray-200' >
                <p>Freight Charge</p>
                <p>Fuel Charge</p>
                <p>FM Cost</p>
                <p>LR Charge</p>
                <p>Insurance Charge</p>
                <p>Total</p>
            </div>
            <div className=' px-6 grid grid-cols-6 grid-flow-col py-3' >
                <p>{Math.round(freightCharge)}</p>
                <p>{Math.round(fuelCharge)}</p>
                <p>{fmCost}</p>
                <p>{lrCharge}</p>
                <p  >{salesInsuranceCharge} </p>
                <p className='font-[500] text-green-600' > {Math.round(Number(freightCharge) + Number(fuelCharge) + Number(fmCost) + Number(lrCharge) + Number(salesInsuranceCharge))} </p>
            </div>
    </div>
</div>
  )
}

export default CalculatedRate