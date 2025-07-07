import React, { useState } from 'react'
import Topbar from '../components/Layout/Topbar'
import { Sidebar } from '../components/Layout/Sidebar'
import RateCalculatorForm from '../components/RateCalculator/RateCalculatorForm'
import { useSelector } from 'react-redux'
import ConfirmRate from '../components/RateCalculator/ConfirmRate'

const RateCalculator = () => {
  const {isAuthenticated,users,userProfile  } = useSelector(
    (state)=>state.user
  )
  const [originPincode, setOriginPincode] = useState("")
  const [confirmRateModal, setConfirmRateModal] = useState(false)
  const [destinationPincode, setDestinationPincode] = useState("")
  const [pickupType, setPickupType] = useState("")
  const [amount, setAmount] = useState("")
  const [totalWeight, setTotalWeight] = useState("")
  const [totalHeight, setTotalHeight] = useState(0)
  const [totalWidth, setTotalWidth] = useState(0)
  const [totalLength, setTotalLength] = useState(0)
  const [freightCharge, setFreightCharge] = useState(0)
  const [fmCharge, setFmCharge] = useState(0)
  const [salesInsuranceCharge, setSalesInsuranceCharge] = useState(0)
  
    const [lrCharge, setLrCharge] = useState(0)
    const [fuelCharge, setFuelCharge] = useState(0)
  const [dimensionData, setDimensionData] = useState({
    name:"",
    qty:"",
    length:"",
    width:"",
    height:""
  })

  const [dimentions, setDimentions] = useState([])
  const handleRateModal = () =>{
    setConfirmRateModal(!confirmRateModal)
  }
  const handleDimensionData = ()=>{
    setDimentions([...dimentions,{
      name:dimensionData.name,
      qty:dimensionData.qty,
      length:dimensionData.length,
      width:dimensionData.width,
      height:dimensionData.height
    }])
    setDimensionData({
    name:"",
    qty:"",
    length:"",
    width:"",
    height:""
    })
  }
  const removeDimesion = (name) =>{
    setDimentions(
      dimentions.filter((item) => item.name!==name)
    )
  }
  const handleRateCalculator = () =>{
    if(originPincode?.length===0){
      alert("Enter Origin Pincode")
    }
    else if(destinationPincode?.length === 0){
      alert("Enter Destination Pincode")
    }
    else if(dimentions.length===0){
      alert("Add Dimentions")
    }
    else{
      let Length = 0
        let Width = 0
        let Height = 0
        dimentions.map((item)=>{
         Length = Length + (Number(item.length)*item.qty)
          Width = Width + (Number(item.width)*item.qty)
          Height = Height + (Number(item.height)*item.qty)
        })
        setTotalHeight(Height)
        setTotalWidth(Width)
        setTotalLength(Length)
        handleRateModal()
    }
  }
  const handleCalculate = () =>{
    console.log(userProfile?.rateList)
    userProfile?.rateList?.map((item)=>{
      console.log(destinationPincode,originPincode,item?.deliveryLocation,item?.fromLocation)
      if(item?.deliveryLocation  === Number(destinationPincode) && item?.fromLocation === Number(originPincode) ){
        console.log("active")
          setFreightCharge((((totalHeight*totalWidth*totalLength)/4500)*item?.rate))
          setLrCharge(item?.lrCharge)
          setFuelCharge((((totalHeight*totalWidth*totalLength)/4500)*item?.rate)*(item?.fuel/100))
          if(pickupType==="fm-pickup"){
            setFmCharge(item?.fmCost)
          }

          if(userProfile?.insuranceType==="owner risk"){
            setSalesInsuranceCharge(item?.rovOWER)
          }
          else{
            const rateCarrier = (((totalHeight*totalWidth*totalLength)/4500)*item?.rate)*(item?.fuel/100)
            if(rateCarrier > item?.minRovValue){
              setSalesInsuranceCharge(Math.round(rateCarrier))
            }
            else{
              setSalesInsuranceCharge(item?.minRovValue)
            }
          }
        }
    })
   handleRateModal()
  }
  console.log(freightCharge,totalHeight)
  return (
    <div className='bg-gray-100 flex '>
      <Sidebar />
        <ConfirmRate confirmModal={confirmRateModal} handleCalculate={handleCalculate} setConfirmModal={setConfirmRateModal} handleRateModal={handleRateModal}  />
        <div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col' >
           
            <Topbar />
            <RateCalculatorForm originPincode={originPincode} setOriginPincode={setOriginPincode}
             destinationPincode={destinationPincode} setDestinationPincode={setDestinationPincode}
             pickupType={pickupType} setPickupType={setPickupType}
             amount={amount} setAmount={setAmount} 
             totalWeight={totalWeight} setTotalWeight={setTotalWeight}
             dimensionData={dimensionData} setDimensionData={setDimensionData}
             handleCalculate={handleCalculate}
             dimentions={dimentions} setDimentions={setDimentions}
             handleRateCalculator={handleRateCalculator}
             removeDimesion={removeDimesion} handleDimensionData={handleDimensionData}
             freightCharge={freightCharge} fuelCharge={fuelCharge} fmCharge={fmCharge} salesInsuranceCharge={salesInsuranceCharge} 
             lrCharge={lrCharge}
              />

        </div>
    </div>
  )
}

export default RateCalculator