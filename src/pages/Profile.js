import React from 'react'
import Topbar from '../components/Layout/Topbar'
import { Sidebar } from '../components/Layout/Sidebar'
import ProfileArea from '../components/Profile/ProfileArea'
import { useSelector } from 'react-redux'


const Profile = () => {
    const { error, loading, isAuthenticated,users,userProfile } = useSelector(
        (state) => state.user
      );
  return (
    <div className='bg-gray-100 flex '>
      <Sidebar /> 
        <div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col' >
        <Topbar />
            
            <ProfileArea userProfile={userProfile} />
        </div>
    </div>
  )
}

export default Profile