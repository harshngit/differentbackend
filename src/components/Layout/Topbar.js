import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { IoChevronDownSharp } from "react-icons/io5";
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const Topbar = () => {
  const { error, loading, isAuthenticated, users, userProfile } = useSelector(
    (state) => state.user
  );
  const activeClass = "border-[#122259] py-2 border-b-[5px]"
  const dispatch = useDispatch()
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <div className='bg-[#ffffff]  border-b-[1px] border-gray-200 px-3 lg:px-12 flex items-center justify-between py-3' >

        <div>
          <div className='flex gap-3 items-center' >
            <Menu>
              <MenuHandler>
                <Button className="text-[#000000] bg-transparent flex items-center gap-1 lg:gap-1 px-[16px] py-[10px] shadow-none  hover:shadow-none" >

                  <span className='font-[GilroyMedium] text-[0.6rem] lg:text-[.9rem] text-[#000000] ' >{userProfile?.name}</span>
                  <IoChevronDownSharp />
                </Button>
              </MenuHandler>
              <MenuList>
                <Link to="/profile" >   <MenuItem>Profile</MenuItem></Link>
                <MenuItem onClick={handleLogout} >Logout</MenuItem>

              </MenuList>
            </Menu>

          </div>
        </div>
      </div>
      {userProfile?.role === "Delivery Boy" && <div className='bg-white flex items-center justify-center  gap-12 shadow-lg py-3 px-4' >
        <Link to="/createDelivery"> <p className={splitLocation[1] === "createDelivery" ? activeClass : "py-2"}>Create Order</p></Link>
        <Link to="/deliveryList"> <p className={splitLocation[1] === "deliveryList" ? activeClass : "py-2"}>Delivery</p></Link>
        <Link to="/pickupList"> <p className={splitLocation[1] === "pickupList" ? activeClass : "py-2"}>Pickup</p></Link>
      </div>}
    </>
  )
}

export default Topbar