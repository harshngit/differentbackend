import { Button } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='flex items-center justify-center h-[100vh]' >
        <div>
            <h3>Order Booked  Successfully!</h3>
          <Link to="/"> <Button className='mt-3'>Return Home</Button></Link> 
        </div>
    </div>
  )
}

export default Success