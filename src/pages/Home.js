import React, { useEffect, useState } from 'react'
import Topbar from '../components/Layout/Topbar'
import { Sidebar } from '../components/Layout/Sidebar'
import { Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AnalysisBox from '../components/Home/AnalysisBox'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase.config'
import Charts from '../components/Home/Charts'
import HomeList from '../components/Home/HomeList'
import { TbHandClick, TbTruckDelivery } from "react-icons/tb";
import { FaBox } from 'react-icons/fa'
import { RiTakeawayFill } from 'react-icons/ri'

const Home = () => {
  const { isAuthenticated, users, userProfile } = useSelector(
    (state) => state.user
  )
  // const [totalOrderList, setTotalOrderList] = useState([])
  // const [orderInTransitList, setOrderInTransitList] = useState([])
  // const [orderDeliveryList, setOrderDeliveryList] = useState([])

  // const fetchOrderList = async () => {
  //   const q = query(collection(db, "logisticOrder"));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     setTotalOrderList((prev) => [...prev, {
  //       id: doc.id,
  //       ...doc.data()
  //     }])
  //   })
  // }
  // const fetchOrderListCLient = async () => {
  //   const q = query(collection(db, "logisticOrder"), where("userName", "==", userProfile?.companyName));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     setTotalOrderList((prev) => [...prev, {
  //       id: doc.id,
  //       ...doc.data()
  //     }])
  //   })
  // }
  // const fetchOrderinTransitList = async () => {
  //   const q = query(collection(db, "logisticOrder"), where("orderStatus", "==", "in-transit"));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     setOrderInTransitList((prev) => [...prev, {
  //       id: doc.id,
  //       ...doc.data()
  //     }])
  //   })
  // }
  // const fetchOrderinTransitListClient = async () => {
  //   const q = query(collection(db, "logisticOrder"), where("orderStatus", "==", "in-transit"), where("userName", "==", userProfile?.companyName));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     setOrderInTransitList((prev) => [...prev, {
  //       id: doc.id,
  //       ...doc.data()
  //     }])
  //   })
  // }
  // const fetchOrderDilveryList = async () => {
  //   const q = query(collection(db, "logisticOrder"), where("orderStatus", "==", "delivered"));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     setOrderDeliveryList((prev) => [...prev, {
  //       id: doc.id,
  //       ...doc.data()
  //     }])
  //   })
  // }

  // const fetchOrderDilveryListclient = async () => {
  //   const q = query(collection(db, "logisticOrder"), where("orderStatus", "==", "delivered"), where("userName", "==", userProfile?.companyName));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     setOrderDeliveryList((prev) => [...prev, {
  //       id: doc.id,
  //       ...doc.data()
  //     }])
  //   })
  // }

  // const chartData = {
  //   labels: ["Total Orders", "In Transit", "Delivered"],
  //   datasets: [
  //     {
  //       label: "Orders",
  //       data: [totalOrderList.length, orderInTransitList.length, orderDeliveryList.length],
  //       backgroundColor: [
  //         "#5ec6d1", // Blue
  //         "rgba(250, 192, 19, 0.8)", // Yellow
  //         "#ee3135", // Red
  //       ],
  //       borderColor: [
  //         "#5ec6d1",
  //         "rgba(250, 192, 19, 1)",
  //         "#ee3135",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // useEffect(() => {
  //   if (userProfile?.role === "admin") {
  //     fetchOrderList()
  //     fetchOrderinTransitList()
  //     fetchOrderDilveryList()
  //   } else {
  //     fetchOrderDilveryListclient()
  //     fetchOrderListCLient()
  //     fetchOrderinTransitListClient()
  //   }
  // }, [userProfile])



  return (
    <div className='bg-gray-100 flex '>
      {userProfile?.role !== "Delivery Boy" && <Sidebar />}
      {userProfile?.role !== "Delivery Boy" && <div className='h-[100vh] overflow-y-scroll flex flex-1 flex-col ' >
        <Topbar />
        {/* <AnalysisBox totalOrderList={totalOrderList} orderInTransitList={orderInTransitList} orderDeliveryList={orderDeliveryList} />
        <div className='grid grid-cols-12 gap-10'>
          <div className='col-span-5'><Charts chartData={chartData} /></div>
          <div className='col-span-7'><HomeList userProfile={userProfile} totalOrderList={totalOrderList} /></div>
        </div> */}
        {/* <div className='col-span-4  flex-col  gap-6 flex items-center justify-center' >
          <h3 className='text-[1.5rem] font-[GilroyBold]'>Welcome to GRC Express and Logistics</h3>
          {userProfile?.role === "Delivery Boy" && <Link to="/create-order" >  <Button>Create New Order</Button></Link>}
          {userProfile?.role !== "Delivery Boy" && <Link to="/orders" >  <Button>Order List</Button></Link>}
        </div> */}
      </div>}
      {userProfile?.role === "Delivery Boy" &&
        <div className=' h-[100vh] overflow-y-scroll flex flex-1 flex-col ' >
          <div className='col-span-4  flex-col mt-10  gap-6 flex items-center justify-center' >
            <h3 className='lg:text-[1.5rem] text-[1.3rem] text-center font-[GilroyBold]'>Welcome to GRC Express and Logistics</h3>
            <div className='grid lg:grid-cols-3 grid-cols-1 gap-10 m-10'>
              <Link to="/createDelivery">
                <div className='bg-white shadow-lg rounded-lg py-3 px-6 flex items-center justify-center flex-col'>
                  <div className='flex justify-between items-center gap-5'>
                    <h3 className='text-[1.3rem] font-[GilroyBold]'>Create Order</h3>
                    <div className=' w-[70px] h-[70px] rounded-full text-center  flex justify-center items-center bg-[#fceac1]'>
                      <FaBox className='text-[#FFB200] text-[40px]' />
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/deliveryList">
                <div className='bg-white shadow-lg rounded-lg py-3 px-6 flex items-center justify-center flex-col'>
                  <div className='flex justify-between items-center gap-5'>
                    <h3 className='text-[1.3rem] font-[GilroyBold]'>Delivery List</h3>
                    <div className=' w-[70px] h-[70px] rounded-full text-center  flex justify-center items-center bg-[#fceac1]'>
                      <TbTruckDelivery className='text-[#FFB200] text-[40px]' />
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/pickupList">
                <div className='bg-white shadow-lg rounded-lg py-3 px-6 flex items-center justify-center flex-col'>
                  <div className='flex justify-between items-center gap-5'>
                    <h3 className='text-[1.3rem] font-[GilroyBold]'>Pickup List</h3>
                    <div className=' w-[70px] h-[70px] rounded-full text-center  flex justify-center items-center bg-[#fceac1]'>
                      <RiTakeawayFill className='text-[#FFB200] text-[40px]' />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Home