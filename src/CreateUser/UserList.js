import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import React from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import TabUser from './TabUser'

const UserList = ({ userList, activeTab, setActiveTab }) => {
  return (
    <>
      <TabUser activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className='overflow-scroll mx-3 col-span-4 my-4 h-[85vh]' >
        <div className='bg-gray-300 py-4 px-8 grid grid-cols-5 gap-6 grid-flow-col  items-center justify-start ' >
          <p className='col-span-1 font-[GilroyMedium]' >Name</p>

          <p className='col-span-1  font-[GilroyMedium]' >Contact No</p>
          <p className='col-span-1 font-[GilroyMedium]' >Role</p>
          <p className='col-span-2 font-[GilroyMedium]' >Email</p>
          <p className='col-span-1 font-[GilroyMedium]' >Action</p>
        </div>
        {userList?.map((user) => (
          <div className='bg-white py-4 px-8 grid grid-cols-5 gap-6 grid-flow-col  items-center justify-start ' >
            <p className='col-span-1 text-[0.8rem] font-[GilroyMedium]' >{user?.name}</p>

            <p className='col-span-1 text-[0.8rem] font-[GilroyMedium]' >{user?.contact}</p>
            <p className='col-span-1 text-[0.8rem] font-[GilroyMedium]' >{user?.role?.length ? user?.role : "-"}</p>
            <p className='col-span-2 text-[0.8rem] font-[GilroyMedium]' >{user?.email}</p>
            <div className='col-span-1 font-[GilroyMedium]' >
              <Menu className=" rounded-none px-0 py-0">
                <MenuHandler>
                  <Button className="bg-transparent px-[10px] py-[10px] shadow-none  hover:shadow-none">
                    <p className="flex items-center justify-end gap-2">
                      <HiDotsHorizontal className="text-black text-[1.3rem]" />{" "}
                    </p>
                  </Button>
                </MenuHandler>
                <MenuList className="w-[150px] px-0 rounded-none">

                  <Link className="outline-none border-none" to={`/users/${user?.uid}`} >
                    <MenuItem className="border-b-[1px] rounded-none px-0 border-gray-300 ">
                      <p className="px-6 text-black font-[GilroyRegular]">
                        {" "}
                        Edit User
                      </p>
                    </MenuItem>
                  </Link>
                  <Link className="outline-none border-none" to={`/user/${user?.uid}`} >
                    <MenuItem className="border-b-[1px] rounded-none px-0 border-gray-300 ">
                      <p className="px-6 text-black font-[GilroyRegular]">
                        {" "}
                        View User
                      </p>
                    </MenuItem>
                  </Link>
                  <MenuItem className=" rounded-none  px-0 border-gray-300 ">
                    <p className="px-6  text-red-600 font-[GilroyRegular]">
                      Delete User
                    </p>
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
        ))}

      </div>
    </>
  )
}

export default UserList