import { Button, Input, Option, Select } from '@material-tailwind/react'
import React from 'react'

const Dimensions = ({dimensionData,setDimensionData,handleDimensionData,removeDimesion,dimentions}) => {
  return (
    <div className='bg-white mx-3 px-6 py-3 my-4 ' >
        <h3 className='font-[GilroyBold]' >Dimensions</h3>
        
        <div className='w-[800px]' >
        <div className='my-6  gap-6 flex items-center flex-wrap justify-start' > 
        <div  >
                <Input  value={dimensionData.name} onChange={(e)=>setDimensionData({...dimensionData,name:e.target.value})} required={true} label='Name'  />
            </div>
        <div  >
                <Input type='number' value={dimensionData.qty} onChange={(e)=>setDimensionData({...dimensionData,qty:e.target.value})} required={true} label='Qty'  />
            </div>
            <div  >
                <Input type='number' value={dimensionData.width} onChange={(e)=>setDimensionData({...dimensionData,width:e.target.value})} required={true} label='Width(in cm)'  />
            </div>
            <div  >
                <Input type='number' value={dimensionData.height} onChange={(e)=>setDimensionData({...dimensionData,height:e.target.value})} required={true} label='Height(in cm)'  />
            </div>
            
            <div  >
                <Input type='number' value={dimensionData.length} onChange={(e)=>setDimensionData({...dimensionData,length:e.target.value})} required={true} label='Length(in cm)'  />
            </div>
        </div>
        <div>
        <div className='flex items-center justify-center' >
            <Button onClick={handleDimensionData} >Add More</Button>
        </div>
        </div>
        <div className=' my-4' >
            <div className='grid font-[GilroyMedium] bg-gray-200 px-4 py-3 grid-cols-6 grid-flow-col' >       
            <p>Name</p>
                    <p>Qty</p>
                    <p>Width</p>
                    <p>Height</p>
                    <p>Length</p>
                  
                    <p>Actions</p>
            </div>
            {
                    dimentions?.map((item)=>(
                        <div className='grid font-[GilroyMedium] bg-white my-0 px-4 py-3 grid-cols-6 grid-flow-col' >       
                        <p>{item.name}</p>
                    <p>{item.qty}</p>
                    <p>{item.width}</p>
                    <p>{item.height}</p>
                    <p>{item.length}</p>
                    <p>{item.weight}</p>
                    <p onClick={()=>removeDimesion(item.name)} className='font-[GilroyBold] cursor-pointer' >X</p>
            </div>
                    ))
            }
            
        </div>
        </div>
    </div>
  )
}

export default Dimensions