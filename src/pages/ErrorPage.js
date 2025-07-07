import { Button } from '@material-tailwind/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'
const ErrorPage = () => {
    const dispatch = useDispatch()
    const handleLogout = () =>{
        dispatch(logout())
    }
  return (
    <div className='flex items-center justify-center flex-col h-[100vh] bg-gray-100' >
            <h3>You don't Have Access to the Dashboard</h3>
            <Button onClick={handleLogout} >Logout</Button>
    </div>
  )
}

export default ErrorPage