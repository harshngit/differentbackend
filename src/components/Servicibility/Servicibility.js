import { Button, Input } from '@material-tailwind/react'
import React from 'react'

const Servicibility = ({pinCode,setPinCode,handleCheckPinCode}) => {
  return (
    <div className='' >
        <h3 className='font-[GilroyBold] my-3 text-[1.3rem]' >Check Pin Code</h3>
        <div className='bg-white py-6  px-6' >
        <div  >
            <Input value={pinCode} onChange={(e)=>setPinCode(e.target.value)} label='Enter Pin Code'   />
            <div className='my-3' >
                <Button onClick={handleCheckPinCode} className='' >Check</Button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Servicibility