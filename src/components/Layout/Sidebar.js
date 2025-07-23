import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { GiClothes } from "react-icons/gi";
import { ChevronRightIcon, ChevronDownIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { BsFillBoxSeamFill, BsList } from "react-icons/bs";
import { RiAddBoxFill } from "react-icons/ri";
import { LuTruck } from "react-icons/lu";
import { HiOutlineLocationMarker } from "react-icons/hi"
import { PiCalculatorBold } from "react-icons/pi";
import { FaWarehouse, FaTicket, FaUserPlus, FaJediOrder, FaBoxOpen, FaGift, FaStore } from "react-icons/fa6";
import { SiMinutemailer } from "react-icons/si";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { MdSwitchAccount } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import { AiOutlineException } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import GRCLogo from "../../asset/logo.png"
import { IoPersonAdd } from "react-icons/io5";
import { FaList } from "react-icons/fa";
export function Sidebar() {

  const { error, loading, isAuthenticated, users, userProfile } = useSelector(
    (state) => state.user
  );
  const [open, setOpen] = React.useState(true); // Sidebar initially closed


  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const dispatch = useDispatch()
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const handleLogout = () => {
    dispatch(logout())
  }
  const activeClass = "bg-[#11120D] hover:bg-[#FFB200] opacity-[100%] text-white rounded-[7px]";
  return (
    <Card className={`h-[110vh] hidden lg:flex flex-col lg:static   overflow-y-scroll  rounded-none shadow-xl  text-[#11120D] ${open ? 'lg:w-[250px]' : 'w-16'
      }`}>
      <Link to="/">
        <div className="flex justify-center items-center">
          <img className='w-[100px] my-3 mx-4  ' src={GRCLogo} />
        </div>
      </Link>
      <h4 className="mt-1 font-[GilroyBold] mx-4 text-[1.3rem]" >My Product</h4>
      <List>
        <Link className={splitLocation[1] === "products" ? activeClass : "hover:bg-[#565449] rounded-lg"} to="/products" >
          <ListItem className="py-3 hover:bg-[#565449] rounded-lg font-[GilroyMedium] hover:text-white" >
            <ListItemPrefix className="hover:bg-[#565449] rounded-lg">
              <BsFillBoxSeamFill className="h-[15px] w-[15px] mr-3" />
            </ListItemPrefix>
            <p className="text-[.9rem] " >Product List</p>

          </ListItem>
        </Link>
        <Link className={splitLocation[1] === "collection" ? activeClass : "hover:bg-[#565449] rounded-lg"} to="/collection" >
          <ListItem className="py-3 hover:bg-[#565449] rounded-lg font-[GilroyMedium] hover:text-white" >
            <ListItemPrefix className="hover:bg-[#565449] rounded-lg">
              <BsFillBoxSeamFill className="h-[15px] w-[15px] mr-3" />
            </ListItemPrefix>
            <p className="text-[.9rem] " >Collection List</p>

          </ListItem>
        </Link>
        {userProfile?.role === "admin" && <Link className={splitLocation[1] === "create-product" ? activeClass : "hover:bg-[#565449] rounded-lg"} to="/create-product" >
          <ListItem className="py-3 hover:bg-[#565449] rounded-lg font-[GilroyMedium] hover:text-white" >
            <ListItemPrefix>
              <GiClothes className="h-[15px] w-[15px] mr-3" />
            </ListItemPrefix>
            <p className="text-[.9rem]" >Create Product</p>

          </ListItem>
        </Link>}

      </List>
      <>
        <h4 className="mt-1 font-[GilroyBold] mx-4 text-[1.3rem]" >My Order</h4>
        <List className="mt-1" >
          <Link className={splitLocation[1] === "create-order" ? activeClass : "hover:bg-[#565449] rounded-lg"} to="/create-order">
            <ListItem className=" py-3 hover:bg-[#565449] rounded-lg font-[GilroyMedium] hover:text-white" >
              <ListItemPrefix>
                <FaBoxOpen className="h-[15px] w-[15px] mr-3" />
              </ListItemPrefix>
              <p className="text-[.9rem]" >Create Order</p>
            </ListItem>
          </Link>
          <Link className={splitLocation[1] === "orders" ? activeClass : "hover:bg-[#565449] rounded-lg"} to="/orders">
            <ListItem className=" py-3 hover:bg-[#565449] rounded-lg font-[GilroyMedium] hover:text-white" >
              <ListItemPrefix>
                <BsFillBoxSeamFill className="h-[15px] w-[15px] mr-3" />
              </ListItemPrefix>
              <p className="text-[.9rem]" >Order List</p>

            </ListItem>
          </Link>
        </List>
      </>
      <>
        <h4 className="mt-1 font-[GilroyBold] mx-4 text-[1.3rem]" >Manage Inventory</h4>
        <List className="mt-1" >
          <Link className={splitLocation[1] === "manageinventory" ? activeClass : "hover:bg-[#565449] rounded-lg"} to="/manageinventory">
            <ListItem className=" py-3 hover:bg-[#565449] rounded-lg font-[GilroyMedium] hover:text-white" >
              <ListItemPrefix>
                <FaStore className="h-[15px] w-[15px] mr-3" />
              </ListItemPrefix>
              <p className="text-[.9rem]" >Manage Inventory</p>

            </ListItem>
          </Link>
        </List>
      </>
      <>
        <h4 className="mt-1 font-[GilroyBold] mx-4 text-[1.3rem]" >Manage Coupon</h4>
        <List className="mt-1" >
          <Link className={splitLocation[1] === "createcoupon" ? activeClass : "hover:bg-[#565449] rounded-lg"} to="/createcoupon">
            <ListItem className=" py-3 hover:bg-[#565449] rounded-lg font-[GilroyMedium] hover:text-white" >
              <ListItemPrefix>
                <FaTicket className="h-[15px] w-[15px] mr-3" />
              </ListItemPrefix>
              <p className="text-[.9rem]" >Manage Coupon</p>

            </ListItem>
          </Link>
        </List>
      </>
      <>
        <h4 className="mt-1 font-[GilroyBold] mx-4 text-[1.3rem]" >Manage Gift Card</h4>
        <List className="mt-1" >
          <Link className={splitLocation[1] === "create-giftcard" ? activeClass : "hover:bg-[#565449] rounded-lg"} to="/create-giftcard">
            <ListItem className=" py-3 hover:bg-[#565449] rounded-lg font-[GilroyMedium] hover:text-white" >
              <ListItemPrefix>
                <FaGift className="h-[15px] w-[15px] mr-3" />
              </ListItemPrefix>
              <p className="text-[.9rem]" >Manage Gift Card</p>

            </ListItem>
          </Link>
          <Link className={splitLocation[1] === "giftcards" ? activeClass : "hover:bg-[#565449] rounded-lg"} to="/giftcards">
            <ListItem className=" py-3 hover:bg-[#565449] rounded-lg font-[GilroyMedium] hover:text-white" >
              <ListItemPrefix>
                <FaGift className="h-[15px] w-[15px] mr-3" />
              </ListItemPrefix>
              <p className="text-[.9rem]" >Gift Card List</p>

            </ListItem>
          </Link>
        </List>
      </>
      <>
        <h4 className="mt-4 font-[GilroyBold] ml-4 text-[1.3rem]" >User</h4>
        <List className="mt-1" >
          <Link className={splitLocation[1] === "create-user" ? activeClass : "hover:bg-[#565449] rounded-lg"} to="/create-user">
            <ListItem className=" py-3 hover:bg-[#565449] rounded-lg font-[GilroyMedium] hover:text-white" >
              <ListItemPrefix>
                <FaUserPlus className="h-[15px] w-[15px] mr-3" />
              </ListItemPrefix>
              <p className="text-[.9rem]" > Create User</p>

            </ListItem>
          </Link>
          <Link className={splitLocation[1] === "users" ? activeClass : "hover:bg-[#565449] rounded-lg"} to="/users">
            <ListItem className=" py-3 hover:bg-[#565449] rounded-lg font-[GilroyMedium] hover:text-white" >
              <ListItemPrefix>
                <BsList className="h-[15px] w-[15px] mr-3" />
              </ListItemPrefix>
              <p className="text-[.9rem]" >Userlist</p>

            </ListItem>
          </Link>
        </List>
      </>

      <h4 className="mt-4 font-[GilroyBold] ml-4 text-[1.3rem]" >Profile</h4>
      <List className="mt-1 mb-6" >
        <ListItem className=" py-3 hover:bg-[#565449] rounded-lg font-[GilroyMedium] hover:text-white" >
          <ListItemPrefix>
            <MdSwitchAccount className="h-[15px] w-[15px] mr-3" />
          </ListItemPrefix>
          <p className="text-[.9rem]" >Account Details</p>

        </ListItem>
        <ListItem onClick={handleLogout} className="py-3 hover:bg-[#565449] rounded-lg font-[GilroyMedium] hover:text-white" >
          <ListItemPrefix>
            <FaPen className="h-[15px] w-[15px] mr-3" />
          </ListItemPrefix>
          <p className="text-[.9rem]" >Logout</p>

        </ListItem>


      </List>
    </Card>
  );
}