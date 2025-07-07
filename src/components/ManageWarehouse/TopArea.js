import { Button } from '@material-tailwind/react'
import React from 'react'

const TopArea = ({handleWarehouseModal}) => {
  return (
    <div className='py-6 flex items-center justify-between' > 
    <div>
        <h3 className='text-[1.5rem] font-[GilroyBold]' >Manage Warehouse</h3>
    </div>
    <div>
        <Button onClick={handleWarehouseModal} >+ Add New</Button>
    </div>
    </div>
  )
}

export default TopArea