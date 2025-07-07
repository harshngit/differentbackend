import React from 'react'
import Topbar from '../components/Layout/Topbar'
import { Sidebar } from '../components/Layout/Sidebar'
import UpdateProfileForm from '../components/Profile/UpdateProfileForm'
import { useSelector } from 'react-redux'

const UpdateProfile = () => {
  const { error, loading, isAuthenticated,users,userProfile } = useSelector(
    (state) => state.user
  );
  return (
      <div className='bg-gray-100 flex ' >
       <Sidebar />
        <div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col' >
        <Topbar />
           
            <UpdateProfileForm />
        </div>
    </div>
  )
}

export default UpdateProfile